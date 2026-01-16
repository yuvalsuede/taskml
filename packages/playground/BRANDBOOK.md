# TaskML Brand Guidelines

> **The markup language for humans who ship.**

---

## Brand Essence

### Mission
TaskML exists to make task management as natural as writing. We believe the best tools disappear—they don't demand attention, they amplify intention.

### Vision
A world where every project, every sprint, every idea can be captured in plain text and transformed into beautiful, actionable visualizations.

### Values
1. **Clarity over complexity** — Simple syntax, powerful output
2. **Speed over ceremony** — Type, see, ship
3. **Beauty in utility** — Functional aesthetics
4. **Open by default** — Plain text, no lock-in

### Tagline Options
- "The markup language for humans who ship."
- "Tasks as code."
- "Write it. Ship it."
- "Plain text. Beautiful output."

---

## Logo & Mark

### The Taskmark
The TaskML mark is a stylized checkbox that transforms into a forward-moving arrow, representing progression from task to completion.

```
┌─────────────────────────────────────────┐
│                                         │
│    ████████                             │
│    ██    ████                           │
│    ██      ████                         │
│    ██    ████                           │
│    ████████                             │
│                                         │
│    TASKML                               │
│                                         │
└─────────────────────────────────────────┘
```

### Logo Usage
- **Minimum size:** 24px height
- **Clear space:** 1x the height of the mark on all sides
- **Backgrounds:** Use on dark (#0D1117) or light (#FFFFFF) only
- **Never:** Rotate, distort, add effects, or change colors

### Favicon
A simplified checkbox mark in brand orange on transparent background.

---

## Color Palette

### Primary Colors

#### Midnight (`--midnight`)
The foundation. Deep, focused, professional.
```
#0D1117  — Primary background (dark mode)
#161B22  — Elevated surfaces
#21262D  — Borders, dividers
#30363D  — Interactive borders
```

#### Daylight (`--daylight`)
Clean, open, trustworthy.
```
#FFFFFF  — Primary background (light mode)
#F6F8FA  — Elevated surfaces
#E6EBF1  — Borders, dividers
#D0D7DE  — Interactive borders
```

#### Signal Orange (`--signal`)
Action, progress, attention. Our signature color.
```
#F97316  — Primary (buttons, links, active states)
#FB923C  — Hover state
#FDBA74  — Light variant
#7C2D12  — Dark variant (for light mode contrast)
```

### Semantic Colors

#### Status Indicators
```
Pending     #6B7280  (gray-500)    — Not started
In Progress #3B82F6  (blue-500)    — Active work
In Review   #A855F7  (purple-500)  — Awaiting feedback
Completed   #22C55E  (green-500)   — Done
Blocked     #EF4444  (red-500)     — Obstacle
Cancelled   #6B7280  (gray-500)    — Stopped, strikethrough
```

#### Priority Indicators
```
!0 Critical #EF4444  (red-500)     — Fire emoji energy
!1 High     #F97316  (orange-500)  — Important
!2 Medium   #EAB308  (yellow-500)  — Normal
!3 Low      #6B7280  (gray-500)    — Backlog
```

### Extended Palette
For charts, graphs, and data visualization:
```
Blue    #3B82F6
Purple  #A855F7
Pink    #EC4899
Teal    #14B8A6
Lime    #84CC16
Amber   #F59E0B
```

### Color Application Rules
1. **80% neutrals** — Midnight/Daylight palette
2. **15% semantic** — Status and priority colors
3. **5% signal** — Orange for primary actions only
4. Orange is precious—use sparingly for maximum impact

---

## Typography

### Font Stack

#### Primary: Inter
Clean, modern, highly legible. Perfect for UI and body text.
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Monospace: JetBrains Mono
For code, the editor, and TaskML syntax.
```css
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
```

### Type Scale
Based on a 1.25 ratio (Major Third)

```
xs    12px / 16px   — Captions, labels
sm    14px / 20px   — Secondary text
base  16px / 24px   — Body text
lg    18px / 28px   — Lead paragraphs
xl    20px / 28px   — Section headers
2xl   24px / 32px   — Page headers
3xl   30px / 36px   — Hero text
4xl   36px / 40px   — Display
```

### Font Weights
```
Regular   400  — Body text
Medium    500  — Emphasis, labels
Semibold  600  — Headings, buttons
Bold      700  — Strong emphasis (rare)
```

### Typography Rules
1. **Never all caps** except for tiny labels (xs size)
2. **Line length:** 60-80 characters max for readability
3. **Hierarchy:** One level of emphasis per block
4. **Editor font:** 14-16px JetBrains Mono, 140% line height

---

## Spacing System

### Base Unit: 4px
All spacing derives from a 4px base grid.

```
0    0px
1    4px
2    8px
3    12px
4    16px
5    20px
6    24px
8    32px
10   40px
12   48px
16   64px
20   80px
```

### Application
```
Inline spacing (icons, text):  4-8px
Component padding:             12-16px
Section spacing:               24-32px
Page margins:                  32-64px
```

### Density Modes
```
Compact    — 8px base padding (data-heavy views)
Default    — 12px base padding (balanced)
Relaxed    — 16px base padding (reading-focused)
```

---

## Border Radius

### Scale
```
none    0px     — Sharp edges (rare, intentional)
sm      4px     — Subtle rounding
md      6px     — Default for buttons, inputs
lg      8px     — Cards, panels
xl      12px    — Modal dialogs
2xl     16px    — Large containers
full    9999px  — Pills, avatars
```

### Rules
1. **Nested elements:** Inner radius = outer - padding
2. **Consistency:** Same radius for related elements
3. **Never mix:** Sharp and rounded in the same component

---

## Shadows & Elevation

### Dark Mode (Subtle)
Dark mode uses opacity and borders, not shadows.
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
```

### Light Mode (Soft)
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.10);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### Elevation Levels
```
0  — Flat (default)
1  — Raised (cards, dropdowns)
2  — Floating (modals, popovers)
3  — Overlay (command palette)
```

---

## Iconography

### Style
- **Lucide icons** as the primary set
- 24px default size
- 1.5px stroke weight
- Rounded caps and joins

### Usage Rules
1. **Meaningful:** Every icon must have a purpose
2. **Labeled:** Icons should have text labels when space permits
3. **Consistent:** Same icon = same meaning across the app
4. **Accessible:** Never icon-only for critical actions

### Status Icons (TaskML-specific)
```
○  Pending      — Empty circle
◐  In Progress  — Half-filled circle
◎  In Review    — Target/bullseye
●  Completed    — Filled circle
⊘  Blocked      — Circle with slash
⊖  Cancelled    — Circle with minus
```

---

## Voice & Tone

### Personality
TaskML speaks like a **senior engineer who writes well**:
- Clear and direct
- Technically precise
- Subtly witty
- Never condescending

### Writing Guidelines

#### Do
- Use active voice
- Be specific ("Save to My Diagrams" not "Save")
- Respect the user's time
- Use contractions naturally

#### Don't
- Use jargon without context
- Be overly casual or "hip"
- Use exclamation marks excessively
- Apologize unnecessarily

### Example Copy
```
Good: "Your diagram was saved."
Bad:  "Awesome! Your diagram has been successfully saved to the cloud!"

Good: "Couldn't parse line 24. Expected task marker."
Bad:  "Oops! Something went wrong with your code!"

Good: "Share"
Bad:  "Share with the world!"
```

### Error Messages
Follow the pattern: **What happened** + **What to do**
```
"Connection lost. Your changes are saved locally."
"Invalid syntax on line 12. Tasks start with [ ] or status markers."
"Export failed. Try again or download as PNG instead."
```

---

## Component Patterns

### Buttons

#### Primary (Signal Orange)
```css
background: #F97316;
color: white;
padding: 8px 16px;
border-radius: 6px;
font-weight: 500;
```
Use for: Main action per view (Save, Share, Export)

#### Secondary (Ghost)
```css
background: transparent;
color: currentColor;
border: 1px solid var(--border);
padding: 8px 16px;
border-radius: 6px;
```
Use for: Supporting actions

#### Danger
```css
background: #EF4444;
color: white;
```
Use for: Destructive actions (Delete, Remove)

### Inputs
```css
background: var(--surface);
border: 1px solid var(--border);
border-radius: 6px;
padding: 8px 12px;
font-size: 14px;

/* Focus state */
border-color: #F97316;
box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
```

### Cards
```css
background: var(--surface-elevated);
border: 1px solid var(--border);
border-radius: 8px;
padding: 16px;
```

### Modals
```css
background: var(--surface);
border-radius: 12px;
box-shadow: var(--shadow-xl);
max-width: 480px;
padding: 24px;
```

---

## Motion & Animation

### Principles
1. **Purposeful:** Animation should aid understanding
2. **Quick:** 150-300ms for most transitions
3. **Subtle:** Ease-out for entrances, ease-in for exits
4. **Reduced motion:** Respect user preferences

### Timing
```css
--duration-fast:   150ms;
--duration-normal: 200ms;
--duration-slow:   300ms;

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in:  cubic-bezier(0.7, 0, 0.84, 0);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

### Common Animations
```
Fade in:     opacity 0→1, 150ms ease-out
Slide up:    translateY(8px)→0, 200ms ease-out
Scale:       scale(0.95)→1, 150ms ease-out
Dropdown:    translateY(-4px)→0 + fade, 200ms ease-out
```

---

## Dark Mode First

TaskML is designed **dark mode first**. Developers spend hours in their editors—we respect their eyes.

### Principles
1. Dark mode is the default
2. Light mode is fully supported, not an afterthought
3. Never pure black (#000)—use #0D1117
4. Never pure white (#FFF) for text—use #E6EBF1
5. Reduce contrast slightly in dark mode for comfort

### Implementation
```css
:root {
  --bg: #0D1117;
  --bg-elevated: #161B22;
  --border: #30363D;
  --text: #E6EBF1;
  --text-muted: #8B949E;
}

[data-theme="light"] {
  --bg: #FFFFFF;
  --bg-elevated: #F6F8FA;
  --border: #D0D7DE;
  --text: #1F2328;
  --text-muted: #656D76;
}
```

---

## Application Examples

### The Editor
```
┌──────────────────────────────────────────────────┐
│ ■ TaskML    [Templates] [My Diagrams]     [Save] │
├──────────────────────────────────────────────────┤
│                        │                         │
│  @project Sprint 14    │  ┌─────────────────┐   │
│  @team alice, bob      │  │ Sprint 14       │   │
│                        │  │ ───────────────  │   │
│  ◐ Design homepage !0  │  │ ◐ Design...     │   │
│    [x] Wireframes      │  │ ○ Build API     │   │
│    [~] Mockups         │  │ ● Testing       │   │
│                        │  └─────────────────┘   │
│                        │                         │
└──────────────────────────────────────────────────┘
```

### Template Card
```
┌──────────────────────────────────┐
│  ⭐ Featured                     │
│                                  │
│  📋 Sprint Planning              │
│                                  │
│  A complete two-week sprint      │
│  with team assignments...        │
│                                  │
│  ┌─────┐ ┌──────┐ ┌──────────┐  │
│  │agile│ │sprint│ │Best: Kanban │
│  └─────┘ └──────┘ └──────────┘  │
└──────────────────────────────────┘
```

---

## Don'ts

### Never Do
- ❌ Use gradients (except in special illustrations)
- ❌ Use shadows as decoration
- ❌ Mix border radius sizes arbitrarily
- ❌ Use more than 2 font weights per component
- ❌ Animate without purpose
- ❌ Use orange for anything except primary actions
- ❌ Write clever error messages
- ❌ Hide functionality behind mystery icons

### Always Do
- ✅ Test in both dark and light modes
- ✅ Ensure 4.5:1 contrast ratio minimum
- ✅ Provide keyboard navigation
- ✅ Use semantic HTML
- ✅ Test with screen readers
- ✅ Respect reduced motion preferences
- ✅ Keep the Signal Orange precious

---

## Quick Reference

### Colors (Copy-Paste)
```css
/* Backgrounds */
--bg-dark: #0D1117;
--bg-dark-elevated: #161B22;
--bg-light: #FFFFFF;
--bg-light-elevated: #F6F8FA;

/* Signal Orange */
--signal: #F97316;
--signal-hover: #FB923C;

/* Status */
--pending: #6B7280;
--progress: #3B82F6;
--review: #A855F7;
--completed: #22C55E;
--blocked: #EF4444;

/* Priority */
--p0: #EF4444;
--p1: #F97316;
--p2: #EAB308;
--p3: #6B7280;
```

### Spacing (Tailwind)
```
p-1 = 4px    p-4 = 16px    p-8 = 32px
p-2 = 8px    p-5 = 20px    p-10 = 40px
p-3 = 12px   p-6 = 24px    p-12 = 48px
```

### Radii (Tailwind)
```
rounded-sm = 4px    rounded-lg = 8px     rounded-full = 9999px
rounded-md = 6px    rounded-xl = 12px
```

---

*Last updated: January 2024*
*Version: 1.0*
