import type { ExerciseItem, Focus } from '../types'

/**
 * Semper Fit HITT pillars (https://www.fitness.marines.mil/HITT_Programs/):
 * Movement Prep | Strength & Power | Speed/Agility/Endurance | Flexibility & Mobility
 *
 * Weekly template (official open-session calendar):
 * Mon Warrior · Tue Reload · Wed Athlete · Thu Reload · Fri Combat
 */

/** Movement Prep — short opener packs for Block1 */
export const OPENER_PACKS: ExerciseItem[][] = [
  [
    { name: 'Inchworm', detail: '×6' },
    { name: "World's Greatest Stretch", detail: '5/side' },
    { name: 'Leg Swings', detail: '10/side' },
  ],
  [
    { name: 'Walking Knee Hug', detail: '10/side' },
    { name: 'Walking Quad Stretch', detail: '10/side' },
    { name: 'Frankenstein Walk', detail: '20 yd' },
  ],
  [
    { name: 'Spiderman', detail: '6/side' },
    { name: 'Mountain Climber', detail: '2×20' },
    { name: 'Monster Walk', detail: '2×10 yd' },
  ],
  [
    { name: 'Elbow to Instep', detail: '5/side' },
    { name: 'Arm Circles', detail: '20 each way' },
    { name: 'Bodyweight Squats', detail: '2×10' },
  ],
  [
    { name: 'Inchworm', detail: '×5' },
    { name: 'Hip Openers', detail: '10/side' },
    { name: 'Power Skip (easy)', detail: '2×15 yd' },
  ],
]

/** Lighter openers for Reload days */
export const OPENER_PACKS_LIGHT: ExerciseItem[][] = [
  [
    { name: 'Walking Knee Hug', detail: '8/side' },
    { name: 'Leg Swings', detail: '8/side' },
  ],
  [
    { name: 'Inchworm', detail: '×4' },
    { name: 'Hip Openers', detail: '8/side' },
  ],
  [
    { name: "World's Greatest Stretch", detail: '4/side' },
    { name: 'Arm Circles', detail: '15 each way' },
  ],
]

/** Required locomotion — always included (order may shuffle) */
export const LOCOMOTION_BASE: ExerciseItem[] = [
  { name: 'High Knees', detail: '2×20 yd' },
  { name: 'Butt Kicks', detail: '2×20 yd' },
  { name: 'Shuffles', detail: '2×20 yd each way' },
  { name: 'Carioca', detail: '2×20 yd each way' },
]

/** Lighter loco subsets for Reload (pick 2) */
export const LOCOMOTION_LIGHT: ExerciseItem[] = [
  { name: 'High Knees', detail: '1×20 yd' },
  { name: 'Butt Kicks', detail: '1×20 yd' },
  { name: 'Shuffles', detail: '1×15 yd each way' },
  { name: 'Easy Skip', detail: '2×15 yd' },
]

/** Sprint prep — A-skips + build-ups */
export const SPRINT_PREP_PACKS: ExerciseItem[][] = [
  [
    { name: 'A-Skips', detail: '2×20 yd' },
    { name: 'Build-ups', detail: '50% / 75% / 90% × 30 yd' },
  ],
  [
    { name: 'A-Skips', detail: '3×15 yd' },
    { name: 'Build-ups / Sprint Progression', detail: '50% / 75% / 90% × 40 yd' },
  ],
  [
    { name: 'A-Skips + Arm Drive', detail: '2×20 yd' },
    { name: 'Straight Leg Shuffle to Sprint', detail: '4×20 yd' },
  ],
]

/** Lighter sprint prep for Reload */
export const SPRINT_PREP_LIGHT: ExerciseItem[][] = [
  [
    { name: 'A-Skips (easy)', detail: '2×15 yd' },
    { name: 'Build-ups', detail: '50% / 60% × 20 yd' },
  ],
  [
    { name: 'Easy Skip', detail: '2×20 yd' },
    { name: 'Stride-outs', detail: '3×20 yd @ 60%' },
  ],
]

/** Flexibility & Mobility — Block3 cool-down (20s holds) */
export const COOLDOWN_PACKS: ExerciseItem[][] = [
  [
    { name: 'Hip Flexor Stretch', detail: '20s/side' },
    { name: 'Hamstring Stretch', detail: '20s/side' },
    { name: 'Quad Stretch', detail: '20s/side' },
    { name: 'Chest Opener', detail: '20s' },
  ],
  [
    { name: 'Glute / Figure-4', detail: '20s/side' },
    { name: 'Shoulder Stretch', detail: '20s/side' },
    { name: 'Sumo Stretch', detail: '20s' },
    { name: 'Spinal Twist', detail: '20s/side' },
  ],
  [
    { name: 'Hamstring Stretch', detail: '20s/side' },
    { name: 'Hip Flexor Stretch', detail: '20s/side' },
    { name: 'Lat / Shoulder', detail: '20s/side' },
    { name: 'Calf Stretch', detail: '20s/side' },
  ],
  [
    { name: 'Walk-down', detail: '1–2 min' },
    { name: 'Quad Stretch', detail: '20s/side' },
    { name: 'Glute Stretch', detail: '20s/side' },
    { name: 'Chest + Shoulder', detail: '20s each' },
  ],
]

/**
 * Block2 pools by HITT session type.
 * Reload has separate Tue vs Thu packs (Thu shorter / different moves).
 */
export const FOCUS_POOLS: Record<Focus, ExerciseItem[][]> = {
  /** Mon — Warrior: agility, movement prep emphasis, core stability */
  Warrior: [
    [
      { name: 'Warrior — Agility Circuit', detail: 'quality' },
      { name: 'T-Drill', detail: '5 reps' },
      { name: '5-10-5', detail: '5 reps' },
      { name: 'Carioca + Cut', detail: '4×20 yd' },
      { name: 'Core Circuit (plank / dead bug / side plank)', detail: '3 rounds' },
    ],
    [
      { name: 'Warrior — Ladder + Core', detail: 'movement quality' },
      { name: 'Agility Ladder 1-in/1-out', detail: '4 passes' },
      { name: 'Lateral Shuffle + Plant', detail: '6×15 yd' },
      { name: 'Monster Walk / Band Walk', detail: '3×10 yd' },
      { name: 'Hollow Hold + Pallof', detail: '3×30s / 10/side' },
    ],
    [
      { name: 'Warrior — Change of Direction', detail: 'crisp cuts' },
      { name: 'Pro Agility (5-10-5)', detail: '6 reps' },
      { name: 'Zigzag Shuffle', detail: '4×20 yd' },
      { name: "Spiderman + World's Greatest Flow", detail: '2 rounds' },
      { name: 'Dead Bugs + Side Plank', detail: '3×10/side / 30s' },
    ],
    [
      { name: 'Warrior — Agility + Stability', detail: 'RPE easy–mod' },
      { name: 'Box / X Drill', detail: '4 reps' },
      { name: 'High Knee Carioca', detail: '4×20 yd' },
      { name: 'Single-leg Balance Reach', detail: '3×6/side' },
      { name: 'Core Hollow Rocks', detail: '3×20' },
    ],
  ],

  /** Tue Reload — easy endurance, mobility, light resilience (NOT heavy strength) */
  Reload: [
    [
      { name: 'Reload — Easy Endurance', detail: 'conversational' },
      { name: 'Steady Run / Jog', detail: '20–25 min easy' },
      { name: 'Mobility Flow (hips / T-spine)', detail: '8–10 min' },
      { name: 'Light Core (dead bug / bird-dog)', detail: '2×8/side' },
    ],
    [
      { name: 'Reload — Ruck Easy', detail: 'recovery pace' },
      { name: 'Easy Ruck / Loaded Walk', detail: '25–30 min' },
      { name: 'Hip Flexor + Hamstring Flow', detail: '5 min' },
      { name: 'Breathing + Easy Plank', detail: '3×20s' },
    ],
    [
      { name: 'Reload — Mobility + Resilience', detail: 'not heavy' },
      { name: 'Easy Fartlek', detail: '20 min (mostly easy)' },
      { name: "World's Greatest + Spiderman Flow", detail: '2 rounds' },
      { name: 'Band Pull-Aparts + Scap Circles', detail: '2×15' },
      { name: 'Glute Bridge (bodyweight)', detail: '2×12' },
    ],
    [
      { name: 'Reload — Active Recovery', detail: 'keep HR low' },
      { name: 'Easy Run or Bike', detail: '20 min' },
      { name: 'Sumo / Figure-4 / Chest Opener Circuit', detail: '2 rounds × 20s' },
      { name: 'Light Farmer Carry', detail: '2×30 yd easy' },
    ],
  ],

  /** Wed — Athlete: acceleration, strength compounds, power @ RPE 6–7 */
  Athlete: [
    [
      { name: 'Athlete — Accel + Strength', detail: 'RPE 6–7' },
      { name: 'Sprint Starts / Accel 10–20', detail: '6×' },
      { name: 'Goblet / Front Squat', detail: '4×6 @ RPE 6–7' },
      { name: 'Bench / Floor Press', detail: '4×6' },
      { name: 'Broad Jump', detail: '4×3' },
    ],
    [
      { name: 'Athlete — Power Compounds', detail: 'RPE 6–7' },
      { name: 'Wall Drill / A-Skip into Accel', detail: '5×20 yd' },
      { name: 'RDL / Deadlift', detail: '4×6 @ RPE 6–7' },
      { name: 'Pull-ups / Negatives', detail: '4×AMRAP-2' },
      { name: 'Med Ball Slam', detail: '4×8' },
    ],
    [
      { name: 'Athlete — Accel + Jumps', detail: 'quality' },
      { name: 'Flying 10s / Accel Starts', detail: '6×10–15 yd' },
      { name: 'Split Squat', detail: '3×8/leg @ RPE 6–7' },
      { name: 'Box Jump', detail: '4×5' },
      { name: 'Overhead Press', detail: '3×8' },
    ],
    [
      { name: 'Athlete — Strength-Power Mix', detail: 'RPE 6–7' },
      { name: 'Resisted March → Sprint', detail: '4×15 yd' },
      { name: 'Back / Goblet Squat', detail: '5×5 @ RPE 6–7' },
      { name: 'Hang Clean / Jump Shrug (light)', detail: '4×3' },
      { name: 'Med Ball Rotational Throw', detail: '3×6/side' },
    ],
  ],

  /** Fri — Combat: max speed / build-ups + dynamic combat conditioning */
  Combat: [
    [
      { name: 'Combat — Max Speed + Ammo', detail: 'explosive' },
      { name: 'Build-ups to Max', detail: '50/75/90/100% × 30–40 yd' },
      { name: 'Flying 20s', detail: '5×20 yd @ 90–95%' },
      { name: 'Ammo-Can Deadlift + Press', detail: '4×6 / 4×6' },
      { name: 'Shuttle Run (60 yd)', detail: '6 reps' },
    ],
    [
      { name: 'Combat — Speed + Sandbag', detail: 'dynamic' },
      { name: 'Max-Speed Build-ups', detail: '6×30 yd' },
      { name: 'Sandbag Clean + Squat', detail: '4×5 / 4×6' },
      { name: 'Gassers', detail: '4–6' },
      { name: 'Buddy Drag / Litter Carry', detail: '4×25 yd' },
    ],
    [
      { name: 'Combat — Conditioning Circuit', detail: 'hard but controlled' },
      { name: 'Straight Leg Shuffle to Sprint', detail: '5×20 yd' },
      { name: 'Ammo-Can Lunge + Row', detail: '3×8/leg / 3×8' },
      { name: 'Shuttle + Bear Crawl Mix', detail: '4 rounds' },
      { name: 'Sandbag Shouldering', detail: '3×6/side' },
    ],
    [
      { name: 'Combat — Max Speed Finisher', detail: 'quality sprints' },
      { name: 'Build-ups', detail: '4×40 yd progressing to max' },
      { name: 'Ammo-Can Farmer Carry', detail: '4×40 yd' },
      { name: 'Burpee Broad Jump', detail: '4×5' },
      { name: '60-yd Shuttle', detail: '6–8' },
    ],
  ],
}

/** Thu Reload — same intent as Tue, shorter / different moves */
export const RELOAD_THU_POOLS: ExerciseItem[][] = [
  [
    { name: 'Reload (Thu) — Short Easy Run', detail: 'recover' },
    { name: 'Easy Run / Walk-Jog', detail: '15–20 min' },
    { name: 'Hip + Hamstring Mobility', detail: '6 min' },
    { name: 'Easy Bird-Dog', detail: '2×6/side' },
  ],
  [
    { name: 'Reload (Thu) — Short Ruck', detail: 'light load' },
    { name: 'Easy Ruck', detail: '20 min' },
    { name: 'Chest Opener + Shoulder Circles', detail: '3 min' },
    { name: 'Easy Glute Bridge', detail: '2×10' },
  ],
  [
    { name: 'Reload (Thu) — Mobility Focus', detail: 'short' },
    { name: 'Easy Bike / Walk', detail: '15 min' },
    { name: 'Full Body Mobility Circuit', detail: '1–2 rounds × 20s' },
    { name: 'Breathing Reset', detail: '2 min' },
  ],
]

export const ALL_FOCUSES: Focus[] = ['Warrior', 'Reload', 'Athlete', 'Combat']

export function focusBadge(focus: Focus): string | undefined {
  switch (focus) {
    case 'Warrior':
      return 'Agility'
    case 'Reload':
      return 'Recovery'
    case 'Athlete':
      return 'Accel / Power'
    case 'Combat':
      return 'Max Speed'
  }
}
