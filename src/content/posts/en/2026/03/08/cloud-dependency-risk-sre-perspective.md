---
title: 'The Internet Has Become a Single Point of Failure — An SRE Anatomy of Cloud Dependency Risk'
description: '"The moment a self-healing system becomes a self-destructing one, we meet the paradox of automation."'
pubDate: 2026-03-08T13:40:12.059Z
lang: en
pairSlug: 'cloud-dependency-risk-sre-perspective'
draft: false
---
# The Internet Has Become a Single Point of Failure — An SRE Anatomy of Cloud Dependency Risk

> "The moment a self-healing system becomes a self-destructing one, we meet the paradox of automation."

---

## Introduction: a 2025–2026 cloud outage chronology

Over the past 18 months, global internet infrastructure has gone through an unprecedented chain of failures. These aren't isolated incidents — they're a **structural pattern**.

| Date | Incident | Scope | Root cause |
|------|------|-----------|-----------|
| 2024-07-19 | CrowdStrike global outage | 8.5 million Windows devices BSOD | Configuration update pushed globally and instantly |
| 2025-09-26 | South Korea NIRS data center fire | 858TB of government data permanently lost | Backup in the same building, DR site inoperative |
| 2025-10-19 | AWS US-EAST-1 DynamoDB outage | 14.5 hours, 1,000+ services down | DNS race condition |
| 2025-11-18 | Cloudflare outage #1 | 20–25% of internet traffic affected | Config change propagated globally, Rust panic |
| 2025-12-05 | Cloudflare outage #2 | 28% of HTTP traffic affected | Same pattern repeated (17 days later) |
| 2026-02-20 | Cloudflare outage #3 | 25% of BYOIP prefixes deleted | API empty-string query → wholesale deletion |

These incidents converge on one thesis: **the internet itself is becoming a Single Point of Failure**. The concentration of cloud infrastructure, the complexity of automation, and the absence of digital sovereignty have created a structural vulnerability.

This piece analyzes along three axes.

1. **Race conditions → global outage**: how a single bug can stop the internet
2. **The paradox of infrastructure concentration**: cloud infrastructure that has become "Too Big to Fail"
3. **The digital sovereignty war**: jurisdiction decided not by server location but by control plane

---

## Part 1: Race Conditions → Global Outage

### The night DynamoDB vanished from the internet

October 19, 2025, 11:48 PM (PDT). The DNS record for `dynamodb.us-east-1.amazonaws.com` went empty. Zero IP addresses. DynamoDB had literally "disappeared from the internet."

Signal, Slack, Zoom, Reddit, Snapchat, Roblox, Venmo, Robinhood, Coinbase, Duolingo, Ring cameras, Amazon retail, Prime Video, Alexa — over 1,000 services failed in sequence. Even Premier League football matches were affected.

The root cause was a **latent race condition** in the DNS management system.

### Technical detail: DNS Planner and Enactor collide

DynamoDB's DNS management is built from two components:

- **DNS Planner**: monitors load balancer state and generates "DNS plans" with traffic weights
- **DNS Enactor**: applies DNS plans to Route 53. One instance per availability zone, three in total, all operating independently

A core design decision: the Enactor instances were **deliberately operated without a distributed lock**, to avoid global deadlock. The assumption was that "eventual consistency is enough" — which is true under normal conditions.

The failure sequence:

```
1. Enactor #1 becomes abnormally slow (cause unknown)
2. Simultaneously, the Planner generates new plans abnormally fast (cause unknown)
3. Enactor #2 quickly applies the newest plan to all endpoints
4. Enactor #2 completes → cleanup process triggered for older plan generations
5. At this moment, the slow Enactor #1 finishes applying a much older plan to the regional endpoint
   → overwrites the latest plan
6. Enactor #1's stale-check fails — it doesn't recognize that its plan is the deletion target
7. Cleanup process detects the old plan → deletes all IPs from the regional DynamoDB endpoint
8. System falls into an inconsistent state unrecoverable by automation → requires manual intervention
```

As Gergely Orosz (Pragmatic Engineer) pointed out, AWS's postmortem doesn't explain **why** Enactor #1 was slow, **why** the Planner accelerated, or **why** the cleanup process performed a wholesale deletion rather than a selective one. It said "what failed" but not "what caused the failure."

### Why recovery is harder than the outage

DynamoDB DNS was restored in about 2 hours 37 minutes. But **the entire incident lasted 14.5 hours**. Why?

When DynamoDB came back, EC2's internal DWFM (DropletWorkflow Manager) attempted to re-establish leases en masse. This triggered **congestive collapse**. Each lease attempt timed out, timed-out requests piled up in the queue, and the queue grew faster than throughput could keep up — a positive feedback loop. The classic **thundering herd** pattern.

```
DynamoDB recovers (2:25 AM)
  → DWFM whole-fleet simultaneous reconnect attempts
    → Lease timeout > lease completion rate
      → Queue grows faster than processing
        → Congestive collapse (continued until 4:14 AM)
          → Intervention via manual throttling + selective host restarts
```

A second wave came next. The NLB (Network Load Balancer) health check judged new EC2 instances — whose network state hadn't propagated yet — as "unhealthy," triggered automatic AZ DNS failover, and removed multi-AZ load balancer capacity. This under-scaled Lambda's internal fleet, producing a second outage wave at 7 AM.

The recovery system created new failures during recovery. **Recovery was harder than the outage.**

### SRE lessons: the paradox of self-healing becoming self-destruction

The DEV Community's analysis hits the mark: "Self-healing systems designed for resilience became the primary vector of failure." AWS had to **suspend automation globally** just to begin recovery.

What SREs should take away:

1. **Automated recovery needs hard safety bounds.** A cleanup process should never be able to execute "delete all DNS records." There must be a deletion ceiling.
2. **Eventual consistency is dangerous on critical-path DNS.** Avoiding deadlock risk via distributed locks created a regional outage risk instead.
3. **Circuit breakers belong at every dependency boundary.** EC2, Lambda, STS, IAM, Connect, NLB — all depended on DynamoDB, but none had effective circuit breakers. When DynamoDB died, they all died; when it came back, they all stampeded.
4. **Recovery-mode thresholds must differ from normal-state thresholds.** NLB health checks evaluated recovering instances against normal-state criteria. Recovery mode needs different thresholds.

---

## Part 2: The Paradox of Infrastructure Concentration

### Cloudflare's three-outage streak — the same anti-pattern, repeated

Between November 2025 and February 2026, over four months, Cloudflare suffered three major outages. All three share the same **structural defect**: instant global propagation of config changes, and absence of canary deployment.

**Outage #1 (2025-11-18)**: A ClickHouse DB permissions change doubled the metadata in a Bot Management feature file, exceeding a hardcoded limit of 200. A `.unwrap()` in Rust code triggered a panic. The config **propagated to the global fleet within seconds**. No canary, no validation gate. Result: 20–25% of internet traffic affected; ChatGPT, Spotify, Discord, Claude, and others — 2.4 billion monthly active users in the blast radius.

A more serious problem followed. Cloudflare's dashboard login depends on Turnstile (CAPTCHA), Turnstile depends on Workers KV, and all three services were down. **A circular dependency where the dashboard engineers needed to log into in order to fix the outage depended on the services that were down**. A textbook SRE anti-pattern.

**Outage #2 (2025-12-05)**: During the rollout of a WAF buffer increase for CVE-2025-55182, an engineer who discovered a test-tool incompatibility disabled the test tool through the global configuration system. A Lua nil-reference error in FL1 proxy servers. 28% of HTTP traffic affected. **17 days after outage #1.** The first postmortem had promised staged config rollouts, but Cloudflare admitted "we hadn't implemented them yet."

**Outage #3 (2026-02-20)**: An automatic cleanup subtask queried BYOIP prefixes with the `?pending_delete` parameter passed without a value. The server interpreted the empty string as "query all." Roughly 1,100 BYOIP prefixes (25% of the total) were deleted and BGP routes withdrawn. Uber Eats, Bet365, Wikipedia, and others became unreachable. The defective code **had been merged 15 days earlier** but wasn't caught because staging used mock data.

### Comparison with CrowdStrike: the same anti-pattern

| Dimension | CrowdStrike (2024-07) | Cloudflare (2025-11) |
|------|----------------------|---------------------|
| Trigger | Configuration update | Configuration update (feature file) |
| Validation | Automatic validator missed it | No validation |
| Deployment | Global, instant | Global, seconds |
| Canary | None | None |
| Scope | 8.5 million Windows devices | 20%+ of internet traffic |
| Failure mode | BSOD (crash) | Rust panic (.unwrap()) |

The 4sysops analysis: "Cloudflare repeated CrowdStrike's mistake — they updated the entire infrastructure without first testing on a small group of hosts."

This isn't an individual company's mistake — it's an **industry-wide structural problem**. Meta (2021, BGP config), Datadog (2023, Ubuntu update), Google Cloud (2024, Spanner quota) — all the same pattern.

### "Too Big to Fail" — infrastructure's Lehman Brothers

By the numbers:

- Cloudflare serves **20.4% of all websites worldwide**, and **48.7% of the top 1 million sites**
- Reverse-proxy market share: **81.5–82.3%** (#2 Amazon CloudFront is 1.6%)
- Processes **50+ million HTTP requests per second**
- CDN market HHI (Herfindahl-Hirschman Index): **3,410** (anything over 2,500 is classified "highly concentrated")
- **20–25% of internet traffic** flows through Cloudflare

The analogy to the 2008 financial crisis fits cleanly. Regulators then recognized that the collapse of certain financial institutions could trigger cascading economic failure, designated "Systemically Important Financial Institutions (SIFIs)," and built a regulatory framework. Internet infrastructure faces the same problem but has **no regulatory framework, no safety net**.

There's also a security dimension. As Krebs on Security noted, when Cloudflare goes down, the SQL injection defenses, credential-stuffing defenses, XSS blocks, and bot mitigation that enterprises had outsourced to Cloudflare all vanish. To attackers, an **attack window** opens — the protective layer peeled away.

### SRE lessons: dependency isolation and fail-open

Cloudflare's "Code Orange" response is itself an SRE lesson:

1. **Treat configuration as code.** Cloudflare applied protective gates to software releases but not to config changes. Health Mediated Deployment (HMD) — start with employee traffic, then gradually ramp customer percentages, with automatic rollback on anomaly detection — is the right structure.
2. **Fail-open design.** When Bot Management fails, traffic should pass through rather than receive a 5xx. On availability-first paths, the default for unknown/error states should be "allow."
3. **Incident-response tools must be independent of the systems they monitor and control.** The dashboard → Turnstile → Workers KV circular dependency blocked engineers from even logging in during the outage.
4. **Use circuit breakers to stop propagation.** Mechanisms that halt rollout when anomalous error rates appear during config deployment, and that halt deletion operations exceeding expected scope.
5. **`.unwrap()` is forbidden in production Rust code.** A `.unwrap()` in an error path is like an `assert()` in production C/C++. Safety-critical code must handle every error path explicitly.

---

## Part 3: The Digital Sovereignty War

### South Korea's NIRS fire — sovereignty with no resilience

On September 26, 2025, a lithium-ion battery at the National Information Resources Service (NIRS) data center in Daejeon exploded during maintenance. Results:

- **858TB of government data permanently lost** — administrative approvals, policy research, public-service records from 2018 through 2025
- **745 government systems** affected, **700+ digital services** down
- Mobile identity verification, tax processing, emergency response, postal services paralyzed
- **750,000 civil servants** data affected
- By mid-October, only about **one-third recovered**; most of the lost data is permanently irrecoverable

Why did it happen? The G-Drive system (built in 2017) was designed to maximize data sovereignty and security. Fatal flaw: **the backup was stored on separate equipment in the same building**. The fire destroyed primary and backup simultaneously. The disaster recovery center in Gongju was **delayed for 13 years** — construction was complete but it wasn't operational due to budget shortfalls. The 2025 budget allocation was just 1.6 billion won (about $1.1 million).

The 25.4-billion-won 2024 IT infrastructure upgrade budget **wasn't executed**. 34.6% of equipment was aged.

The ASPI Strategist's assessment cuts to the bone: **"State ownership didn't guarantee redundancy. Formal control didn't substitute for engineering discipline."**

This incident illustrates the central paradox of the digital sovereignty debate. Everything was kept domestic and under government control for sovereignty, but **resilience without sovereignty becomes a single point of failure**. Hyperscale cloud environments often have superior resilience design compared to bespoke national systems.

### The US CLOUD Act and FISA 702 — provider nationality decides jurisdiction, not server location

The other axis of digital sovereignty is legal jurisdiction. Two key statutes:

**US CLOUD Act (2018)**: Allows the US government to compel electronic communications service providers to disclose data — **regardless of where it's physically stored**. Data stored on servers in Frankfurt, Tokyo, or Seoul is accessible if the provider is a US legal entity. Selecting an "EU data region" doesn't change CLOUD Act exposure. No contract can override it.

**FISA Section 702**: While the CLOUD Act is warrant-based, FISA 702 permits **bulk collection of foreign communications under an annual program-level authorization** — without individual warrants. EU residents' data can be accessed **without the parties or European institutions knowing**.

These aren't abstract legal problems. Real precedents exist:

- Microsoft blocked an Israeli military unit (Unit 8200) from Azure access
- X (Twitter) / Elon Musk blocked the European Commission's advertising account after a €120 million fine
- The US briefly suspended intelligence sharing with Ukraine
- The Biden administration's AI diffusion rules restricted advanced chip sales to European allies

### The kill-switch scenario — the political risk of control-plane dependency

Andrea Fortuna's January 2026 analysis: "A hospital can't log into its patient systems. The tax portal displays 'service unavailable.'"

The legal mechanisms by which the US government could cut off cloud access already exist:

- **IEEPA (International Emergency Economic Powers Act)**: authority to regulate commerce upon declaration of a national-security, foreign-policy, or economic emergency
- **Export controls**: technology export restrictions via the Commerce Department's Entity List
- **Federal contracting authority**: contract threats against US tech firms

The core weakness is **control-plane dependency**:

- IAM/SSO (authentication and authorization)
- Billing and contract enforcement
- Control plane APIs
- Key management systems
- Platform governance and terms of service

"When that switch sits in a foreign jurisdiction, dependency becomes political by design."

### Europe's response: from GAIA-X to EURO-3C

Europe is advancing multiple initiatives to reduce dependence on US clouds:

**GAIA-X**: Launched jointly by France and Germany in 2020, $10 billion+ invested, 180+ data spaces. But US firms (AWS, Google, Microsoft) joined, drawing criticism as "Big Tech's Trojan horse."

**EuroStack**: A 10-year, €300 billion investment plan, with an initial €10 billion tech fund.

**EURO-3C (announced 2026-03)**: Led by Telefonica, backed by the European Commission, 70+ entities participating. A pragmatic approach that **connects existing national infrastructure into a federated network**, rather than building a new platform from scratch. Telefonica's CDO: "Building a European hyperscaler from scratch is extremely hard. Europe must invest not only in using technology but in creating it."

**France SecNumCloud 3.2**: ANSSI's top-tier cloud security baseline. In response to FISA, it requires exclusive application of European law and excludes extraterritorial US law. OVHcloud and 3DS OUTSCALE are certified.

**Gartner forecast**: European sovereign cloud IaaS spending will grow **83%** from $6.9 billion in 2025 to $12.6 billion in 2026. By 2027, projected to overtake North America.

### Japan's hybrid model: three-axis sovereignty over technology, operations, and finance

Japan chose a different path. Not isolation, but a **hybrid model** — maintain sovereign control while keeping access to cutting-edge technology.

Government cloud systems grew **335% from 671 to 2,918**, managed under roughly 330 security baseline requirements.

The three-axis sovereignty model:
1. **Technology sovereignty**: all data centers, networks, and servers handling sensitive information located within Japan
2. **Operational sovereignty**: Japanese personnel handle operations, encryption key management, network monitoring, and patch cycles
3. **Financial support**: METI's Economic Security Promotion Act (2024) supports the domestic cloud supply chain

Private partnerships are also active: SoftBank+Oracle's sovereign cloud (built on Oracle Alloy, launching in eastern Japan in April 2026), Fujitsu's Takane LLM (for data that cannot use the public cloud), and others.

### SRE lessons: design your dependencies

1. **Multi-cloud is an operating model.** Per Gartner, 76% of enterprises use two or more public clouds. Not just a trend, but multi-cloud as an operating model.
2. **Control-plane ownership is true sovereignty.** Not data-center location but IAM, billing, APIs, key management, and ToS are the real control points.
3. **Key management sovereignty is non-negotiable.** Encryption keys must be controlled by the organization or national entity, not the cloud provider.
4. **Architect for the scenario where the cloud provider's API access is revoked.** Convert political risk into an engineering problem.

---

## Conclusion: What SREs Can Do

This three-axis analysis converges on one conclusion: **dependencies are hidden, failures propagate along dependencies, and recovery is harder than the outage**.

A checklist SRE teams can execute starting tomorrow:

### Backup and resilience

- [ ] Adhere to the **3-2-1-1-0 backup rule**: 3 copies, 2 media, 1 offsite, 1 air-gapped/immutable, 0 errors in recovery testing
- [ ] Verify that backups are in a **physically separated location** from primary (the NIRS lesson: same building = no backup)
- [ ] **Quarterly DR tests** — verify actual recovery, not just the existence of backups

### Deployment and change management

- [ ] **Canary deployment for all config changes** (configs too, not just code)
- [ ] **Forbid** instant global propagation of config changes — staff traffic → 1% → 5% → 25% → 100%
- [ ] **Automatic rollback** mechanism on anomaly detection
- [ ] Validate configuration files as if they were **untrusted input**

### Circuit breakers and failure isolation

- [ ] Implement **circuit breakers** at every external/critical dependency boundary
- [ ] **Fail-open** design on availability-first paths (error/unknown state → allow)
- [ ] Build a **dependency map** — including second- and third-order dependencies ("your dependency's dependency is your dependency")
- [ ] Verify incident-response tools are **independent** of what they monitor and control

### Recovery design

- [ ] **Separate recovery-mode thresholds from normal-state ones** (health checks, capacity removal rates)
- [ ] **Prevent thundering herds**: backoff, jitter, queue-based rate limiting
- [ ] **Hard safety bounds** on automated recovery (deletion ceilings, change-rate limits)

### Digital sovereignty and multi-cloud

- [ ] **Document and plan response for the scenario** of cloud-provider API access revocation
- [ ] Verify **encryption key management** is provider-independent
- [ ] **Workload placement** by data classification — sovereignty-mandatory vs. public-cloud-allowed
- [ ] Use **abstraction layers** (Kubernetes, Terraform) for portability

### Market-concentration risk response

- [ ] **Multi-CDN** strategy (active-active, not simple backup)
- [ ] **Multi-provider DNS**
- [ ] Recognize that backups on the same infrastructure are **false security**
- [ ] **Regular failover tests that simulate complete provider outage**

---

> 2025 industry stats: 100% of organizations have experienced outage-related revenue loss. Average loss per outage at large enterprises: $500,000. Organizations endure 86 hours of downtime per year. Yet fewer than one-third conduct regular failover tests.

We can't stop the internet from becoming a single point of failure. But we can change **how our systems depend on that single point of failure**. That's the SRE's job.

---

*Technical details of the outages in this piece are based on official postmortems from each service provider and independent analyses.*

**References:**
- [AWS DynamoDB postmortem](https://aws.amazon.com/message/101925/)
- [Cloudflare November postmortem](https://blog.cloudflare.com/18-november-2025-outage/)
- [Cloudflare December postmortem](https://blog.cloudflare.com/5-december-2025-outage/)
- [Cloudflare February postmortem](https://blog.cloudflare.com/cloudflare-outage-february-20-2026/)
- [Cloudflare Code Orange: Fail Small](https://blog.cloudflare.com/fail-small-resilience-plan/)
- [Pragmatic Engineer — AWS outage analysis](https://newsletter.pragmaticengineer.com/p/what-caused-the-large-aws-outage)
- [Krebs on Security — security implications of the Cloudflare outage](https://krebsonsecurity.com/2025/11/the-cloudflare-outage-may-be-a-security-roadmap/)
- [Internet Society — infrastructure concentration and resilience erosion](https://pulse.internetsociety.org/blog/how-consolidation-is-eroding-internet-resilience)
- [ASPI Strategist — South Korea NIRS fire](https://www.aspistrategist.org.au/south-korea-held-data-domestically-and-lost-it-in-a-fire/)
- [TechPolicy.Press — cloud kill switch](https://www.techpolicy.press/washington-could-activate-a-kill-switch-to-terminate-european-access-to-us-tech-heres-how-it-could-work/)
- [Gartner — sovereign cloud IaaS forecast](https://www.gartner.com/en/newsroom/press-releases/2026-02-09-gartner-says-worldwide-sovereign-cloud-iaas-spending-will-total-us-dollars-80-billion-in-2026)
