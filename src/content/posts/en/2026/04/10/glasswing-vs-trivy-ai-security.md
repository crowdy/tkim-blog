---
title: 'Attacking AI, Defending AI — Why Project Glasswing and the Trivy Supply Chain Incident Broke in the Same Week'
description: '"In the same week, Anthropic announced an AI that finds vulnerabilities with more-than-human accuracy, and Trivy — the tool developers had installed for defense — leaked cloud secrets. Is the timing really a coincidence?"'
pubDate: 2026-04-10T01:01:25.209Z
lang: en
pairSlug: 'glasswing-vs-trivy-ai-security'
draft: false
---
# Attacking AI, Defending AI — Why Project Glasswing and the Trivy Supply Chain Incident Broke in the Same Week

> "In the same week, Anthropic announced an AI that finds vulnerabilities with more-than-human accuracy, and Trivy — the tool developers had installed for defense — leaked cloud secrets. Is the timing really a coincidence?"

---

On April 7, 2026, Anthropic unveiled a cybersecurity initiative called [Project Glasswing](https://twitter.com/AnthropicAI/status/2041578392852517128) along with its core engine, a new model named "Claude Mythos Preview." The official language was lofty: "An urgent effort to protect the world's most important software," capable of detecting "software vulnerabilities that only the most skilled humans could find." A day later, on April 8, a wholly different kind of analysis hit the Hacker News front page. Titled [How the Trivy supply chain attack harvested credentials from secrets managers](https://vaultproof.dev/blog/trivy-supply-chain-attack), it reported that Trivy — the CNCF static-analysis scanner developers had long trusted for scanning container images and IaC (Infrastructure as Code) — had become the conduit for a supply chain attack, with a compromised version polling AWS Secrets Manager and HashiCorp Vault in the runtime environment to exfiltrate credentials.

The two stories happened inside the same news cycle but on the surface seemed unconnected. One is marketing — "AI will revolutionize security." The other is a field report — "the security tool itself got compromised." But place them side by side and the picture shifts. This essay's thesis is simple. Glasswing and the Trivy supply-chain incident did not happen in the same week by accident. They are **twin events produced by the same structural force**. The diffusion of AI coding and AI agents is widening the attack surface exponentially, and the automation capabilities attackers can field are climbing the same curve. Anthropic's Glasswing is one answer to "how will defenders catch up to this asymmetry?" The Trivy incident is one piece of evidence for "how the asymmetry blows up in practice." The first is the self-awareness that defense is late; the second is the mirror that shows just how late.

---

## 1. What Project Glasswing Is — Anthropic's Defensive Card

Sort through what Anthropic disclosed. According to [TechCrunch's April 7 report](https://techcrunch.com/2026/04/07/anthropic-mythos-ai-model-preview-security/), Project Glasswing is a preview program intended to "let a small number of influential companies use it for defensive cybersecurity work," with Claude Mythos Preview at its core. Anthropic explicitly said it has no plans to release this model to the general public. The reason is simple. The goal is "safe scaled deployment, but safeguards that reliably block dangerous outputs are needed first."

[GIGAZINE's April 8 explainer](https://gigazine.net/news/20260408-anthropic-claude-mythos-project-glasswing/) put the performance claims in sharper relief. In Anthropic's internal evaluations, Claude Mythos Preview reportedly hit a 72.4% success rate at generating functional exploits for Firefox. Earlier Claude models had essentially failed at this task. The claim of "autonomously discovering thousands of real-world vulnerabilities" rode alongside. Three concrete examples were called out: a crash vulnerability in the OpenBSD kernel that no one had found in 27 years, a 16-year-old defect in FFmpeg that more than five million automated scans had missed, and scenarios combining multiple vulnerabilities in the Linux kernel into a complete privilege-escalation chain. What the three examples share is that they are not "surface defects in a single file." The reasons it took 27 years, the reasons five million scans missed it, the reasons combination is required — they all converge on one keyword: "multi-file reasoning." Vulnerabilities that exceed the capacity of human working memory.

Strip away the rhetoric and Glasswing's positioning summarizes as: "An AI that finds vulnerabilities humans can't find, given first to a small set of carefully chosen partners." Anthropic hasn't named the partners, but TechCrunch used the phrase "influential companies," and industry observers point to large platform operators like Microsoft and Apple, and major infrastructure vendors. The curation is deliberate. The model's capability translates directly into attack capability. Anthropic itself acknowledges this in its official materials. GIGAZINE quotes Anthropic's framing: "The pace of AI development means that models with high misuse risk will eventually become widely available." In other words, the diagnosis is that if defenders aren't given the upper hand first, attackers will arrive first.

Why does this matter? Because Anthropic has classified its own model as "too dangerous to release publicly." Earlier generations were described in terms of "potential risk," but with Mythos the substantive restriction is "safeguards needed first." This is not a marketing distinction; it is a classification distinction. The internal judgment is that cybersecurity has entered a new tier on the capability scale of generative AI.

---

## 2. The Trivy Supply Chain Attack — Core of the Analysis

A quick primer for readers unfamiliar with Trivy. Trivy is an open-source static-analysis scanner under CNCF that detects known vulnerabilities and misconfigurations in container images, file systems, Git repositories, Kubernetes manifests, and IaC files such as Terraform and CloudFormation. In practice, it is close to a default component of the CI pipeline. The single line `trivy image myapp:latest` is wedged into the deployment gates of countless companies. For developers, Trivy occupies the psychological position of "the tool that makes security my ally."

The picture from the [vaultproof.dev analysis](https://vaultproof.dev/blog/trivy-supply-chain-attack) exploits exactly that psychological position. The compromised Trivy binary performs its normal scanning function while quietly polling secret stores accessible from the runtime environment. If the CI runner is operating under AWS credentials, it reads secrets from Secrets Manager. If a HashiCorp Vault token is in environment variables, it scrapes Vault's KV engine. Running on a GitHub Actions runner? It exfiltrates `GITHUB_TOKEN`. All of this happens "as if the static-analysis scanner were running normally." What's especially nasty from a detection standpoint is that Trivy is by design a tool that goes out to the network to refresh its vulnerability database, so external communication itself doesn't register as anomalous. From the perspective of firewalls and EDR, "Trivy going out to the internet" is expected behavior.

The crux of the analysis is that this attack is structurally different from "single-repository phishing." The classic open-source supply chain attack uploaded a malicious package to npm or PyPI and waited for a victim to install it. Victims installed "a library they didn't know well." This time it's reversed. Victims ran "the security tool they trusted most" in their existing CI pipeline as usual. The chain of trust ran in reverse. The facts that Trivy is a CNCF project, that thousands of production pipelines use it by default, that the official Docker Hub image is signed — every one of these signals of trust served as a distribution channel for the attacker.

The exact scale of damage is something even the report hasn't pinned down yet. But what credentials stolen from secrets managers are used for is structurally predictable. Once a single cloud-management API key is compromised, every resource permitted by the IAM policy lands in the attacker's hands. S3 buckets, RDS snapshots, KMS keys, and other secrets. In today's production environments, "a single secret" effectively doesn't exist. Secrets reference each other, decrypt each other, and grant each other access. Once the first secret is breached, the chain becomes a map of the whole environment. A one-line scanner command turned into the key that opens the first page of that map.

---

## 3. Attacker Automation and Defender Automation Are on the Same Curve

Here comes the first decisive observation. The problem Glasswing is trying to solve and the problem the Trivy incident reveals are not problems in different domains. They are different points on the same curve.

Call this curve "the automation asymmetry curve." X-axis is time, Y-axis is "the automation capability each of attackers and defenders can field." The security industry of the 2010s tacitly assumed that "defenders were slightly ahead." Defenders had the resources and specialized personnel of enterprises; attackers were either script kiddies or nation-state actors. The middle layer of attackers struggled to execute large-scale operations because of automation limits. That assumption is collapsing.

Two reasons. First, the spread of AI coding tools has caused an explosion in software production. After tools like GitHub Copilot, Cursor, and Claude Code appeared, effective code output multiplied. As code grows, vulnerabilities grow, dependencies grow, and the supply-chain graph grows more complex. Attack surface is a function of production volume. Second, the same AI capabilities went to the attackers. When Anthropic can claim that Mythos "finds vulnerabilities humans can't find," it is simultaneously saying what that same capability can do in the attacker's hands. When GIGAZINE reports the 72.4% Firefox exploit-generation rate, that number is both "the defender's automatic-patching capability" and "the attacker's automatic-exploitation capability."

The Trivy incident shows how high the "attacker side" of this curve has already climbed. In the traditional view, supply-chain attacks were labor-intensive. Attackers monitored package registries, registered packages with similar names, and waited for typo victims. This attack is different from that classic pattern. The attacker picked "the most widely used security tool," infiltrated its distribution channel, and embedded a module that structurally polls the runtime environment's secrets system. That requires a serious level of reconnaissance and engineering. And the backdrop allowing the attacker to achieve this level of precision is, undeniably, the rise of automation capability.

Calling Glasswing an "urgent effort" wasn't rhetoric. It comes close to a public acknowledgment that defenders are falling behind on the same curve. The decision to offer the model only to a small set of partners reflects awareness of duality: "broadly distributing this capability could itself worsen the asymmetry." Interestingly, the Trivy incident had already undermined the intuition that "broad distribution is always good." The most widely used security tool became the most effective attack vector. The spread of security tools is not the same as the improvement of security.

---

## 4. "Vulnerabilities Only the Most Skilled Humans Can Find" — Technical Meaning of the Rhetoric

The line in [Anthropic's official Glasswing tweet](https://twitter.com/AnthropicAI/status/2041578392852517128) — "software vulnerabilities that only the most skilled humans could find" — looks like marketing copy, but technically it makes a quite specific claim. Let's spell out what region of vulnerabilities this points to.

Software vulnerabilities can be divided into layers. The shallowest layer is "what pattern matching catches." The classic string concatenation of SQL injection, strcpy in buffer overflows, hardcoded credentials. Traditional static-analysis tools (Trivy, Semgrep, CodeQL) already handle this layer well. The next layer is "logic bugs inside a single file." Examples include API endpoints missing authorization checks, integer overflows, shallow cases of race conditions. LLM-based analysis became quite good at this layer between 2024 and 2025. But there's a layer above. **Vulnerabilities that arise only from interactions across multiple files and modules, timing issues that emerge in deep dependency chains, violations of trust assumptions across component boundaries.** This layer has traditionally been the domain of "skilled human researchers." Humans read code, build a mental model of the system's flow, and find vulnerabilities by questioning the flow's assumptions.

The 27-year-old OpenBSD kernel crash, the 16-year-old FFmpeg defect, and the Linux privilege-escalation chain combining several vulnerabilities — the three examples GIGAZINE summarizes correspond precisely to this "third layer." Twenty-seven years doesn't mean "humans could have found it but no one did." It's closer to "human working memory struggled to hold the whole structure at once." That FFmpeg's five million automated scans missed it points precisely to the limits of traditional fuzzers and symbolic-execution tools. These tools "execute code locally," so they can't construct "the point where assumptions of multiple components clash."

There's a structural explanation for why LLM-based analysis can excel at this layer. The transformer's attention mechanism can evaluate "relationships between multiple points" in one shot. A 1M-token context window places an entire medium-to-large codebase in a single model's working memory. Combine this with a reasoning objective phrased as "identify assumptions and construct scenarios in which they break," and in principle you can automate in hours what a human would have taken weeks to do. This is Anthropic's claim.

But the claim lacks independent verification. Because Mythos Preview isn't publicly released, external researchers can't reproduce the same benchmark. The 72.4% Firefox exploit success rate is Anthropic's internal evaluation number, and the composition and difficulty distribution of the evaluation set isn't disclosed. The "27-year-old OpenBSD bug" — if Anthropic hasn't published the CVE number and technical details — is hard to distinguish from marketing narrative. This essay's stance is neither "take Anthropic's claims at face value" nor "dismiss them as marketing." It's "read the structure and limits of the claim together." The direction of the claim is technically credible. The exact numbers are reference values until independent verification arrives.

---

## 5. A New Phase of Supply Chain Attacks — Development Tools Themselves Become Targets

The reason the Trivy incident occupies a special place in the history of supply-chain attacks is that the target is not "an application's dependencies" but "the security tool itself." The distinction carries structural meaning beyond mere classification.

Sketch the supply chain attack lineage since 2017: event-stream (2018), ua-parser-js (2021), node-ipc (2022), 3CX Desktop App (2023), XZ Utils backdoor (2024). What these incidents share is that "a library or utility a normal piece of software depends on" was compromised. In this lineage, the defensive posture was "verify what you depend on." Generate SBOMs (Software Bill of Materials), pin dependencies, check binary hashes, periodically scan with vulnerability scanners. The vulnerability scanner was Trivy.

The Trivy incident exposes the circular dependency of that defense model. Who verifies the tool you use to verify your dependencies? The naive answer is "use the signed binary from the official repository." But the essence of a supply-chain attack is that those "official-repository signatures" are exactly the moment of breach. A more fundamental answer is "apply multi-layer verification to every tool." But that answer is infeasible for real development teams. Applying multi-layer verification to every stage of the CI pipeline halts development velocity.

The age of AI agents pushes this dilemma to its extreme. Agents run more tools, far more often, than developers do. When an agent like Claude Code or Cursor responds to "check this project for security issues," it automatically executes several scanners including Trivy. The moment a human might pause and say "wait, should I verify this binary before running it?" passes without notice in the agent's workflow. The agent treats security tools as "items in a toolbox," and it dips into that box far more often than a human. This is a blessing for development productivity, but it offers attackers a new execution surface from a supply-chain perspective.

In summary: past supply chain attacks targeted "the libraries you use." Current supply chain attacks target "the security tools you use." And near-future supply chain attacks will target "every tool your agent runs automatically." Each generation's target surface is several times wider than the prior generation's. This is why the Trivy incident should be read not as an isolated event but as the beginning of a new phase.

---

## 6. The Defender's Dilemma — Glasswing's Choice and Its Limits

Anthropic's decision not to open Mythos Preview and instead offer it only to a few partners is, on its face, the safer choice. The logic "prepare safeguards before a dangerous capability is broadly distributed" is intelligible. But the choice itself creates new dilemmas worth seeing.

First, the bias problem in selected partners. If Glasswing picks large platform operators like Microsoft and Apple and major infrastructure vendors as partners, vulnerabilities in their products will be fixed quickly. But this choice simultaneously increases asymmetry for "the rest of the global software ecosystem." Small open-source projects, regional software vendors, and especially long-tail non-English-language software cannot access this defensive capability. If attackers eventually gain access to Mythos-class capability — the scenario Anthropic itself acknowledges when it says "the pace of AI development means that models with high misuse risk will eventually become widely available" — this asymmetry will hit the long tail first.

Second, value conflict with the open security community. The history of vulnerability research is full of ethical debates over "full disclosure." One convention established in the 1990s Bugtraq era is that the existence and details of vulnerabilities must be disclosed to the broader community so defenders can respond. Glasswing's "selected partner" model conflicts with this convention. If the capability to find vulnerabilities itself concentrates in a few companies, then "when and how vulnerabilities are disclosed" depends on those concentrated actors' decisions. This isn't necessarily malicious, but structurally the distribution channels for vulnerability information narrow.

Third, the duality of "defense is itself offense." If Mythos can generate Firefox exploits with 72.4% probability, the same model likely has similar capabilities against other browsers and other software. Offering it only to defenders presumes "attackers don't get the same capability." How long does that presumption hold? Anthropic itself has given a somewhat pessimistic answer. "Eventually becomes broadly available" is its official position. So Glasswing's preemptive defense is buying time. How that time is used becomes the real question.

In the same week, OpenAI's release of a [new safety blueprint to address child sexual exploitation](https://techcrunch.com/2026/04/08/openai-releases-a-new-safety-blueprint-to-address-the-rise-in-child-sexual-exploitation/) is worth noting as side context. Anthropic's Glasswing and OpenAI's blueprint in the same week, the same "how seriously we take safety" message. A sign that the major AI labs are staging spring 2026 as a "safety positioning contest." This is simultaneously a public-interest direction and a corporate differentiation strategy. Both sides are real, and interpretations that emphasize only one are incomplete.

---

## 7. Questions — Which Side of the Curve Is Your Team's Security On?

If Glasswing and the Trivy incident in the same week aren't coincidence, the questions they pose are not about AI safety but about **your team**. A few questions to organize the thinking.

Who, on your team, last verified the binary integrity of the security tools your CI pipeline runs, and when? The answer "we pull from the official repository, so it's fine" is no longer sufficient as of 2026. Trivy was a tool for which that assumption was considered to hold.

Who manages the list of commands your AI agent runs automatically? When Cursor or Claude Code responds to "do a security scan," which tools get invoked, with which permissions, and what secrets do those permissions expose — the whole chain has to live in someone's head. Security in the agent era should treat the "agent's automaticity" as an attack surface, not "the developer's carelessness."

Is the capability curve of the defensive tools you use keeping up with the curve of automation capabilities accessible to attackers? For most teams without access to a "frontier defensive model" like Glasswing, the question is especially heavy. If the answer is "no," what's the second-best option? Possible directions: accelerate vulnerability disclosure, make SBOM and provenance verification the default in CI pipelines, gate agent tool execution behind human approval, drastically reduce the scope and TTL of secrets. There is no single decisive defense. But "recognizing the gap on the curve" is itself a first step.

The most uncomfortable question, last. How many of the layer Anthropic calls "vulnerabilities only the most skilled humans can find" do you suspect live in your codebase? The honest answer is "I don't know." Glasswing will give that answer to a few partners first. The Trivy supply chain attack is already stealing the secrets of teams that don't know the answer. The two events in the same week aren't coincidence. They are throwing one question from two directions: **"On the automation asymmetry curve, are you a defender or a target?"**

---

## References

- [Anthropic — Project Glasswing official announcement tweet](https://twitter.com/AnthropicAI/status/2041578392852517128)
- [TechCrunch — Anthropic previews new "Mythos" cybersecurity AI model (2026-04-07)](https://techcrunch.com/2026/04/07/anthropic-mythos-ai-model-preview-security/)
- [GIGAZINE — Anthropic developed an AI with cyberattack performance too high, "Claude Mythos Preview" (2026-04-08)](https://gigazine.net/news/20260408-anthropic-claude-mythos-project-glasswing/)
- [Gizmodo JP — Anthropic announces new AI "Claude Mythos"](https://www.gizmodo.jp/2026/04/anthropic_claude_mythos_preview.html)
- [vaultproof.dev — How the Trivy supply chain attack harvested credentials from secrets managers](https://vaultproof.dev/blog/trivy-supply-chain-attack)
- [Forbes JP — Attack on AI development libraries, cloud credentials at risk](https://forbesjapan.com/articles/detail/95450?s=ns)
- [TechCrunch — OpenAI releases a new safety blueprint to address the rise in child sexual exploitation (2026-04-08)](https://techcrunch.com/2026/04/08/openai-releases-a-new-safety-blueprint-to-address-the-rise-in-child-sexual-exploitation/)
