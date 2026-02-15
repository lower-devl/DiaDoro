1. Executive Summary
Coquí Focus is a web-based productivity timer that combines advanced Pomodoro techniques with the vibrant culture and "calor" of Puerto Rico. While most productivity apps are sterile and industrial, Coquí Focus brings warmth to the workflow. It features advanced timing controls, auto-sequencing, and a unique audio-visual experience inspired by the island—from the sounds of El Yunque to the colors of Old San Juan.

2. Target Audience
The Homesick Professional: Puerto Ricans in the diaspora who want a touch of home while they work.

The Vibrant Worker: Users tired of "clinical" productivity tools who want a UI with personality.

Power Users: Developers and creatives who need strict control over their work/break ratios (auto-restart, custom intervals).

3. "Puerto Rican Flavor" Design Specs (UI/UX)
This is the core differentiator. The app must feel like a trip to the island.

3.1. Visual Language
Color Palette:

Primary: Maga Red (#EF3340) & Star White (#FFFFFF) - Derived from the flag.

Secondary: Sky Blue (#00A6D6) - The light blue of the original flag.

Accents: Yunque Green (#2E8B57) for "Break" mode; Adoquín Blue (Old San Juan cobblestones) for backgrounds.

Typography: Clean sans-serif (Inter or Geist) for readability, but headers using a bold, expressive font (like Montserrat or a retro-tropical font) to mimic vintage travel posters.

Iconography:

Timer Icon: A stylized Coquí frog or a Domino piece.

Break Icon: A hammock (hamaca) or a palm tree.

Work Icon: A pava (jibaro hat) or machete (metaphor for "hard work").

3.2. Audio & Feedback (The Vibe)
Ambient Noise (Optional): A toggle to play "El Yunque at Night" (Coquí chirping) or "Luquillo Waves" as background white noise.

Notification Sounds:

Session Start: A subtle guiro scrape or "Dale!"

Session End: A "Coquí" whistle or a short Cuatro chord.

Break End: "¡A trabajar!" or a school bell.

Copywriting (Spanglish Mode):

Start Button: "¡Dale!"

Pause: "Espérate"

Break: "Cógelo Suave"

Long Break: "Siesta Time"

4. Functional Requirements
4.1. Core Timer Logic
Modes:

Pomodoro (Work): Default 25 min.

Short Break: Default 5 min.

Long Break: Default 15 min.

Timer Display: Large, high-contrast countdown. Tab title must update with timer (e.g., (24:00) Working...).

4.2. Advanced Controls
Smart Time Selection:

Instead of just typing numbers, provide "Chips" for quick increments: +1m, +5m, -5m.

Slider control for "Flow State" adjustments (fluidly moving from 25m to 50m).

Auto-Mode (The "Flow" Switch):

Toggle for Auto-start Breaks: When work timer ends, break starts immediately.

Toggle for Auto-start Pomodoro: When break ends, work starts immediately.

User Story: "I want to turn on 'Auto' and not touch the app for 4 hours."

4.3. Settings & Configuration
Custom Durations: Users can set their preferred default times for all three modes.

Volume Control: Independent sliders for Alarm volume and Ambient (Coquí) volume.

Theme Toggle:

Day Mode: "Isla Verde" (Bright, sunny).

Night Mode: "Noche de San Juan" (Dark blues, bioluminescent bay neon accents).

5. Technical Architecture
5.1. Tech Stack
Framework: Next.js 14+ (App Router).

Language: TypeScript.

Styling: Tailwind CSS (utilizing tailwind-merge for dynamic classes).

State Management: Zustand (lightweight, perfect for timer state) or React Context.

Icons: Lucide React (customized).

Audio: use-sound hook or native HTML5 Audio API.

5.2. Component Structure (Draft)
Plaintext

src/
├── app/
│   ├── page.tsx (Main Timer View)
│   └── settings/ (Modal or separate route)
├── components/
│   ├── Timer/
│   │   ├── CircularProgress.tsx (SVG Ring)
│   │   ├── DigitalDisplay.tsx
│   │   └── Controls.tsx (Play/Pause/Skip)
│   ├── Settings/
│   │   ├── TimeInput.tsx
│   │   └── ToggleSwitch.tsx
│   └── Layout/
│       ├── BackgroundPattern.tsx (Taino symbols or Palm leaves)
│       └── NavBar.tsx
├── hooks/
│   ├── useTimer.ts (The core logic engine)
│   └── useAudio.ts
└── store/
    └── useStore.ts (Zustand state: isRunning, mode, duration, autoStart)
6. Deployment Pipeline (CI/CD)
We will use GitHub Actions to govern the quality before handing off to Vercel for the actual hosting.

6.1. Workflow: ci-cd.yaml
Trigger: Push to main or Pull Request.

Jobs:

Lint & Type Check:

Run npm run lint (ESLint).

Run tsc --noEmit (TypeScript validation).

Unit Test (Optional but recommended):

Run npm run test (Jest/Vitest) to ensure timer logic (seconds decrementing correctly) doesn't break.

Vercel Deploy:

Uses amo/vercel-action or the Vercel CLI.

Why use GHA instead of Vercel's native git hook? To ensure we can run custom "pre-flight" checks (like specific formatting or heavier tests) that might cost build minutes on Vercel, or to notify a Slack channel/Discord webhook upon success.

6.2. Sample GHA Snippet
YAML

name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run build # Ensure it builds locally before deploying

  deploy-production:
    needs: quality-check
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
7. Implementation Roadmap
Phase 1: The "Jíbaro" MVP
Basic countdown timer.

Hardcoded "Puerto Rico Flag" colors.

Play/Pause/Reset buttons.

Deploy to Vercel via GHA.

Phase 2: Advanced Controls & Audio
Implement useTimer hook with "Auto-Switch" logic.

Add the Coquí ambient sound player.

Add settings modal for custom times.

Phase 3: Polish & "Sazón"
Add subtle animations (confetti/flag wave on session complete).

Add the "Chips" for easy time increments (+1m, +5m).

Responsive mobile design optimization (PWA capabilities).
