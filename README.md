# Crew PT

Phone-first PT planner for an 18-Marine crew. Big buttons, dark UI, roll call, 3-day plan strip, and a huge **RANDOMIZE** control.

## Quick start

```bash
cd /workspace/crew-pt-app
npm i
npm run dev
```

Production build:

```bash
npm run build
```

Open the local Vite URL (usually `http://localhost:5173`) on your phone or desktop.

## Features

- **Roll call** — tap status cycle **P / A / D / L / M**, live present count, edit roster
- **3-day strip** — Today / Tomorrow / Day+2 (Mon–Fri weekdays)
- Each day: **HITT Session** + Block1 warm-up (leader) + Block2 main (**PTNCO Stuart**) + Block3 cool-down (leader)
- **RANDOMIZE** selected day or all 3 — reshuffles packs **without** changing that day’s session type
- **Advance** start day (Mon–Fri only)
- **Month calendar** — Mon–Fri with Warrior / Reload / Athlete / Combat labels; tap to select
- **Exercise demos** — Demo button → cues + YouTube link (`src/data/demos.ts`)
- **Settings** — style bias, block timing, volume (Easy / Average / Hard), RPE, equipment toggles; applied on Randomize; Export/Import includes settings
- Inline edit of reps/time after generate
- **localStorage** persistence + **Export / Import JSON**

## HITT weekly template

Official open-session calendar (Semper Fit / WARR HITT methodology):

| Day | Session | Emphasis |
|-----|---------|----------|
| **Mon** | **Warrior** | Agility training, movement preparation, core stability |
| **Tue** | **Reload** | Endurance, resilience, recovery; mobility & flexibility |
| **Wed** | **Athlete** | Acceleration, strength compounds, power (jumps/throws) @ RPE 6–7 |
| **Thu** | **Reload** | Secondary recovery / reloading (shorter, different packs) |
| **Fri** | **Combat** | Maximum speed, dynamic combat conditioning (ammo can, shuttles, sandbag) |

RANDOMIZE always respects this calendar (Monday stays Warrior, never flips to Combat).

### Block mapping (pillars)

| Block | HITT pillar |
|-------|-------------|
| Block1 | Movement Prep + loco (high knees, butt kicks, shuffles, carioca) + sprint prep — **lighter on Reload days** |
| Block2 | Session-type pools (Warrior agility / Reload easy endurance+mobility / Athlete accel+strength+power / Combat max speed+combat conditioning) |
| Block3 | Flexibility & Mobility (≈20s holds) |

Source extract: `pt-study/refs/HITT_Programs_EXTRACT.md` · Official page: [USMC HITT Programs](https://www.fitness.marines.mil/HITT_Programs/)

## Seed roster

Cpl Bledsoe, Diazreynoso, Ferreira, Garza, Kersenbrock, Kreul, Miles, Romero, Scott; LCpl Frei, Gomez, Kelmel, Patteson, Sastre, Stuart (PTNCO), Valle; PFC Gerardoguillen, Goins.
