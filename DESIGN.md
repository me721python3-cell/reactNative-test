---
name: Vibrant Gamified Language
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3f4a36'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#6f7b64'
  outline-variant: '#becbb1'
  surface-tint: '#2b6c00'
  primary: '#2b6c00'
  on-primary: '#ffffff'
  primary-container: '#58cc02'
  on-primary-container: '#1e5000'
  inverse-primary: '#6be026'
  secondary: '#755b00'
  on-secondary: '#ffffff'
  secondary-container: '#fec700'
  on-secondary-container: '#6e5400'
  tertiary: '#006590'
  on-tertiary: '#ffffff'
  tertiary-container: '#4abdff'
  on-tertiary-container: '#004a6b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#87fe45'
  primary-fixed-dim: '#6be026'
  on-primary-fixed: '#082100'
  on-primary-fixed-variant: '#1f5100'
  secondary-fixed: '#ffdf92'
  secondary-fixed-dim: '#f4bf00'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#594400'
  tertiary-fixed: '#c8e6ff'
  tertiary-fixed-dim: '#88ceff'
  on-tertiary-fixed: '#001e2e'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-hero:
    fontFamily: Nunito Sans
    fontSize: 40px
    fontWeight: '900'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '900'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 22px
    fontWeight: '800'
    lineHeight: 28px
  headline-sm:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '800'
    lineHeight: 24px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '800'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '800'
    lineHeight: 18px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '800'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system embraces an ultra-tactile, high-energy gamified aesthetic engineered to make daily habit loops feel rewarding, accessible, and delightful. Built around instant feedback, chunked progression, and toy-like physical interactions, it bridges playful character-driven interfaces with structured instructional design.

### Design Movement: Tactile & Skeuomorphic Pop
The visual language relies on extruded, tactile components designed to look and feel pushable. Rather than relying on standard blur shadows or completely flat minimalism, the system uses physical metaphors: chunky layered depths, solid bottom bevel lips, dynamic press-down displacement, and exaggerated visual rewards.

### Emotional Target & Voice
- **Celebratory & Encouraging:** Never punitive; mistakes provide gentle encouragement, while wins trigger dynamic celebrations.
- **Friendly & Approachable:** Soft curves, generous hitboxes, and bubbly shapes eliminate anxiety around learning.
- **Urgent & Habit-Forming:** Clear, unmistakable game indicators (gems, hearts, streaks) signal immediate progression and status.

## Colors

The palette is expressive, punchy, and anchored by distinct semantic game roles. Every core interactive color is paired with a strictly defined darker bottom-bevel tone to achieve the 3D tactile push state.

### Core Interactive & Status Tokens
- **Action Green (Primary):** `#58CC02` (Surface) | `#46A302` (Bottom Bevel). Used for primary progression buttons ("Continue", "Check"), completed quest nodes, and forward momentum.
- **Sunshine Yellow (Secondary):** `#FFC800` (Surface) | `#E5B400` (Bottom Bevel). Represents XP, crowns, coins, achievements, and active lesson highlights.
- **Cheerful Cyan (Tertiary):** `#1CB0F6` (Surface) | `#1899D6` (Bottom Bevel). Used for practice sessions, audio replays, and general navigational utility actions.
- **Flame Streak Orange:** `#FF9600` (Surface) | `#E08500` (Bottom Bevel). Exclusively designated for streak trackers, daily combo milestones, and high-urgency notifications.
- **Heart Red:** `#FF4B4B` (Surface) | `#EA2B2B` (Bottom Bevel). Reserved for health/hearts, mistake indicators, critical errors, and destructive actions.

### Canvas & Neutral Palette
- **Canvas Base:** `#F7F7F7` (App backdrop) and `#FFFFFF` (Surface cards and modals).
- **Subtle Surface Stroke:** `#E5E5E5` (Container boundary outlines and bottom shelves).
- **Text Main:** `#1B1B1B` (Headlines, prominent metrics).
- **Text Body / Muted:** `#4B4B4B` (Question prompts, definitions) and `#777777` (Secondary notes, counts).
- **Disabled State:** `#E5E5E5` (Surface) | `#CECECE` (Bevel) with `#AFAFAF` text/iconography.

## Typography

Typography relies on geometric, rounded forms with robust stroke weights to preserve legibility against bold saturated backgrounds and high-contrast surfaces. 

### Typographic Rules
- **Weights:** Heavy weights (`800` ExtraBold and `900` Black) are standard for headers, progress stats, and interactive control labels to reinforce the playful, bold brand. Body text uses `600` SemiBold for balanced clarity.
- **Casing:** Major action triggers and top stat labels utilize uppercase styling (`text-transform: uppercase`) paired with slight positive letter spacing (`letter-spacing: 0.03em`).
- **Hierarchy:** Prompts and questions always lead in `headline-md` or `headline-lg`, ensuring immediate comprehension during fast-paced learning loops.

## Layout & Spacing

The layout is built around focused, single-column interaction paths on mobile and constrained, utility-flanked central tracks on desktop.

### Layout Mechanics
- **Mobile First:** Single column centered viewport capped at `480px` max content width for learning sessions, maximizing tap target efficiency within one-handed thumb range.
- **Desktop Adaptation:** 3-column structured layout: Left persistent navigation bar (`256px`), centered learning path / active lesson arena (`max-width: 600px`), and right utility/gamification sidebar (`320px` for daily quests, league standings, and streak counters).
- **Rhythm & Touch:** Interactive rows, token chips, and answer cards maintain a minimum gap of `space-md` (`12px`) to prevent mis-clicks. Critical primary actions are pinned in sticky bottom trays with `space-lg` internal clearance.

## Elevation & Depth

Visual hierarchy does not use diffuse, photorealistic shadows or blurred lighting. Instead, elevation is rendered through chunky, directional solid extrusions and stacked structural outlines.

### 3D Bevel Extrusion
- **The 4px Rule:** Buttons, interactive chips, and interactive cards feature a solid `4px` bottom border or equivalent `box-shadow: 0 4px 0 0 [Darker-Bevel-Tone]`.
- **Active State Depressed Motion:** When an element is pressed (`:active`), the element shifts downward by `translateY(4px)`, while the bottom bevel collapses to `0px`. This delivers a responsive, clicky mechanical feedback loop.
- **Resting Containers & Cards:** Static content surfaces use a `2px` border in `#E5E5E5` paired with a subtle `0 2px 0 0 #E5E5E5` footing to remain grounded on `#F7F7F7` canvases.
- **Modals & Overlays:** Bottom sheets and dialogue alerts feature a solid `#1B1B1B` backdrop scrim at `0.5` opacity. Sheet containers rest upon a `4px` solid border lip.

## Shapes

The design system uses high-radius pill and rounded geometric forms that evoke physical, handheld toys.

### Corner Radius System
- **Pills (`rounded-full`):** Standard for status indicators, counter badges (streaks, hearts, gems), progress bars, and high-frequency utility buttons.
- **Chunky Containers (`rounded-2xl` / 1rem to 1.5rem):** Used for option choice cards, lesson module tiles, conversational dialogue speech bubbles, and popover tooltips.
- **Speech Bubble Pointers:** Dialogues and mascot speech hints feature rounded triangular spurs integrated directly into the `rounded-2xl` card container.

## Components

### Buttons
- **Primary Push Button:** Solid `#58CC02` background, white uppercase text (`label-lg`), `rounded-2xl` or `rounded-full`, with a `4px` solid `#46A302` bottom border. Active state: `transform: translateY(4px)` with bottom border collapsed to `0px`.
- **Secondary (Clean Outline):** Solid `#FFFFFF` background, `#1CB0F6` text, `2px` solid `#E5E5E5` border with `0 4px 0 0 #E5E5E5` bottom shelf. Active state collapses downward.
- **Full Width Floating Dock:** Fixed bottom action bar framed in `#FFFFFF` with top border `#E5E5E5`, housing the primary progression trigger.

### Option Choice Cards (Interactive Quiz Tiles)
- **Resting:** `#FFFFFF` background, `2px` solid `#E5E5E5` with `0 4px 0 0 #E5E5E5` base, `rounded-2xl` corners, dark slate text (`#4B4B4B`).
- **Selected:** Tinted light cyan background (`#DDF4FF`), `2px` solid `#1CB0F6`, with `0 4px 0 0 #1899D6` base. Text changes to `#1899D6`.
- **Correct State:** Tinted green background (`#D7FFB8`), `2px` solid `#58CC02`, with `0 4px 0 0 #46A302` base.
- **Incorrect State:** Tinted red background (`#FFDFE0`), `2px` solid `#FF4B4B`, with `0 4px 0 0 #EA2B2B` base.

### Game Status Indicators (Header Bar)
- **Inline Metric Badges:** Flex layout displaying streak flames (`#FF9600`), gems/crystals (`#1CB0F6`), and hearts (`#FF4B4B`).
- Icons sit on the left with numeric tallies set in `Nunito Sans 800` (`#4B4B4B`). Tap interaction triggers a bounce micro-interaction opening a mini popover details tray.

### Progress Bars
- Background rail: `#E5E5E5`, height `16px`, `rounded-full`.
- Active fill: `#58CC02`, `rounded-full`, featuring an internal horizontal highlight highlight stripe (semi-transparent white overlay on top half) providing a glossy, gummy-tube appearance.

### Word Bank Chips
- Compact pressable inline modules. Set in `#FFFFFF`, `2px` solid `#E5E5E5`, `0 3px 0 0 #E5E5E5` bottom lip, `rounded-xl`, padding `8px 16px`.
- When selected into sentence slots, the origin placeholder remains as a dashed `#E5E5E5` outline with empty background.

### Check / Validation Feedback Drawer
- Slides up immediately upon clicking "Check". 
- **Success:** `#D7FFB8` background, `#58CC02` headline ("Nicely done!"), accompanied by celebratory mascot illustration and a green forward button.
- **Mistake:** `#FFDFE0` background, `#FF4B4B` headline ("Correct solution:"), revealing the correct sentence and an action button styled in `#FF4B4B`.