# Reeve — Landing Page Redesign

## Original problem statement
> redesign this website https://www.reeve.co.in

Reeve is a cognitive architecture / temporal knowledge graph for long-term AI memory. The goal was a production-ready landing page redesign only — single page, dark mode, interactive simulation of the temporal graph.

## User-stated preferences (verbatim)
- Scope: landing page only
- Vibe: Bold & experimental + Editorial + creative judgment
- Content: scrape and reuse from reeve.co.in
- Functionality: static frontend only
- Theme: originally both-with-toggle, later changed to dark-only
- Accent color: NOT orange/red
- Graph: "interactive visualisation to amaze my users" (inspired by supermemory.ai, not a copy)
- Final theme: **Deep Space**

## Architecture / stack
- React 19 + Tailwind 3 + shadcn-ui primitives (available)
- Single-file App.js with one extracted component: `GraphSimulator.jsx`
- Pure frontend — no backend, no APIs, no auth
- Fonts: Cormorant Garamond (display), JetBrains Mono (eyebrows/code), Satoshi (body)

## Design language (current: Deep Space)
- **Background**: `#05070F` with fixed nebula gradients (cyan @ top-right, violet @ bottom-left, both <10% opacity)
- **Foreground**: `#E8ECF7` star white
- **Primary accent**: `#7DE3F4` aurora cyan
- **Secondary accent**: `#C9A7FF` nebula violet (used for SUPERSEDES edges, supersession visuals)
- **Border**: `#1F2638`
- **Texture**: starfield dot pattern (radial-gradient stars) + 64px structural grid
- Sharp borders (≤2px), editorial asymmetric 12-col grid, massive serif display type

## What's been implemented
**2026-01-19 — MVP (iteration 1)**
- Nav, Hero, Problem, How It Works, Architecture, Features Bento, Quick Start, Footer
- Red/editorial palette + light/dark toggle

**2026-01-19 — Deep Space iteration (iteration 2-3)**
- Dropped light mode, committed to dark-only
- Swapped red → phosphor lime → finally **deep-space cyan + nebula violet**
- Replaced static memory demo with full **interactive GraphSimulator** (`/app/frontend/src/components/GraphSimulator.jsx`):
  - SVG-based temporal knowledge graph with 9 nodes + 11 edges
  - 9-step timeline with play/pause/reset/scrubber/step-ticks
  - Hover/click node → Inspector sidebar shows kind, active_from, supersession, edges
  - Real-time stats bar (active/superseded/edges/chains)
  - Current-event card streams store() calls then a final query() answer
  - SUPERSEDES chains rendered with dashed violet edges
  - Active-ring pulse, node-enter animations, flow-dash on live edges
  - 3 explainer cards below ("Facts never overwrite", "One entity many names", "Time is first-class")
- Added **CompatStrip** (8 MCP clients), **Benchmarks** (4 bars vs baselines), **Testimonials** (3 quotes), **FAQ** (6 Q&A accordion), enriched **Footer** (4-col with status)
- Hero enhanced with stats strip (4 numbers) and staggered word reveal
- All sections polished to production quality

## Verified ✓
- Testing agent: 100% pass on all interactions (nav, CTAs, graph play/scrub/hover/click, copy buttons, FAQ, responsive 1920/1280/390)
- No console errors, no contrast issues, no horizontal overflow

## Backlog / next ideas (P1)
- Subtle parallax on hero nebula during scroll
- Graph: drag-to-reposition nodes (persisted in local state)
- Graph: add a "time machine" query mode (type a natural language question, highlight the traversal)
- Add a changelog timeline page
- Deploy-ready: OG image, meta tags, favicon
