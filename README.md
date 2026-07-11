# 🔎 Mind & Motive

A browser-based **criminal-profiling trainer**. Work eight gritty cases — read the crime scene, flip through the evidence, make your profiling calls, and name the offender. Each case teaches a real concept from offender profiling and its limits.

**▶ Play: https://vulp-ecula.github.io/Mind-Motive/**

## The cases

1. **The Widow's Tea** — victimology & signature
2. **The Forged Farewell** — staging & required-skill inference
3. **The Tenement Blaze** — arson: point of origin & the returning setter
4. **The Harbour Ring** — geographic profiling (marauder vs. commuter)
5. **The Returned Tool** — overkill, signature, and the "mixed" scene
6. **The Marked Page** — communicative signature & escalation
7. **The Posed Penitent** — posing vs. staging & the mission motive
8. **The Two Who Fit** — bias, stereotyping, and what profiling *can't* do

## How it plays

Each case runs: an atmospheric brief → swipe through clue cards → three fast profiling calls (with a one-line teaching hit on each) → a **deeper read** on a key clue → name the suspect → a **"why it works"** follow-up that tests the principle. Earn XP, climb ranks (Cadet → Lead), and collect badges.

## A note on realism

The concepts are taught in their clean, textbook form for learnability. Real profiling is far messier and more contested — it narrows a suspect pool rather than naming a person, several of its typologies are disputed, and confident profiles have sent innocent people to trial. The final case is built around exactly that caution.

## Tech

A single React component (`mind-motive.jsx`), precompiled to a static site (`index.html` + `game.js`) with bundled React — no build step needed to run it. Synthesized audio via the Web Audio API; no external assets or CDNs.

*Built with Claude.*
