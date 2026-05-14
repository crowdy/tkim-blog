---
title: "Six Days of the GitHub Myth — The Week Governance, Uptime, Security, and Pricing Cracked at Once"
description: "In the last week of April 2026, the single platform we have entrusted with our code had a run of bad luck — or eighteen years of deferred invoices all arrived on the same day."
pubDate: 2026-04-29T00:00:00.000Z
lang: 'en'
pairSlug: github-cracking-week
draft: false
---

# Six Days of the GitHub Myth — The Week Governance, Uptime, Security, and Pricing Cracked at Once

> Was GitHub just unlucky this week, or did eighteen years of invoices arrive all at once? And if we cannot tell the difference, is what we have entrusted ourselves to an infrastructure, or a myth?

## Introduction — Tears on the Keyboard

On April 28, 2026, Mitchell Hashimoto published a post on his blog titled "Ghostty is leaving GitHub." He is a co-founder of HashiCorp; type his name into a search engine and you get "GitHub user number 1299." He joined in February 2008, which makes this his eighteenth year on a single platform. He added a comment under his own post: "I actually cried writing this blog post — tears hit my keyboard, I'm embarrassed to say."

The reason he gave was unexpectedly simple. "For the past month, I have been marking an X almost every day." On a personal uptime log he keeps, days when GitHub blocked his work get an X, and the X had been filled in for nearly every date. On April 27, a GitHub Actions outage made PR review impossible for about two hours. He took those two hours not as mere downtime but as a personal grievance. "GitHub is failing me, every single day, and it is personal."

The evening that post climbed to the front page of Hacker News, the same page also carried GitHub's own apology post about availability, a breakdown of an RCE (remote code execution) vulnerability in GitHub Enterprise Server, an announcement of pricing changes to GitHub Copilot code review, and a security analysis titled "GitHub Actions is the weakest link." Within a few days, GitHub had been shaken simultaneously on five axes: governance, uptime, security, pricing, and supply-chain integrity. Not a single event, but concurrent fissures.

What is the difference between a single event and concurrent fissures? When one thing breaks, it is an accident. When five things break in the same week, structure has been exposed. What happened at GitHub this week is closer to the second.

## Six Days, in Order — What Actually Happened

Start with the timeline.

**April 23.** A GitHub Merge Queue squash merge produced an incorrect commit, leaving the default-branch state wrong on 658 repositories and 2,092 pull requests. A few days later, GitHub CTO Vlad Fedorov acknowledged "multiple process failures" as the cause on the official blog, writing that "no data was lost, but the state of the affected default branches was incorrect."

**April 27.** Two things happened on the same day. First, Elasticsearch-backed GitHub search went down. Fedorov attributed the cause to "load suspected to be from a botnet attack." Second, GitHub announced that starting June 1, Copilot Code Review would begin consuming GitHub Actions minutes. Users are now exposed to double-metered billing for the same code review function: against Copilot premium request units and against Actions minutes. Unit pricing was not disclosed in the announcement.

**April 28.** Security firm Wiz disclosed a GitHub remote code execution vulnerability, CVE-2026-3854. CVSS 8.7, severity Critical. The blast radius was all of GitHub.com and GitHub Enterprise Server (GHES). At disclosure time, 88% of GHES instances were unpatched. The same day, Mitchell Hashimoto published his farewell post; Armin Ronacher published a retrospective titled "Before GitHub"; and a security researcher published a piece titled "GitHub Actions is the weakest link" with a staggering 91% figure.

**April 29.** Four of the top five items on the Hacker News front page were about GitHub. Aggregate scores ranged from 200 to 2,000 points per post, with each piece drawing between 100 and over 600 comments.

That is too dense a causal grain to be pure coincidence. Take the axes one at a time.

## Body 1 — Governance: "This Site Has No Leadership"

Mitchell Hashimoto said he would move his infrastructure. Armin Ronacher went a step further. The maintainer of Flask and Jinja and the founder of the Pocoo group declared bluntly that "the site has no leadership," and added: "It's a miracle that things are going as well as they are." That sentence is shocking not because it is angry but because it may be accurate.

GitHub's management structure has been reorganized several times since the 2018 Microsoft acquisition. Former CEO Thomas Dohmke resigned in August 2026 without announcing a successor; afterward, GitHub was folded into Microsoft's CoreAI organization. The CEO seat is essentially vacant, and decision-making has become subordinate to the AI strategy of Microsoft headquarters. The first consequence of that structure is the ambiguity of the Copilot pricing policy. The April 27 announcement merely stated, "That agentic architecture runs on GitHub Actions," and that billing would therefore shift onto that meter — without disclosing per-minute pricing, average consumption per PR, or aggregation rules against the existing Copilot contract. The user finds out the price when the invoice arrives.

Opacity in pricing is not a marketing slip. It is a symptom of governance absence. When no one has the authority to say "do this and users will leave," or no one with that authority has actual influence, pricing stops being agreement and becomes notification.

That is what gives Hashimoto's decision its weight. He is not simply one angry user; he is someone who has watched the platform's growth from beside it for eighteen years. The part where he wrote that he "had not yet chosen a replacement platform, and was in discussion with both commercial and FOSS options" is significant for that reason. He is not trying to leave now; he is preparing to leave the instant a destination is ready. When the eighteen-year regular says that, the other regulars receive the same memo.

## Body 2 — Uptime and Security: 30x Load, 88% Unpatched

Vlad Fedorov's apology post contains one line — a single causal claim — that explains the whole crack. "Agentic development workflows have accelerated since December 2025, requiring a 30x scale-out." In other words, coding agents like ChatGPT Codex, Claude Code, and Cursor have been automatically opening PRs, running CI, and requesting reviews, putting GitHub's infrastructure under a level of load that human users alone could never have reached. And that load is presenting every piece of architectural debt GitHub had deferred as an invoice, all at once.

The list of improvements Fedorov promised is telling. Decoupling webhooks from MySQL. Redesigning the session cache. Optimizing authentication flow. And, critically, "migrating performance-sensitive code from the Ruby monolith to Go." That an eighteen-year-old monolith is only now being decomposed implies that without the external pressure of a 30x load, it would have been deferred further.

Turn to security and the picture darkens. CVE-2026-3854 was discovered by Wiz Research and reported to GitHub on March 4. GitHub.com was patched in just six hours. That is fast. But the GHES (the version customers self-host) patch did not ship until March 10, and at the April 28 disclosure 88% of instances remained unpatched. A vulnerability allowing RCE via a single authenticated git push command was left exposed across major enterprise networks for a month and a half.

The 88% figure does not simply mean GHES operators are lazy. It also signals that the self-hosted GitHub option is becoming harder to maintain operationally. The asymmetry — SaaS GitHub patched in six hours, self-hosted in a month and a half — makes it harder to simultaneously recommend "leave GitHub.com" and "run it yourself."

The GitHub Actions picture is even more structural. The nesbitt.io analysis diagnoses it this way: "individually the features are conveniences, but combined they become something extremely dangerous." The specific numbers came with it. 91% of PyPI packages that use third-party GitHub Actions reference actions by mutable tags. Two-thirds of packages have at least one workflow without a `permissions:` block. The bill has already been delivered. The March 2025 tj-actions/changed-files compromise pushed a memory scraper into 23,000 downstream repositories; the nx/s1ngularity incident in August of the same year briefly exposed over 5,000 private repositories as public; the April 2026 elementary-data incident published a malicious release within ten minutes of a PR comment trigger.

The common thread across these cases is that none of them is a "bug." They are legitimate outputs of GitHub Actions' default behavior. Referencing actions by tag rather than by SHA is the recommended pattern; `pull_request_target` is a documented trigger; the default GITHUB_TOKEN having write permissions is the default for every repository created before February 2023. In other words, the GitHub Actions security problem is not "users misused it" — it is "the defaults are dangerous."

## Body 3 — The Bill for Dependence: Where Do We Go?

On top of all that, another event happened the same week. On April 28, Anthropic's Claude.ai and API were down broadly. Coding agents were pressing GitHub's infrastructure to a 30x load, and the brains of those agents — the models themselves — were also failing at the same time. What we witnessed this week was two single points of failure (SPOFs) trembling simultaneously. The SPOF for code is GitHub; the SPOF for the coding agent is the model provider.

In the Hacker News comments, a user identifying as a GitHub employee, idan, offered: "GitHub only gets better if people who give a shit stick around to make it better." Margalabargala replied bluntly: "There is no avenue by which you make GitHub better by continuing to use it." The clash between those two comments is the most honest statement we have about the influence of external users. Product direction is decided not by users' tears but by their wallets and footsteps.

So where do we go? Pulling the candidates floated in the comments into a list:

First, **Codeberg**. A nonprofit forge built on Forgejo. Recognizable projects like Zig, Strudel, and Tenacity have already migrated. The drawback is discovery — it does not offer the search, SEO, or ecosystem integrations of GitHub.

Second, **GitLab**. In the words of commenter ahartmetz, "about as slow as GitHub, but with a better license and owner." A functionally safe alternative, but it does not promise infrastructural satisfaction.

Third, **self-hosting (Forgejo, Gitea, sr.ht)**. The most ideal in terms of decentralization, but as the GHES 88% unpatched statistic shows, the operational burden is not trivial. As HN's injidup pointed out, "distributed version control works only when you have some way to discover and access the distributed repositories. In the end there is always a drift back to a central registry." Self-hosting also means giving up discoverability.

Armin Ronacher therefore proposes a different direction. Not a new forge, but a "public, boring, well-funded archive." Code hosting can be done by a commercial company, but the memory of code — past projects, dead dependencies, broken links — should not live inside the business model of any single company. His anecdote about Colubrid, an old project of his own that he had already forgotten and that now sits on PyPI with a dead GitHub link, is both the foundation and the emblem of that argument.

At the individual engineer level, the things that can be done right now are smaller in scope. Compressing the nesbitt.io recommendations into five points: introduce static analysis tools like zizmor into your workflows; pin actions by SHA rather than tag; place `permissions: {}` at the top of the workflow and add only the permissions you need; do not use `pull_request_target`; and assume that any text an unauthenticated user can put into a PR will eventually become a shell script. These five are the minimum insurance — even if you do not leave GitHub — against GitHub becoming the weakest link in your infrastructure.

## Sidebar — The Trap of the `pull_request_target` Trigger

Of those five recommendations, the fourth is the most opaque to practitioners. It says only "do not use `pull_request_target`" without specifying what to use instead. But because nearly every GitHub Actions incident traces back to misuse of this trigger, that one line is worth unpacking.

The point is simple. The default trigger is `pull_request`; if secrets are genuinely needed, split with a `workflow_run` pattern.

**The difference between `pull_request` and `pull_request_target`**

| Trigger | Execution context | Secrets | GITHUB_TOKEN | Fork PR code execution |
|---|---|---|---|---|
| `pull_request` | PR HEAD context | Empty | Read-only | Executed safely |
| `pull_request_target` | Base branch context | Full access | Write-capable | Dangerous — a frequent RCE entry point |

`pull_request` is the "even if the fork's code runs, there is nothing to steal" trigger. Secrets are empty and the token is read-only, so even if an outside contributor's code runs, it cannot affect the base repository. By contrast, `pull_request_target` runs in the base context and receives all secrets and a write-capable token. That alone is not wrong, but the moment the workflow checks out and executes PR HEAD code — for example, the moment you specify `ref: ${{ github.event.pull_request.head.sha }}` to `actions/checkout` — an outsider's code runs with secrets in hand. That is precisely the mechanism by which the 2025 tj-actions/changed-files incident shook 23,000 repositories at once.

**Pattern 1 — The default: when `pull_request` alone is enough**

For anything that does not need secrets — lint, test, build — this one trigger suffices.

```yaml
on:
  pull_request:
permissions: {}
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA>
      - run: npm test
```

PRs from forks are safe. With a read-only token and empty secrets, even malicious code has no data to exfiltrate.

**Pattern 2 — When secrets are needed: split with `workflow_run`**

Scenarios that require secrets — like deploying preview environments — should be split into two stages. The first workflow only builds, in an untrusted environment, and uploads the result as an artifact. The second workflow picks up that artifact and processes it with secrets.

```yaml
# pr-build.yml — untrusted, no secrets
on: pull_request
permissions: {}
jobs:
  build:
    steps:
      - uses: actions/checkout@<SHA>
      - run: npm run build
      - uses: actions/upload-artifact@<SHA>
        with: { name: build, path: dist/ }
```

```yaml
# pr-deploy-preview.yml — trusted, with secrets
on:
  workflow_run:
    workflows: ["pr-build"]
    types: [completed]
permissions:
  pull-requests: write
jobs:
  deploy:
    if: github.event.workflow_run.conclusion == 'success'
    steps:
      - uses: actions/download-artifact@<SHA>
      - run: ./deploy-preview.sh
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

The key is that at no step where you touch secrets do you ever execute PR HEAD code. The second workflow only deals with the static artifact produced by the first.

**Pattern 3 — Just about the only legitimate use of `pull_request_target`**

Automation that does not execute PR HEAD code at all — auto-labelers, welcome comments — and that's about it.

```yaml
on: pull_request_target
permissions:
  pull-requests: write
jobs:
  label:
    steps:
      - uses: actions/labeler@<SHA>
```

The moment you add `actions/checkout` of PR HEAD and build/execute it inside this workflow, that is where the incident starts.

**One-line rule**

> "Does this workflow execute the contents of an outside contributor's PR as code?"
> → If yes: `pull_request` (combine with `workflow_run` if needed).
> → If no (labels and comments only): `pull_request_target`.

The reason nesbitt.io says "do not use `pull_request_target`" so flatly is that, in practice, workflows that observe this boundary are rare. The instant a workflow checks out PR code, secrets leak, and the incident does not stay within a single repository — it propagates through the entire downstream dependency tree.

## Conclusion — The End of the Myth, the Start of the Infrastructure

Return to the question that opened this piece. Was GitHub just unlucky this week, or did eighteen years of invoices arrive all at once?

The answer is both. That five incidents overlapped in one week is coincidence. But that those five incidents shook on precisely five different axes — governance, uptime, security, pricing, and supply-chain integrity — is not coincidence. It is the natural conclusion of eighteen years in which we have entrusted code, issues, CI, the package registry, the preservation archive, and now the execution runtime for coding agents to a single SaaS at a single company.

Myths do not usually collapse from a single event. They collapse when people stop calling them myths. The tears that fell on Mitchell Hashimoto's keyboard on April 28 are evidence that he was one of the last people still calling GitHub a myth. The moment he stops calling it that, others begin to ask the same question.

Next week the front page will be filled with something else. Next month, GitHub's 30x scaling work may bear partial fruit. But these six days have permanently changed one thing. We now see GitHub not as "the obvious choice" but as "one choice." Seeing it as one choice means we have begun considering the others.

So the final question changes. Next time a week breaks down like this, where is your team ready to go?

---

Sources:

- Mitchell Hashimoto, "Ghostty is leaving GitHub," 2026-04-28. https://mitchellh.com/writing/ghostty-leaving-github
- Vlad Fedorov, "An update on GitHub availability," GitHub Blog, 2026-04-28. https://github.blog/news-insights/company-news/an-update-on-github-availability/
- Wiz Research, "GitHub RCE Vulnerability: CVE-2026-3854 Breakdown," 2026-04-28. https://www.wiz.io/blog/github-rce-vulnerability-cve-2026-3854
- "GitHub Copilot code review will start consuming GitHub Actions minutes on June 1, 2026," GitHub Changelog, 2026-04-27. https://github.blog/changelog/2026-04-27-github-copilot-code-review-will-start-consuming-github-actions-minutes-on-june-1-2026/
- "GitHub Actions is the weakest link," nesbitt.io, 2026-04-28. https://nesbitt.io/2026/04/28/github-actions-is-the-weakest-link.html
- Armin Ronacher, "Before GitHub," lucumr.pocoo.org, 2026-04-28. https://lucumr.pocoo.org/2026/4/28/before-github/
- Hacker News discussion, "Ghostty is leaving GitHub," item 47939579, 2026-04-28. https://news.ycombinator.com/item?id=47939579
