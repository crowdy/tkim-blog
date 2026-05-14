---
title: "TanStack's Six Minutes — Anatomy of an npm Supply-Chain Breach That Trusted Publisher Did Not Stop"
description: "On May 11, 2026, 42 TanStack packages were replaced with 84 malicious versions in just six minutes. No maintainer account was compromised, no npm token was stolen. So how did it happen?"
pubDate: 2026-05-01T00:00:00.000Z
lang: 'en'
pairSlug: tanstack-npm-supply-chain
draft: false
---

# TanStack's Six Minutes — Anatomy of an npm Supply-Chain Breach That Trusted Publisher Did Not Stop

> Trusted Publisher and OIDC and maintainer MFA were all functioning correctly, and yet 42 popular npm packages were swapped for malicious versions in six minutes. What did the things we have spent the past year calling "the answer to supply-chain security" actually prevent, and what did they fail to prevent?

## Introduction — The Postmortem Has Arrived

19:20 UTC, May 11, 2026. `@tanstack/router`, `@tanstack/history`, and forty of their sibling packages were all updated to new versions in the npm registry. Six minutes later, at 19:26, the same thing happened a second time. A total of 42 packages and 84 malicious versions. All of them were published normally by TanStack's official GitHub Actions workflow, authenticated via OIDC tokens. No maintainer's npm token was stolen. No MFA was bypassed. The Trusted Publisher binding worked exactly as designed.

And as a consequence of everything working correctly, malicious packages went up on npm.

The postmortem for the May 11 incident was published by the TanStack team roughly three days later, on May 14. The vantage point of this essay is a few days further out, around May 13, when the incident took the top of Hacker News with 1,072 points and over 450 comments. The comment thread split the usual way. On one side, "what did the TanStack team do wrong"; on the other, "the fact that nothing in particular was done wrong, and this still happened."

This piece takes the latter view and walks through the incident again. It is the direct sequel to a piece I ran in late April titled [GitHub Actions is the weakest link](https://crowdy.dev/en/2026/04/29/github-cracking-week), which surveyed a week of security incidents — tj-actions/changed-files, nx/s1ngularity, elementary-data. The diagnosis there was simple. "The security problem with GitHub Actions is not that users used it wrong; it is that the defaults are dangerous." TanStack pushes that diagnosis one step further. It is the first quantitative demonstration that the same class of incident still occurs even after users migrate to the "recommended fix" — Trusted Publisher — and that it can occur in just six minutes.

## Section 1 — The Six-Minute Timeline: What Happened

First the facts, in chronological order. All times are UTC and have been cross-referenced against the TanStack team's postmortem and the timeline in GitHub issue #7383.

**May 10, 17:16.** Attacker account `zblgg` (GitHub user ID 127806521) forks the TanStack/router repository. The fork is immediately renamed `configuration`. A common evasion technique for hiding inside the fork network. The fork itself looks ordinary for several days.

**May 10, 23:29.** The same attacker pushes a single commit to the fork. The commit, starting with the hash `65bf499d…`, contains a roughly 30,000-line bundle file `vite_setup.mjs`. On its face it looks like build-tool boilerplate, but it is actually stage one of the payload: a dependency-installation script.

**May 11, 10:49.** PR #7378 is opened. Title: "WIP: simplify history build." TanStack/router, like any popular OSS project, sees dozens of PRs a day, many from external contributors. This one looked like just another.

**May 11, 11:11.** The PR is force-pushed. At that moment, the fork's HEAD is replaced with the malicious commit prepared earlier. This triggers the `bundle-size.yml` workflow. The workflow's trigger is — familiarly — `pull_request_target`. It is a routine automation that checks out the PR HEAD, builds it, and posts the resulting bundle size as a PR comment. The instant this workflow runs, the malicious code from the fork executes inside a context that has the base repository's secrets and write permissions.

**May 11, 11:29.** `bundle-size.yml` finishes and saves its pnpm cache into the GitHub Actions cache store. The key is `Linux-pnpm-store-6f9233a50def742c09fde54f56553d6b449a535adf87d4083690539f49ae4da11`, roughly 1.1 GB. The cache contains normal dependencies along with a follow-on stage payload planted by the malicious code. The cache key is derived from the lockfile hash, so any other workflow using the same lockfile — i.e. `release.yml` — will restore exactly this poisoned cache when it queries the same key.

**May 11, 11:31.** The attacker force-pushes the PR back to a clean state and then deletes the PR. The fork is deleted with it. On the surface, it looks like an uneventful PR briefly appeared and then disappeared. But the cache poisoning persists.

**May 11, 19:15:44.** Roughly eight hours later, a TanStack maintainer triggers a routine release. The `release.yml` workflow ID is `25613093674`. This workflow restores its dependency cache via `actions/cache@v5`. The restored cache includes the poisoned package, and that package's postinstall script executes on the build machine.

**May 11, 19:20:39.** First batch of publishes. The payload dumps the memory of the GitHub Actions Runner.Worker process via `/proc/<pid>/mem` and extracts the OIDC token from that memory. With that token it calls the npm publish API directly. From outside the legitimate workflow steps, but with legitimate OIDC credentials.

**May 11, 19:26:14.** The second workflow run, `25691781302`, repeats the same operation. A total of 42 packages and 84 versions are published.

**May 11, ~19:50.** External security researcher `ashishkurmi` (StepSecurity) identifies the breach from the fingerprints of the newly published versions. It is detected externally before the TanStack team notices. This is the point the postmortem acknowledges most candidly: there was no self-publish monitoring, and detection was outsourced.

**May 11, 20:00 – 21:30.** All team members' push access is revoked, npm's security team is asked to remove the tarballs server-side, all 84 versions are deprecated, an SNS notice goes out, the cache is purged, and a hardening PR adding a `repository_owner` guard and SHA pins is merged. This entire response is wrapped up inside two hours.

Tally all of that and the picture is clear. The attacker never touched a maintainer account. No npm token was stolen. The Trusted Publisher OIDC binding, maintainer MFA, and workflow authentication were all functioning. The only thing the attacker did was "wait eight hours for another workflow to restore the cache."

## Section 2 — Why It Happened: An Incident Manufactured by Three Legitimate Defaults

The reason this incident does not reduce to a single bug is that RCE only becomes possible when three different GitHub Actions behaviors — each intended in isolation — are chained in series. The three legitimate defaults are these.

**Default 1. `pull_request_target` can execute the fork's code in the base context.** Exactly the trigger I surveyed in the April 29 piece. The trigger itself is not wrong. There are legitimate uses for it in automations that do not execute PR-body code, like label auto-apply or welcome comments. But the moment a workflow like `bundle-size.yml` — which checks out the PR HEAD and builds it — uses this trigger, and in TanStack's case `actions/checkout` pulled the PR HEAD SHA without checking the sender's permissions and built it directly, an outsider's code runs inside the base context's permissions and cache scope.

**Default 2. GitHub Actions cache is shared at the repository level, and `pull_request_target` runs share the same scope as pushes to main.** The cleanest articulation comes from the postmortem line that `Ciantic` quoted on Hacker News.

> "Cache scope is per-repo, shared across pull_request_target runs which use the base repo's cache scope, and pushes to main. A PR running in the base repo's cache scope can poison entries that production workflows on main will later restore."

That one sentence is the entire mechanism of the incident. And the reason that sentence is shocking is that there is nothing in it that could be called a "bug." The cache worked as intended. It is just that nobody had thought deeply enough about how that intent looks in a supply-chain scenario. `arianvanp`'s comment captures the weight of this best.

> "Why do we do all these efforts making our build systems hermetic and we end up just using a global mutable cache across branches where the caller picks the key? Failure of industry as a whole. Actually insane."

**Default 3. The OIDC token lives in the memory of the Runner process, not just in the environment variables of a workflow step.** The security model Trusted Publisher promises is that "long-lived tokens are not kept on the maintainer's machine." That promise was kept. But for a publish to occur, a short-lived token must exist somewhere, at least for a moment. In GitHub Actions, that token lives in the memory of the Runner.Worker process — and any code running on the same machine, including an arbitrary postinstall script invoked by `npm install`, can read it via `/proc/<pid>/mem`. This precise memory-dump script was not freshly invented. The postmortem notes this calmly.

> "The attacker did not invent novel tradecraft; they recombined published research."

The source of that "published research" is the tj-actions/changed-files compromise from March 2025. A memory-dump script disclosed thirteen months earlier was reused almost verbatim.

Stack the three defaults together and you get: fork code → executes in base context → poisons cache → eight hours later, release workflow restores cache → postinstall extracts OIDC token from memory → npm publish. Sever any one of those steps and the incident does not happen. But the real problem is that responsibility for severing them is diffuse. The maintainer who wrote `bundle-size.yml`? GitHub, which set the default behavior of `pull_request_target`? GitHub, which designed the cache scope model? npm or pnpm, which made postinstall execution a default? Or the very practice of keeping OIDC tokens in Runner memory?

The first-tier comment on Hacker News tackles this diffuse responsibility head-on. `padjo` summarized it most cleanly.

> "Let me see if I have this straight. (1) Random fork PRs get a writable globally-shared cache. (2) That cache gets reused in the deploy pipeline. (3) Deploy can run from a single stored credential on the CI server. (4) The repo doesn't self-monitor for malicious deploys and instead depends on third parties after the fact. (5) Package managers run arbitrary code by default on package updates. What a world we live in."

In another comment, `chrisweekly` gave a more pointed diagnosis.

> "postinstall scripts are deadly. Everyone should use pnpm. And the fact that an 'orphan' commit pushed to a fork can trigger this kind of thing (via the npm client) is also nuts. To me, GitHub deserves a lot of the blame. A malicious fork's commits are reachable via GitHub's shared object storage at a URI indistinguishable from the legit repo. That is absolutely bonkers."

Worth dwelling on: even after the fork is deleted, the commits pushed during the incident can remain alive inside GitHub's object storage. Once an object is pushed inside a fork network, it is reachable from any repository in the same network if you know the SHA. This is a reasonable design GitHub adopted to save disk usage, but it has the side effect that traces of an attack — and the malicious code itself — can persist in GitHub's infrastructure long after the attacker has vanished.

There is also a more fundamental view. `jonchurch_` rendered a decisive judgment on Trusted Publishing itself.

> "This is (imo) evidence that Trusted Publishing by itself isn't sufficient to publish safely from CI. An attacker in the CI pipeline or someone who steals a repo admin's credentials can easily publish. None of this is new info. TP wasn't designed to prevent this. But moving from local publish + 2FA to TP introduces this class of attack via CI compromise. (…) What I want is staged publishing, so someone must go and use 2fa to promote an artifact to published on the npm side."

That last sentence is the most important policy implication of the incident. It is true that short-lived OIDC from CI is safer than a long-lived token on a maintainer's machine, but that fact addresses one threat — "long-lived token exposure" — and not "the second human verification at publish time." When we moved to Trusted Publisher, we gave up exactly that second human verification.

## Section 3 — Meaning and Implications: Onto the Second Phase of Supply-Chain Security

You can compress the past year of npm supply-chain incidents into a single line. In March 2025, tj-actions/changed-files was a PAT (personal access token) exposure → secrets scraping pattern. In August 2025, nx/s1ngularity was an npm maintainer token theft → direct publish pattern. And in May 2026, TanStack was a pattern in which Trusted Publisher OIDC was working correctly the entire time, while publish authority was drained via memory dump + cache poisoning.

What this evolution curve means is that every "supply-chain security recommendation" we have offered over the past year has been overtaken one step at a time. Reduce PAT usage → so they stole the maintainer's token. Enforce MFA → so they pivoted to the OIDC track that bypasses the token entirely. Move to Trusted Publisher → so they drained the OIDC token from Runner memory.

At this point, what can a user — meaning not a maintainer, not the npm security team, not GitHub, but the person who just `npm install`s the package — do? Collecting the candidates raised in the postmortem and the HN thread:

First, **disable postinstall**. The simplest defense is `npm install --ignore-scripts` or `ignore-scripts=true` in `.npmrc`. That one line would have blocked the detonation stage of this incident — the stage in which the postinstall script of a package pulled from the pnpm cache executes on the build machine. The downside is that some legitimate packages (e.g. those building native modules) will not work. But in production environments, prebuilt binaries are available in almost all cases, and postinstall is effectively a convenience for dev environments.

Second, **lockfile audit and timing-based verification**. Every malicious version in the TanStack incident was published within six minutes of the legitimate one. Adding a CI step that checks "has N hours passed since this new package version was published" — a feature provided by tools like `npm-locked-resolve`, `socket.dev`, or `snyk` — can buy time for an incident to be deprecated. Not a full defense, but it stretches a six-minute incident into a six-hour one.

Third, **separating version pin from SHA pin**. npm packages can only be pinned by version string, not by SHA. As a result, an incident where the tarball is swapped under the same version number — exactly what happened here — cannot be prevented by pinning unless npm unpublishes server-side. But the `integrity` hash in `package-lock.json` does catch it. Committing the lockfile, using `npm ci` in CI, and reviewing lockfile hash changes at minimum prevents "already-installed environments" from auto-upgrading.

Fourth, **considering alternative registries like JSR and Deno**. As `ezekg` quoted from npm's official policy — "we recommend deprecate over unpublish if there are dependents" — npm is structurally slow at post-incident takedowns. JSR requires automated code analysis and attestation at publish time, and Deno enforces a permission model by default that blocks arbitrary execution like postinstall. The whole npm ecosystem will not migrate in the short term, but for new projects or library units, these are worth considering.

Fifth — and the hardest — **second human verification at publish time**. The staged publish model `jonchurch_` proposed. CI can only upload an artifact to npm staging; promoting it to production requires a separate 2FA step on the npm side. This requires a change at the npm registry itself, with the agreement of both GitHub and npm. But if the diagnosis that Trusted Publisher OIDC is a single authentication factor is accepted, this direction becomes inevitable.

There is one more thing — not something the user can do directly, but something maintainers can do on their side. Splitting the work `bundle-size.yml` was doing — executing fork PR code inside the secrets/cache context — into the `pull_request` + `workflow_run` pattern surveyed in the April 29 piece. That single pattern, applied, would have prevented the cache-poisoning stage.

## Conclusion — Not Trusted, but Staged

Back to the question from the introduction. What did the things we have spent the past year calling "the answer to supply-chain security" — Trusted Publisher, OIDC, maintainer MFA — actually prevent, and what did they fail to prevent?

The answer is clear. They prevented "an incident in which the long-lived npm token on the maintainer's machine gets compromised wholesale." That reduces the probability of another nx/s1ngularity. But they do not prevent "an incident in which publish authority itself has migrated onto a CI machine, and arbitrary code execution on that machine becomes publish authority." If anything, they elevate that into a new normal attack surface.

This asymmetry is not a simple limitation of the tooling but the result of having placed trust in the wrong location. When we moved trust from the maintainer's machine to the CI machine, we implicitly agreed that "all code running on that machine can legitimately use the ephemeral credential." But in an ecosystem where the act of installing an npm package is itself arbitrary code execution, that agreement is far too generous.

So the next step is not trusted but staged. CI can initiate a publish but cannot complete it. Someone has to press yes — via mobile push, hardware key, whatever — on a separate channel on the npm side, in response to "do you really want to promote this version to published." Even if that stage merely turns six minutes into six hours, an external security researcher gets enough time to spot the fingerprints. The fact that detection in the TanStack incident took exactly thirty minutes shows, by inversion, what a thirty-minute gate is worth.

One last note. The diagnosis from the April 29 piece — "GitHub's eighteen-year bill arrived in a single week" — gets updated by this incident. This time, it is not just GitHub's bill. It is npm's bill too, and it is the bill of every security assumption we deferred when we all moved from the "trust the maintainer's machine" model to the "trust CI" model. The TanStack maintainers' rapid response — deprecating 84 versions, purging caches, and merging a hardening PR all within two hours — deserves praise. But we should not forget that the reason such a rapid response was needed is that the trust model we picked is one that can produce an incident in six minutes.

The next incident has already been committed somewhere. It is just waiting on a force-push.

---

Sources:

- TanStack, "Postmortem: TanStack NPM supply-chain compromise," 2026-05-14. https://tanstack.com/blog/npm-supply-chain-compromise-postmortem
- Hacker News discussion, item 48100706, 2026-05-13. https://news.ycombinator.com/item?id=48100706
- TanStack/router issue #7383 — incident tracking. https://github.com/TanStack/router/issues/7383
- This blog, "Six Days of GitHub Mythology — A Week in Which Governance, Uptime, Security, and Cost All Cracked at Once," 2026-04-29. https://crowdy.dev/en/2026/04/29/github-cracking-week
