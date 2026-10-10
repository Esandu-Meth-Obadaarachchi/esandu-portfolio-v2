# Design: Esandu Obadaarachchi, portfolio v2

## The brief, pinned

- **Subject:** Esandu, an AI engineer (Associate Software Engineer, Full Stack AI at Digital T3 since Sep 2026) who has already shipped production AI at SLT Telecom and won national awards for it.
- **Audience:** hiring leads for AI engineering roles first. Founders and businesses that want AI built into their operations second.
- **The page's one job:** prove, in under a minute, that he builds AI systems that reach production, on time, and move a business.
- **Positioning:** AI engineer first. Full-stack is the reason the AI ships, not the headline.

## Concept: the page runs like an agent

An agentic workflow is a loop: it plans, calls tools, checks its own work and ships an answer. The site borrows that structure for real wayfinding, not decoration:

- The **run rail** on the right edge is the navigation. Each section is a node. Visited nodes fill, the current node pulses signal red. It answers "where am I, where can I go".
- **The Loop** section is a scroll-driven graph of how he works: Understand, Digitise, Build the agent, Evaluate, Ship, Scale. A pulse travels the edges as you scroll. This carries the brief's ideas: scaling a business, delivering on time, digitalising, agentic flow.
- **Lune AI's real retrieval graph** (rewrite, retrieve, rerank, grade, retry, groundedness check) is drawn as the case-study visual, because it is the actual mechanism.

## Signature moment

**The hero closes from the sides.** The hero opens like doors when the page loads. When you scroll, the doors close again (clip-path inset from left and right), and the name `OBADAARACHCHI` gets squeezed by them: the Archivo width axis runs from 125% to 62% as the panel narrows. The type is physically compressed by the layout. Opening on load and closing on scroll follow the same path (spatial consistency).

Everything else stays quiet so this lands.

## Tokens

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0A0D0B` | page base, green-black, never pure black |
| `--ink-2` | `#111713` | raised surfaces |
| `--forest` | `#0E2A1F` | deep field colour: hero panel, loop section |
| `--forest-2` | `#1A3D2F` | lines and fills inside forest fields |
| `--bone` | `#E9EAE3` | primary text |
| `--mute` | `#8D978F` | secondary text (6.3:1 on ink) |
| `--signal` | `#E8432E` | the one accent: live state, primary CTA, active node |
| `--gold` | `#D6A84E` | the award section only, the trophy's metal |

Red and green never sit at equal weight: green is atmosphere (large, dark, low saturation), red is a signal (small, rare).

**Type**
- Display: **Archivo Variable**, using the width axis (62 to 125) as an expressive control. Uppercase only for the name and section titles. Tight tracking at size.
- Body: **Geist Variable**, 17px base, line-height 1.6, measure under 68ch.
- Utility: **Geist Mono** for trace labels, timings, metadata.

**Shape:** one radius scale. Interactive elements are pills (999px), media and panels are 20px. Nothing else.

**Motion tokens**
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for entrances
- `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for on-screen moves
- UI feedback 120 to 220ms. Scroll-scrubbed motion is tied to position, not duration.
- Springs (critically damped) for the cursor and the trophy drag. A little bounce only on trophy release, since that follows a flick.
- `prefers-reduced-motion`: doors, scrubbing, pulse and parallax switch off. Content is static and fully readable.

## Cursor

A small ring (an agent node) and a dot. The ring follows on a spring, so there is a visible edge between the two, like a graph edge. Over links it grows and shows a verb ("open", "copy", "drag" over the trophy). Fine pointers only. The native cursor comes back on touch, keyboard use and reduced motion.

## Sections (each one a different layout family)

| # | Section | Layout family |
|---|---|---|
| 1 | Hero | full-bleed panel with door collapse, kinetic name, ambient agent graph canvas |
| 2 | Statement | single large paragraph, words light up as you read (scroll-scrubbed) |
| 3 | The Loop | pinned scroll-driven graph (vertical list on mobile) |
| 4 | Work | 4 featured case rows with mechanism diagrams, then a filterable index of every project with a detail drawer |
| 5 | Awards | 3D gold thumbs-up trophy you can spin (modelled on the real BMPC award), award list, photo strip |
| 6 | Research | two papers side by side with real metrics |
| 7 | Stack | the AI product stack as layers (models, agents, apps, infra), showing he covers every layer |
| 8 | Experience | timeline, work and education |
| 9 | Contact | giant email, copy to clipboard, CV |

## Rules kept on purpose

- No em dashes in visible copy. No fake product UI. No invented numbers: every figure comes from the CV or the old site.
- One eyebrow at most per three sections.
- Hero has four text elements at most.
- Images are WebP at the size they display. The 3D scene loads lazily, only when the awards section approaches.
