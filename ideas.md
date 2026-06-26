# Fyro Website Design Brainstorm

## Context
- Company: Fyro — AI consulting, custom agents, workflow automation
- Founder: RJ (Robert Robinson Jr.) — speaks at IBM, Morehouse DreamMakers Summit
- Target: Service-based businesses (government, professional services, etc.)
- Brand: Red + dark gray/charcoal, techy vibe
- Key assets: Speaking photos at Morehouse & IBM

---

<response>
<text>
## Idea 1: Industrial Precision

**Design Movement:** Industrial Modernism meets Brutalist Tech

**Core Principles:**
1. Raw, confident typography that commands authority
2. Asymmetric grid layouts that feel intentional, not accidental
3. High contrast — near-black backgrounds with crimson red accents
4. Data-forward — numbers and metrics as visual anchors

**Color Philosophy:**
- Background: #111214 (near-black with a slight warm undertone — not pure black, feels more premium)
- Primary accent: #D42B2B (deep crimson red — authoritative, not garish)
- Secondary: #E8E8E8 (off-white for body text — softer than pure white)
- Highlight: #FF4444 (bright red for CTAs and hover states)
- Muted: #2A2A2E (card backgrounds — slightly lighter than page bg)

**Layout Paradigm:**
Offset grid — hero section splits 60/40 with text on the left and a large editorial photo on the right. Sections alternate between full-bleed dark and slightly lighter card panels. Navigation is minimal — left-aligned logo, right-aligned nav links.

**Signature Elements:**
1. Diagonal red slash dividers between sections (CSS clip-path)
2. Monospace counter numbers for stats (e.g., "72%" in a large mono font)
3. Red left-border accent lines on section headings

**Interaction Philosophy:**
Deliberate and weighty — hover states reveal red underlines, buttons have a subtle press-down scale effect. Nothing feels frivolous.

**Animation:**
- Section entrance: fade-up with 40ms stagger per element
- Stat counters animate up on scroll-into-view
- Nav: subtle background blur appears on scroll
- CTA button: scale(0.97) on press, 160ms ease-out

**Typography System:**
- Display: Barlow Condensed ExtraBold (headlines — tall, industrial, commanding)
- Body: DM Sans Regular/Medium (readable, modern, slightly geometric)
- Accent: JetBrains Mono (for stats, numbers, code-like elements)
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Idea 2: Executive Dark — The Chosen Design

**Design Movement:** Premium Executive Tech / High-End Consulting

**Core Principles:**
1. Confidence through restraint — every element earns its place
2. Editorial photography as the hero — RJ's real photos do the heavy lifting
3. Warm dark backgrounds (not cold black) — approachable authority
4. Red as a precision tool — used sparingly for maximum impact

**Color Philosophy:**
- Background: #0F0F11 (deep charcoal with a warm undertone)
- Surface: #1A1A1F (card/section backgrounds)
- Red primary: #E03030 (crimson — strong but not aggressive)
- Red glow: rgba(224,48,48,0.15) (for subtle glows behind CTAs)
- Text primary: #F2F2F2 (warm white)
- Text muted: #8A8A96 (cool gray for secondary text)
- Border: rgba(255,255,255,0.08) (barely-there borders)

**Layout Paradigm:**
Magazine-editorial hybrid — the hero is a full-width split with RJ's photo taking up the right 45%, text on the left with generous vertical rhythm. Sections use a mix of full-bleed and contained layouts. The "About" section breaks the grid with an oversized photo and offset text block.

**Signature Elements:**
1. Thin red horizontal rule lines as section separators
2. Large ghost/outline numbers behind section headings (e.g., "01", "02")
3. Photo cards with a subtle red gradient overlay on hover

**Interaction Philosophy:**
Smooth and premium — everything transitions at 200-250ms. Hover states are subtle color shifts, not dramatic transformations. The site should feel like a luxury brand's digital presence.

**Animation:**
- Hero: staggered text reveal (opacity + translateY, 60ms stagger)
- Cards: gentle lift (translateY -4px) on hover with shadow deepening
- Section numbers: fade in slightly delayed after section heading
- Scroll-triggered stat counters with easing

**Typography System:**
- Display: Syne Bold/ExtraBold (geometric, modern, distinctive — not Inter)
- Body: Plus Jakarta Sans Regular/Medium
- Mono accent: Space Mono (for stats and technical labels)
</text>
<probability>0.07</probability>
</response>

<response>
<text>
## Idea 3: Signal & Fire

**Design Movement:** Kinetic Futurism / Motion-Forward Tech

**Core Principles:**
1. Motion as communication — the site feels alive
2. Fire metaphor throughout — Fyro = fire, energy, ignition
3. Layered depth — foreground/midground/background elements
4. Bold asymmetry — nothing is centered unless it needs to be

**Color Philosophy:**
- Background: #0C0C0E (near-black)
- Gradient accent: linear from #C0392B to #E67E22 (fire gradient — red to amber)
- Surface: #161618
- Text: #EFEFEF
- Glow: rgba(192,57,43,0.3) for ambient fire glow effects

**Layout Paradigm:**
Layered parallax sections — hero has a subtle particle/ember background effect. Text blocks are offset to the left or right, never centered. The services section uses a horizontal scroll on mobile and a 3-column asymmetric grid on desktop.

**Signature Elements:**
1. Ember/particle animation in hero (CSS-only, subtle)
2. Fire gradient applied to key words in headlines ("ignite", "scale", "build")
3. Diagonal section breaks with gradient fills

**Interaction Philosophy:**
Energetic but controlled — interactions feel like sparks. Quick, snappy, satisfying.

**Animation:**
- Hero headline: word-by-word reveal with 80ms stagger
- Background: slow-moving gradient mesh animation
- Cards: border gradient animates on hover (fire sweep effect)
- CTA: pulsing glow ring on the primary button

**Typography System:**
- Display: Bebas Neue (tall, bold, cinematic — great for fire/energy brand)
- Body: Nunito Sans (friendly, readable, contrasts well with bold display)
- Accent: Courier Prime (for technical/code elements)
</text>
<probability>0.06</probability>
</response>

---

## Selected Design: **Idea 2 — Executive Dark**

Reasoning: RJ's brand is consultative and trust-based. Clients are business owners and government agencies. The "Executive Dark" approach communicates premium authority, positions Fyro as a high-end partner (not a cheap SaaS tool), and lets the real photography shine. The Morehouse and IBM photos are the strongest trust signals — the design should frame them beautifully, not compete with them.
