---
name: Warm Parchment & Ink
colors:
  surface: '#fff8f5'
  surface-dim: '#e7d7cd'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e9'
  surface-container: '#fcebe1'
  surface-container-high: '#f6e5db'
  surface-container-highest: '#f0dfd6'
  on-surface: '#221a14'
  on-surface-variant: '#404848'
  inverse-surface: '#382e28'
  inverse-on-surface: '#ffede4'
  outline: '#707978'
  outline-variant: '#bfc8c7'
  surface-tint: '#2c6766'
  primary: '#004443'
  on-primary: '#ffffff'
  primary-container: '#1f5c5b'
  on-primary-container: '#98d2d0'
  inverse-primary: '#97d1cf'
  secondary: '#7e5713'
  on-secondary: '#ffffff'
  secondary-container: '#fec97b'
  on-secondary-container: '#78520e'
  tertiary: '#6e2413'
  on-tertiary: '#ffffff'
  tertiary-container: '#8c3a27'
  on-tertiary-container: '#ffb6a6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b2edeb'
  primary-fixed-dim: '#97d1cf'
  on-primary-fixed: '#00201f'
  on-primary-fixed-variant: '#0c4f4e'
  secondary-fixed: '#ffddb1'
  secondary-fixed-dim: '#f2be71'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#614000'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a3'
  on-tertiary-fixed: '#3d0600'
  on-tertiary-fixed-variant: '#7b2e1c'
  background: '#fff8f5'
  on-background: '#221a14'
  surface-variant: '#f0dfd6'
typography:
  display:
    fontFamily: Merriweather
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Merriweather
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Merriweather
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Merriweather
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Merriweather
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 34px
  headline-sm:
    fontFamily: Merriweather
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Merriweather
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 32px
  body-md:
    fontFamily: Merriweather
    fontSize: 16px
    fontWeight: '300'
    lineHeight: 28px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system evokes the tactile intimacy of a well-worn leather journal, illuminated manuscript margins, and the romance of personal chronicling. Designed for reflective writers, dreamers, and personal archivists, it transforms digital journal entry into an immersive, sensory ritual. 

The aesthetic is **Tactile Warm Editorial with Mythic Undertones**. It combines organic, deckled paper aesthetics with purposeful typography and nostalgic archival details:
- **Atmosphere:** Intimate, nostalgic, literary, and grounded. It avoids sterile white utility in favor of warm, fibrous parchment textures and rich sepia ink.
- **Physical Metaphors:** UI elements reference bookbinding arts—woven ribbon bookmarks, gilded corner brasses, archival date stamps, and fountain-pen flourishes.
- **Spanish Heritage Nuance:** Copy and framing draw from magical realism traditions (*Crónicas*, *Diario*, *Tinta y Memoria*), complemented by an understated quill pen crest emblem.

## Colors

The palette reproduces traditional physical media: organic vellum, calligraphic gall ink, oxidized gold leaf, and deep sea-pine wash.

### Role Allocations
- **Canvas & Backgrounds:**
  - `Base Canvas`: `#FDFBF7` (Virgin cream vellum).
  - `Card / Page Surface`: `#F5EFEB` (Warm heavy laid paper).
  - `Sunken / Wells`: `#EDE4DA` (Compressed bookblock & inset fields).
- **Ink & Typography (Neutral):**
  - `Primary Ink`: `#2D241E` (Dark walnut ink for titles and focal text; high readability without sterile pitch black).
  - `Secondary Ink`: `#4A3E35` (Diluted sepia for body reflections and metadata).
  - `Muted / Stamp Ink`: `#7C6E65` (Faded graphite for captions, line rules, and disabled states).
- **Accents:**
  - **Primary (`#1F5C5B` / Deep Teal):** Used for focal action anchors, active quill strokes, primary buttons, and reading progress indicators. Its tinted counterpart (`#E0EFEF`) provides gentle contextual backdrops.
  - **Secondary (`#D4A359` / Golden Amber):** Evokes illuminated manuscript gilding. Reserved for highlights, favorite stars, streak seals, and celebratory chapter bookmarks.
  - **Tertiary (`#8C3A27` / Venetian Wax):** Accent red-ochre dedicated to critical warnings, destructive confirmations, and seal stamps.

## Typography

The typography implements a dual-voice framework:
1. **The Narrator Voice (Merriweather):** Handled by an authoritative, bookish serif with generous x-height and warm brackets. Used across all editorial spaces: titles, chapter entries, essay compositions, and pull quotes. Line heights are purposefully generous (`1.75` - `1.8x`) to evoke broad notebook page spacing and encourage deep, unhurried reading.
2. **The Instrument Voice (Plus Jakarta Sans):** A friendly, contemporary geometric sans with soft humanist curves. Used for controls, word counters, timestamps, metadata labels, search bars, and tags. This anchors functional interactions without intruding into the lyrical immersion of the written words.

## Layout & Spacing

The interface employs a fixed-max-width single/dual book spread layout architecture rather than an edge-to-edge dashboard grid.

### Layout Rhythm & Constraints
- **Story Composition Width:** Maximum read-write width is strictly capped at `720px` (equivalent to an open book leaf) to maintain optimal typographic line length (60–75 characters per line).
- **Two-Column Ledger Layout:** At desktop breakpoints (`>= 1024px`), layouts may display a double-page spread format: a pinned navigation/index margin column (280px–320px) and a main manuscript page (max 800px), centered with `margin: 2rem auto`.
- **Vertical Cadence:** Rooted in an 8px vertical baseline. Spacing between paragraphs is set to `space-md` (16px), while distinct journal section breaks demand `space-xl` (40px) punctuated by subtle typographic glyphs (e.g., `✦` or `❦`).

## Elevation & Depth

Depth in this system avoids synthetic grey drop shadows, utilizing warm, ambient light passing through sheets of heavy stock cotton paper.

### Depth Scales
- **Level 0 (Desk / Background Canvas):** Flat `#FDFBF7`. Provides the foundational surface onto which bound artifacts are placed.
- **Level 1 (Paper Leaf / Cards):** Surface `#F5EFEB`. Rendered with a compound warm shadow:
  - `0 1px 3px rgba(45, 36, 30, 0.05), 0 6px 16px rgba(45, 36, 30, 0.04)`.
  - Border: 1px solid `rgba(74, 62, 53, 0.08)`.
- **Level 2 (Floating Manuscript / Active Entry):** Raised paper leaf for active editing, side panels, or search dialogs.
  - Surface `#FDFBF7`.
  - `0 8px 24px rgba(45, 36, 30, 0.07), 0 20px 48px rgba(45, 36, 30, 0.05)`.
  - Accent: 1px solid `rgba(212, 163, 89, 0.25)` (Golden amber ambient rim).
- **Level 3 (Overlays & Dialogs):**
  - Backdrop: `rgba(45, 36, 30, 0.35)` with `backdrop-filter: blur(4px)`.
  - Elevation shadow: `0 24px 64px rgba(45, 36, 30, 0.16)`.

### Tactile Paper Details
- **Lined Sheet Motif:** Reading and creation spaces utilize an ultra-faint horizontal rule (`repeating-linear-gradient` with `rgba(74, 62, 53, 0.06)` spaced at `32px`) aligned directly to text line-height.

## Shapes

Shapes emulate organic, hand-trimmed corners and soft leather-bound folios. With `roundedness: 3`, the design system relies on generous organic silhouettes to avoid cold digital angularity.

- **Sheets & Cards:** Base curves feature `rounded-2xl` (1.5rem) to `rounded-3xl` (2rem), imparting a soft, book-corner finish.
- **Interactive Badges & Pills:** Full pill radius (`9999px`) for metadata markers, mood chips, and date stamps.
- **Asymmetric Foliations:** Hero journal entries and book-cover previews feature asymmetrical rounding (e.g., `top-left: 0.5rem`, `top-right: 2rem`, `bottom-right: 2rem`, `bottom-left: 0.5rem`) mimicking a bound book spine on the left and thumbed outer edges on the right.

## Components

### Buttons
- **Primary ("La Pluma"):** Solid `#1F5C5B` fill with `#FDFBF7` text. Rounded-full styling. Hover shifts subtly to `#174746` with a delicate golden ring (`box-shadow: 0 0 0 2px #D4A359`).
- **Secondary ("Pergamino"):** Surface `#F5EFEB` with a 1.5px border of `#EDE4DA` and text in `#2D241E`. Hover elevates background to `#FDFBF7` with an ambient warm shadow.
- **Tertiary / Ghost:** No background; text in `#1F5C5B`. Underline appears on hover styled as a smooth calligraphic stroke.

### Input Fields & Story Editor
- **Framed Inputs:** Search and title inputs sit on sunken `#EDE4DA` fields with rounded-xl boundaries, using `#4A3E35` placeholders. Focus state draws a rich 1.5px `#1F5C5B` line and faint teal glow (`#E0EFEF`).
- **Freeform Story Canvas:** Stripped of standard UI borders. The editor appears directly over faint ruled paper lines with an amber-tinted caret indicator.

### Chips & Mood Counters
- **Metadata Badges:** Pill-shaped capsules with tinted backgrounds (`#E0EFEF` for teal states, `#F5EFEB` for neutral dates, `#F9F1E2` for amber milestones). Font is `label-sm` in bold uppercase with expanded tracking.

### Cards & Journal Spreads
- Built on `#F5EFEB` with `rounded-3xl` geometry. Left borders can occasionally carry a stitched dashed seam (`border-left: 2px dashed rgba(74, 62, 53, 0.15)`).
- **Bookmark Divider Tabs:** Sticky tags anchored to the top-right of cards, rendered in `#D4A359` or `#1F5C5B` with a swallowtail ribbon cut-out (`clip-path: polygon(...)`).

### Checkboxes & Radio Controls
- Circular checks replace standard industrial squares. An unchecked state uses an ink-wash outline (`1.5px solid #7C6E65`). Checked state transitions to a solid `#1F5C5B` disk featuring an organic ivory quill checkmark.

### Mascot & Archival Embellishments
- **Mascot Placement:** A minimalist line-drawn quill feather mascot nestled into the header nav, empty-state illustrations, and watermarked faint background corners (`opacity: 0.04`).
- **Spanish Archival Stamps:** Completed entries bear a circular stamped seal with date and signature indicators (*"Registrado en Narra" / "Tinta Firme"*).