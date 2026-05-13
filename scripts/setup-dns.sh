#!/usr/bin/env bash
# Configure Cloudflare DNS for tkim.dev → GitHub Pages (crowdy.github.io/tkim-blog).
#
# Prerequisites:
#   - Domain registered on Cloudflare (or NS delegated to Cloudflare)
#   - flarectl installed:  go install github.com/cloudflare/cloudflare-go/cmd/flarectl@latest
#   - API token with "Zone:DNS:Edit" + "Zone:Zone:Read" scoped to the zone
#
# Usage:
#   export CF_API_TOKEN=xxxxx
#   ./scripts/setup-dns.sh            # apply
#   ./scripts/setup-dns.sh --dry-run  # show planned changes only
#   ./scripts/setup-dns.sh --purge    # delete records this script would create

set -euo pipefail

ZONE="${ZONE:-crowdy.dev}"
PAGES_TARGET="${PAGES_TARGET:-crowdy.github.io}"

# GitHub Pages apex A records (https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
APEX_IPS=(
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
)

DRY_RUN=false
PURGE=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --purge)   PURGE=true ;;
    -h|--help)
      sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "unknown arg: $arg" >&2; exit 1 ;;
  esac
done

command -v flarectl >/dev/null || { echo "flarectl not found in PATH" >&2; exit 1; }
[[ -n "${CF_API_TOKEN:-}" ]] || { echo "CF_API_TOKEN not set" >&2; exit 1; }

run() {
  if $DRY_RUN; then
    echo "DRY-RUN: $*"
  else
    echo "+ $*"
    "$@"
  fi
}

# Find record ID by (name, type, content). Empty if not present.
find_record_id() {
  local name="$1" type="$2" content="$3"
  flarectl --json dns list --zone="$ZONE" --name="$name" --type="$type" 2>/dev/null \
    | jq -r --arg c "$content" '.[] | select(.Content == $c) | .ID' \
    | head -n1
}

ensure_record() {
  local name="$1" type="$2" content="$3" proxied="${4:-false}"
  local id
  id="$(find_record_id "$name" "$type" "$content" || true)"
  if [[ -n "$id" ]]; then
    echo "= $type $name -> $content (exists, id=$id)"
  else
    run flarectl dns create \
      --zone="$ZONE" \
      --name="$name" \
      --type="$type" \
      --content="$content" \
      --proxy="$proxied"
  fi
}

delete_record() {
  local name="$1" type="$2" content="$3"
  local id
  id="$(find_record_id "$name" "$type" "$content" || true)"
  if [[ -n "$id" ]]; then
    run flarectl dns delete --zone="$ZONE" --id="$id"
  else
    echo "- $type $name -> $content (absent, skip)"
  fi
}

echo "Zone: $ZONE"
echo "Target: $PAGES_TARGET"
echo

if $PURGE; then
  for ip in "${APEX_IPS[@]}"; do
    delete_record "$ZONE" A "$ip"
  done
  delete_record "www.$ZONE" CNAME "$PAGES_TARGET"
  exit 0
fi

# Apex A records (proxy OFF so GitHub can issue Let's Encrypt cert)
for ip in "${APEX_IPS[@]}"; do
  ensure_record "$ZONE" A "$ip" false
done

# www -> github pages
ensure_record "www.$ZONE" CNAME "$PAGES_TARGET" false

echo
echo "Done. Verify with:"
echo "  flarectl dns list --zone=$ZONE"
echo "  dig +short $ZONE"
echo "  dig +short www.$ZONE"
