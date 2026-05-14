---
title: 'WikiTok — Scrolling Wikipedia Like TikTok, and What Changes'
description: 'In a world ruled by algorithms, an app without an algorithm went viral. WikiTok, which flips through Wikipedia''s 9.5 million articles TikTok-style, aspires to be "the opposite of doomscrolling." The questions raised by this tiny web app — built with AI in two hours — are bigger than they look.'
pubDate: 2026-03-07T14:35:53.949Z
lang: en
pairSlug: 'wikitok-tiktok-wikipedia-serendipity'
draft: false
---
# WikiTok — Scrolling Wikipedia Like TikTok, and What Changes

> In a world ruled by algorithms, an app without an algorithm went viral. WikiTok, which flips through Wikipedia's 9.5 million articles TikTok-style, aspires to be "the opposite of doomscrolling." The questions raised by this tiny web app — built with AI in two hours — are bigger than they look.

---

## 1. The opposite of doomscrolling

When you scroll TikTok, time evaporates. Before a 15-second clip finishes, your thumb flicks up, the next clip starts, you flick again, another starts. Half an hour later you pry your eyes off the screen and barely remember anything you watched. The content was algorithmically hand-picked, but all that remains is a vague fatigue.

Now what if the thing you were scrolling through was Wikipedia?

In early 2025, a web app called **WikiTok** detonated on Hacker News. It's a simple app — Wikipedia articles displayed in TikTok-style vertical scroll. Nothing more, in itself. And yet it racked up thousands of upvotes, drew dozens of press write-ups, and spawned immediate clone projects. Why?

**Because in an algorithm-ruled era, an app with no algorithm touched a thirst people didn't realize they had.** In a world where recommendation engines relentlessly push "things you'll probably like," an app that throws "things you have no idea whether you'll like" felt fresh, precisely because it was strange. WikiTok got attention not for technical innovation but for **a philosophical choice**.

---

## 2. What WikiTok is

WikiTok's creator is **Isaac Gemal**, a software engineer based in New York. The genesis is amusing.

It started on Twitter (X). Developer Tyler Angert posted a tweet to the effect of "wouldn't it be nice if you could view Wikipedia like TikTok," and Grant Slatton retweeted it. Gemal saw the tweet at 12:30 AM. A normal person would have thought "interesting idea" and gone to bed, but Gemal started coding immediately. **Two hours later, a prototype was working.**

The tech stack is shockingly light. **React 18, TypeScript, Tailwind CSS, Vite.** No backend server. The browser calls Wikipedia's public API directly. No server costs, no database, no auth system. Pure front end.

The key features:

- **Completely random presentation across 9.5 million articles** — no algorithm, no personalization
- **No tracking, no ads** — no user data collected
- **14 languages** — English, Korean, Japanese, Chinese, and more
- **PWA (Progressive Web App)** — installable like a native app on mobile
- **Bookmarks and sharing** — save articles you like, share to social

And the part that became most talked about: **roughly 90% of the code was written by AI.** Gemal built the prototype using Claude AI and Cursor (an AI code editor). The so-called "vibe coding" approach — set the rough direction and let the AI handle implementation.

The project is open source on GitHub, with over 1,300 stars and 170+ forks. A casual side project became a phenomenon.

---

## 3. Hacker News response — enthusiasm and debate

WikiTok made the Hacker News front page multiple times. The reactions split into roughly four threads.

### Enthusiasm — "surprisingly addictive"

The most-repeated phrase was **"surprisingly addictive."** Random Wikipedia articles, it turns out, are more entertaining than expected. Ancient Roman road systems, an endangered bird in Papua New Guinea, German hyperinflation in the 1920s — encountering subjects you'd never have searched for was addictive.

Many users invoked **StumbleUpon**. The web service that ran from 2007 to 2018, where one button click teleported you to a random website. "I missed StumbleUpon, and finally something like it appeared" — a steady stream of nostalgic reactions. Proof of how deep the thirst for non-algorithmic discovery tools had become.

### The algorithm debate — the core conflict

The hottest debate centered on **personalization algorithms**. More than a few users asked for "more articles aligned with my interests." Show more history articles to history enthusiasts, more science articles to science enthusiasts — that kind of personalization. It sounds reasonable.

But Gemal explicitly refused.

> **"We're already ruled by ruthless, opaque algorithms everywhere we look online. Can't we just have one little corner of the internet without them?"**

That one line defined WikiTok's identity. Refusing user convenience is usually a fast track to product failure. But for Gemal the absence of an algorithm wasn't a bug — it was **the core feature**. Efficiency was deliberately abandoned, and randomness placed front and center.

### The AI coding debate

The fact that it was "built in two hours with AI" also stirred debate. Some developers dismissed it as a **"vibe-coded" project**, skeptical. AI-written code is structurally fragile, hard to maintain, and the creator themselves may not fully understand it.

Others retorted, "Does a front-end app of a few hundred lines require complex software engineering?" It's open source, the community is already improving the code, and above all — **it works**. A pragmatist's position: a shipped product beats perfect code.

### UX feedback and copycats

Practical feedback piled up too. Clicking an external link inside a Wikipedia article kicks you out of WikiTok, breaking the scroll flow. Many users didn't realize you can install it as a PWA. And right after it went viral, **a flood of clones and copycats** appeared. As simple as the idea was, it was equally easy to copy.

---

## 4. Critiques and counter-critiques

The main critiques of WikiTok and the responses to them.

**Critique 1: No algorithm means inefficiency**

With pure random, most articles will be unrelated to the user's interests. A small African village, an 1800s German politician, the taxonomy of a particular insect — is endlessly swiping through articles you don't care about really meaningful?

Response: **That's exactly the point.** Algorithm-based services reinforce existing interests, showing variations on things you already know. Pure randomness opens the possibility of unexpected discovery — **serendipity**. The feeling of walking between library stacks and pulling out a book that happens to catch your eye. WikiTok's goal isn't efficiency, it's discovery.

**Critique 2: AI-written code is unmaintainable**

Code that's 90% AI-written is structurally fragile, and the creator likely doesn't understand all of it. Long-term maintenance is impossible.

Response: WikiTok's entire codebase is on the order of a few hundred lines. It calls the Wikipedia API and shows results as cards. That's it. Demanding enterprise-grade architecture at this scale is over-engineering. Besides, being open source means the community is continuously reviewing and improving it.

**Critique 3: It's just another form of doomscrolling**

Only the target changed from TikTok to Wikipedia — the act of endless scrolling is identical. Isn't "educational doomscrolling" a contradiction in terms?

Response: Not all scrolling is the same. The critical difference is **the presence or absence of an algorithm**. TikTok's recommendation algorithm is engineered to maximize emotional reactions. Content that triggers anger, surprise, FOMO gets prioritized. WikiTok has no such mechanism. The addiction algorithms manipulate and voluntary exploration are fundamentally different things. Yes, time can still get sucked up — but at least no one engineered the system to capture your attention.

**Critique 4: No revenue model — unsustainable**

No ads, no subscription, no funding. Doesn't the project die when the creator's enthusiasm fades?

Gemal addressed this by **declaring his intent to keep it free and non-commercial**. With no backend, server costs are negligible. As long as Wikipedia's API is available, operating costs are effectively zero. Sustainability doesn't have to depend on a revenue model. The countless open-source projects maintained by their communities are proof.

---

## 5. Similar software

WikiTok doesn't exist in isolation. Around the twin axes of "serendipitous discovery" and "short-form knowledge consumption," similar projects exist.

**StumbleUpon (2007–2018)** — The predecessor most often compared to WikiTok. One button took you to a random website on the internet. At its peak, monthly active users reached 25 million, but after rebranding to Mix in 2018 it effectively disappeared. Hence Hacker News calling WikiTok "StumbleUpon's spiritual successor."

**Xikipedia (Lyra Rebane, February 2025)** — Born nearly simultaneously with WikiTok, and an interesting alternative. It uses Simple Wikipedia as its source and, unlike WikiTok, ships with a **local algorithm**. A like awards +50 points, a scroll-past deducts -5, and the system learns your interests. The key point: **data never leaves the device**. A third position — "transparent algorithm" — that uses an algorithm but makes it neither opaque nor exploitative.

**WikiTock** — A variant combining AI-driven personalization with visual knowledge mapping. The opposite approach, embracing algorithms.

**WikiRoulette** — The simplest form. A viewer that shows Wikipedia random pages one at a time. It existed before WikiTok but lacked the TikTok-style UX.

**Wiki Stumble** — A server-based StumbleUpon-style Wikipedia explorer. Stores user-rating data on a server.

**Wikiwand** — A service that redesigns Wikipedia's reading experience for modernity. Not about random discovery, but about making existing Wikipedia prettier and more readable. A fundamentally different approach.

**Microlearning apps** — Deepstash, Blinkist, Headway, Nibble, and others. Apps that compress books or lectures into short cards. They overlap with WikiTok on the "short-form knowledge consumption" axis but differ essentially — they serve curated content.

Looked at together, these projects reveal **an algorithm spectrum**. At one extreme is pure random (WikiTok, WikiRoulette); at the other is AI-driven personalization (WikiTock); in between sits the transparent local algorithm (Xikipedia). The very fact that the same content (Wikipedia) can produce such varied philosophical choices is itself interesting.

---

## 6. Broader context — the TikTokification of knowledge

WikiTok is part of a larger current. **"TikTokification of knowledge"** — a trend by that name.

Short-form, visually-centered, scroll-based consumption. These three combined are fundamentally reshaping how knowledge is consumed. A 60-second TikTok summarizing a university lecture racks up millions of views; an Instagram Reel explaining a historical event in meme format reaches students before the textbook does.

Academic research is watching too. Papers on the educational uses of TikTok appear regularly in IEEE, Springer, ScienceDirect, and other major academic publishers. Roughly **25%** of Americans rate TikTok's educational content as "accurate and useful," and one survey found **69%** of students have used TikTok for homework.

The Learning Guild analyzes this under the term **"TikTokification of Learning."** The core question: can short-form content replace deep learning? Most education researchers say "not as a replacement, but as a complement." You can't fully grasp quantum mechanics from a 15-second clip, but it can serve as an entry point that sparks interest.

Here, two streams collide. One is **"algorithm-curated education"** — TikTok, YouTube Shorts, Instagram Reels pushing educational content through recommendation algorithms. Efficient, but with the problem that algorithms prioritize "high engagement" over "educational value."

The other is **"algorithm-free serendipity"**. WikiTok sits here. No personalization at all — toss one of 9.5 million articles at random. Inefficient, but free from algorithmic bias.

Which of these two produces "better learning" isn't yet settled. What's certain is that WikiTok **stands firmly with the latter**. And the fact that the choice resonated with so many people reveals just how deep the fatigue with algorithm-driven curation has become.

---

## 7. Algorithm fatigue and the rediscovery of chance

**Algorithm fatigue is real.**

Years of research have accumulated showing that doomscrolling triggers anxiety, depression, and general well-being decline. But the problem isn't doomscrolling itself — it's **why the scrolling doesn't stop**. TikTok's recommendation algorithm analyzes dozens of signals (dwell time, likes, shares, repeat views) to decide "what to show next." The system is designed not for user satisfaction but for **maximizing time-on-platform**. The algorithm doesn't work for you — it makes you work for the platform.

In this context, WikiTok's real innovation comes into focus. **Not technical innovation but a "philosophy of subtraction."** It subtracted the algorithm. Subtracted tracking. Subtracted ads. Subtracted personalization. Subtracted the revenue model. What's left is 9.5 million Wikipedia articles and a simple interface that flips through them one at a time at random.

Why is subtraction innovation? Because in our digital environment, **the default is addition**. Every app pursues more features, more refined recommendations, longer dwell times. Deliberately going the other way isn't technical incompetence — it's a philosophical choice. Like minimalism: not because you can't afford things, but as a conscious decision.

Consider why StumbleUpon died in 2018 and WikiTok went viral in 2025. What happened in those seven years? The golden age of algorithmic dominance. TikTok swept the world, YouTube refined its recommendation algorithm to extremes, Instagram switched the feed to algorithmic. People experienced the convenience the algorithm provides — and felt its cost: filter bubbles, addiction, attention extraction.

WikiTok's virality is the **counter-reaction** to that experience. Those who haven't lived through algorithms don't feel the value of an algorithm-free app. StumbleUpon was born too early; WikiTok was born at the right moment.

And the fact that **it was built in two hours with AI**. The significance goes beyond debates over code quality. It symbolizes an era where the distance between idea and execution has collapsed dramatically. Tyler Angert tosses an idea on Twitter, Isaac Gemal sees it at midnight, and a working prototype exists two hours later. If the distance from idea to product is two hours, what ideas can possibly remain unrealized? In a world where entry barriers have fallen, the basis of differentiation shifts from technical ability to **judgment about what to build, and what not to put in**.

The question WikiTok ultimately asks us is this: **between technology that pursues only convenience and technology that tries to reclaim chance and slowness, which do we want?**

There needn't be one answer. There are moments that need efficiency, and moments that need wandering. Just by reminding us that the option exists — that a world exists beyond the algorithm — WikiTok has done its job. The sensation of walking between library stacks and pulling out a book your hand drifts toward — that sensation we thought we'd lost in the digital age has revived itself on a smartphone screen.
