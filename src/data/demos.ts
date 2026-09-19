/**
 * Exercise demos — cues + real YouTube search (or known) URLs.
 * Lookup matches exercise names from pools (normalized / fuzzy).
 */

export interface ExerciseDemo {
  /** Display name */
  name: string
  /** 2–3 coaching cues */
  cues: string[]
  /** Real YouTube search or known demo URL (no fake embeds) */
  demoUrl: string
}

function yt(q: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
}

/** Canonical demos keyed by normalized lookup tokens. */
const DEMOS: Record<string, ExerciseDemo> = {
  inchworm: {
    name: 'Inchworm',
    cues: [
      'Hinge, walk hands out to plank, keep legs mostly straight',
      'Brace core — no sagging hips',
      'Walk feet to hands and repeat',
    ],
    demoUrl: yt('inchworm exercise form'),
  },
  'worlds greatest stretch': {
    name: "World's Greatest Stretch",
    cues: [
      'Lunge, hand inside front foot, rotate open to ceiling',
      'Keep back knee soft; breathe into the hip',
      'Switch sides smoothly',
    ],
    demoUrl: yt("world's greatest stretch mobility"),
  },
  'leg swings': {
    name: 'Leg Swings',
    cues: [
      'Hold a wall or partner for balance',
      'Swing controlled front-to-back then side-to-side',
      'Stay tall — don’t lean into the swing',
    ],
    demoUrl: yt('leg swings dynamic warm up'),
  },
  'walking knee hug': {
    name: 'Walking Knee Hug',
    cues: [
      'Pull knee to chest, rise onto opposite toe',
      'Stand tall each step',
      'Control the descent — no hopping',
    ],
    demoUrl: yt('walking knee hug warm up'),
  },
  'walking quad stretch': {
    name: 'Walking Quad Stretch',
    cues: [
      'Grab ankle, pull heel to glute while walking',
      'Knees close; squeeze glute on the stretched side',
      'Stay upright — don’t fold forward',
    ],
    demoUrl: yt('walking quad stretch dynamic'),
  },
  'frankenstein walk': {
    name: 'Frankenstein Walk',
    cues: [
      'Kick straight leg up to opposite hand',
      'Keep torso tall; soft knee on stance leg',
      'Rhythm over reach',
    ],
    demoUrl: yt('frankenstein walk warm up'),
  },
  spiderman: {
    name: 'Spiderman',
    cues: [
      'From plank, step foot outside same-side hand',
      'Drop hips; optional reach to ceiling',
      'Alternate sides with control',
    ],
    demoUrl: yt('spiderman stretch mobility'),
  },
  'mountain climber': {
    name: 'Mountain Climber',
    cues: [
      'Strong plank — hips level',
      'Drive knees toward chest without bouncing',
      'Quiet feet; breathe',
    ],
    demoUrl: yt('mountain climbers form'),
  },
  'monster walk': {
    name: 'Monster Walk',
    cues: [
      'Band above knees or around ankles',
      'Sit into athletic stance; step wide without collapsing knees',
      'Keep tension on the band the whole set',
    ],
    demoUrl: yt('monster walk band exercise'),
  },
  'elbow to instep': {
    name: 'Elbow to Instep',
    cues: [
      'Lunge, drive elbow inside front foot toward floor',
      'Then rotate and reach arm to sky',
      'Keep back hip open',
    ],
    demoUrl: yt('elbow to instep stretch'),
  },
  'arm circles': {
    name: 'Arm Circles',
    cues: [
      'Start small then grow the circle',
      'Keep shoulders down away from ears',
      'Reverse direction after prescribed reps',
    ],
    demoUrl: yt('arm circles warm up'),
  },
  'bodyweight squats': {
    name: 'Bodyweight Squats',
    cues: [
      'Feet roughly shoulder-width; toes slight out',
      'Sit hips back and down; knees track toes',
      'Drive through mid-foot to stand',
    ],
    demoUrl: yt('bodyweight squat form'),
  },
  'hip openers': {
    name: 'Hip Openers',
    cues: [
      'From standing or kneeling, open the hip gently',
      'Move through a pain-free range',
      'Exhale as you deepen the open',
    ],
    demoUrl: yt('hip openers dynamic stretch'),
  },
  'power skip': {
    name: 'Power Skip',
    cues: [
      'Drive knee up and opposite arm',
      'Stay springy off the ball of the foot',
      'Easy height first — quality over hang time',
    ],
    demoUrl: yt('power skip running drill'),
  },
  'high knees': {
    name: 'High Knees',
    cues: [
      'Drive knees to hip height; quick ground contacts',
      'Tall posture; arms pump opposite',
      'Land soft under the hips',
    ],
    demoUrl: yt('high knees running drill'),
  },
  'butt kicks': {
    name: 'Butt Kicks',
    cues: [
      'Heels kick toward glutes under the body',
      'Stay tall; don’t lean forward',
      'Quick rhythm, light feet',
    ],
    demoUrl: yt('butt kicks running drill'),
  },
  shuffles: {
    name: 'Shuffles',
    cues: [
      'Athletic stance; don’t cross feet',
      'Push off the trailing leg; stay low',
      'Eyes up; hips square to the direction of travel',
    ],
    demoUrl: yt('lateral shuffle drill'),
  },
  carioca: {
    name: 'Carioca',
    cues: [
      'Rotate hips; trail leg crosses in front then behind',
      'Stay on balls of feet',
      'Arms help counter-rotate — smooth rhythm',
    ],
    demoUrl: yt('carioca drill running'),
  },
  'easy skip': {
    name: 'Easy Skip',
    cues: [
      'Soft skips — low effort',
      'Relaxed arms and shoulders',
      'Use as active recovery / priming',
    ],
    demoUrl: yt('easy skip warm up'),
  },
  'a-skips': {
    name: 'A-Skips',
    cues: [
      'Skip with high knee + dorsiflexed foot',
      'Strike under the hip; punch the ground down',
      'Stay tall with active arm drive',
    ],
    demoUrl: yt('A skip running drill'),
  },
  'build-ups': {
    name: 'Build-ups',
    cues: [
      'Accelerate smoothly through the percentages',
      'Stay relaxed in the face and shoulders',
      'Full recovery between reps',
    ],
    demoUrl: yt('sprint build ups acceleration'),
  },
  'build-ups / sprint progression': {
    name: 'Build-ups / Sprint Progression',
    cues: [
      'Hit each speed zone intentionally',
      'Mechanics first — don’t force the top end early',
      'Walk back recovery',
    ],
    demoUrl: yt('sprint progression build ups'),
  },
  'straight leg shuffle to sprint': {
    name: 'Straight Leg Shuffle to Sprint',
    cues: [
      'Shuffle with nearly straight legs, then open into a sprint',
      'Snap from shuffle posture into acceleration posture',
      'Keep eyes ahead through the transition',
    ],
    demoUrl: yt('straight leg shuffle to sprint drill'),
  },
  'stride-outs': {
    name: 'Stride-outs',
    cues: [
      'Relaxed long strides at prescribed %',
      'No straining — smooth turnover',
      'Use to groove speed without max effort',
    ],
    demoUrl: yt('stride outs sprint warm up'),
  },
  'hip flexor stretch': {
    name: 'Hip Flexor Stretch',
    cues: [
      'Kneeling lunge; tuck pelvis under (posterior tilt)',
      'Gentle lean forward — feel front of hip',
      'Breathe; hold ~20s/side',
    ],
    demoUrl: yt('kneeling hip flexor stretch'),
  },
  'hamstring stretch': {
    name: 'Hamstring Stretch',
    cues: [
      'Hinge at hips; long spine',
      'Soft knee if needed — no bouncing',
      'Exhale into the stretch',
    ],
    demoUrl: yt('standing hamstring stretch'),
  },
  'quad stretch': {
    name: 'Quad Stretch',
    cues: [
      'Pull heel to glute; knees close',
      'Stand tall; squeeze glute lightly',
      'Hold support if balance is shaky',
    ],
    demoUrl: yt('standing quad stretch'),
  },
  'chest opener': {
    name: 'Chest Opener',
    cues: [
      'Hands behind or on doorway; open the chest',
      'Shoulders down and back',
      'Easy breath into the sternum',
    ],
    demoUrl: yt('chest opener stretch doorway'),
  },
  'glute / figure-4': {
    name: 'Glute / Figure-4',
    cues: [
      'Ankle over opposite knee; sit back or pull shin',
      'Keep flexed foot; square hips',
      'Hold ~20s/side',
    ],
    demoUrl: yt('figure 4 glute stretch'),
  },
  'glute stretch': {
    name: 'Glute Stretch',
    cues: [
      'Cross ankle over knee or hug knee to chest',
      'Keep spine long',
      'Breathe into the outer hip',
    ],
    demoUrl: yt('glute stretch seated figure 4'),
  },
  'shoulder stretch': {
    name: 'Shoulder Stretch',
    cues: [
      'Bring arm across body; gentle pressure above elbow',
      'Don’t shrug the shoulder',
      'Hold both sides',
    ],
    demoUrl: yt('cross body shoulder stretch'),
  },
  'sumo stretch': {
    name: 'Sumo Stretch',
    cues: [
      'Wide stance; sit hips back and open adductors',
      'Hands on thighs or floor for support',
      'Keep chest up',
    ],
    demoUrl: yt('sumo squat stretch adductor'),
  },
  'spinal twist': {
    name: 'Spinal Twist',
    cues: [
      'Seated or lying; rotate gently through the torso',
      'Shoulders relax; no forcing the end range',
      'Breathe into the twist',
    ],
    demoUrl: yt('seated spinal twist stretch'),
  },
  'calf stretch': {
    name: 'Calf Stretch',
    cues: [
      'Straight and bent-knee variants for gastroc/soleus',
      'Heel down; lean into the wall',
      'Even pressure — no bouncing',
    ],
    demoUrl: yt('calf stretch wall'),
  },
  't-drill': {
    name: 'T-Drill',
    cues: [
      'Sprint to the T, shuffle, shuffle, backpedal',
      'Plant outside foot; stay low on cuts',
      'Touch the lines — quality over reckless speed',
    ],
    demoUrl: yt('T drill agility football'),
  },
  '5-10-5': {
    name: '5-10-5',
    cues: [
      'Pro agility: explode out, plant, reverse, plant, finish',
      'Low hips on the cuts',
      'Touch the line with the hand each time',
    ],
    demoUrl: yt('5-10-5 pro agility drill'),
  },
  'pro agility (5-10-5)': {
    name: 'Pro Agility (5-10-5)',
    cues: [
      'Same pattern as 5-10-5 — crisp plants',
      'Don’t round the turns; hit and go',
      'Reset stance between reps',
    ],
    demoUrl: yt('pro agility 5-10-5 drill'),
  },
  'carioca + cut': {
    name: 'Carioca + Cut',
    cues: [
      'Carioca into a hard plant and cut',
      'Eyes up through the transition',
      'Decelerate on purpose before the cut',
    ],
    demoUrl: yt('carioca cut agility drill'),
  },
  'core circuit': {
    name: 'Core Circuit',
    cues: [
      'Plank: ribs down, glutes on',
      'Dead bug: press low back into floor',
      'Side plank: stack hips; don’t sink',
    ],
    demoUrl: yt('plank dead bug side plank core circuit'),
  },
  'agility ladder 1-in/1-out': {
    name: 'Agility Ladder 1-in/1-out',
    cues: [
      'One foot per square (or pattern as coached)',
      'Stay on balls of feet; quiet contacts',
      'Arms help; eyes forward',
    ],
    demoUrl: yt('agility ladder 1 in 1 out'),
  },
  'lateral shuffle + plant': {
    name: 'Lateral Shuffle + Plant',
    cues: [
      'Shuffle then plant outside foot hard',
      'Load the plant hip; don’t cross over',
      'Re-accelerate the opposite way',
    ],
    demoUrl: yt('lateral shuffle plant cut drill'),
  },
  'hollow hold + pallof': {
    name: 'Hollow Hold + Pallof',
    cues: [
      'Hollow: low back glued down, ribs tucked',
      'Pallof: resist rotation; press out and hold',
      'Breathe — don’t hold a death grip breath',
    ],
    demoUrl: yt('hollow hold pallof press'),
  },
  'zigzag shuffle': {
    name: 'Zigzag Shuffle',
    cues: [
      'Shuffle through cones on a zigzag path',
      'Plant and change direction early',
      'Stay low the whole pattern',
    ],
    demoUrl: yt('zigzag shuffle agility'),
  },
  'box / x drill': {
    name: 'Box / X Drill',
    cues: [
      'Sprint / shuffle / backpedal the box or X pattern',
      'Touch every cone; sharp corners',
      'Recover fully between reps',
    ],
    demoUrl: yt('box drill agility X drill'),
  },
  'single-leg balance reach': {
    name: 'Single-leg Balance Reach',
    cues: [
      'Soft knee on stance leg; reach with free limb',
      'Hips stay level — no collapsing',
      'Control the return',
    ],
    demoUrl: yt('single leg balance reach'),
  },
  'core hollow rocks': {
    name: 'Core Hollow Rocks',
    cues: [
      'Hold hollow shape; rock small and controlled',
      'Low back stays pressed down',
      'Stop if neck strains — shorten the rock',
    ],
    demoUrl: yt('hollow body rocks'),
  },
  'steady run / jog': {
    name: 'Steady Run / Jog',
    cues: [
      'Conversational pace — nose breathing possible',
      'Relaxed shoulders and hands',
      'Even effort the whole block',
    ],
    demoUrl: yt('easy run jogging form tips'),
  },
  'mobility flow': {
    name: 'Mobility Flow',
    cues: [
      'Link hip and T-spine moves smoothly',
      'Move to mild stretch, not pain',
      'Slow breathing through each position',
    ],
    demoUrl: yt('hip thoracic spine mobility flow'),
  },
  'easy ruck': {
    name: 'Easy Ruck / Loaded Walk',
    cues: [
      'Pack high and tight; upright posture',
      'Recovery pace — talk test',
      'Shorten stride if load feels heavy',
    ],
    demoUrl: yt('rucking form tips weighted pack walk'),
  },
  'easy fartlek': {
    name: 'Easy Fartlek',
    cues: [
      'Mostly easy with brief pickups',
      'Pickups are playful, not races',
      'Drop back to easy before HR spikes too far',
    ],
    demoUrl: yt('easy fartlek run workout'),
  },
  'band pull-aparts': {
    name: 'Band Pull-Aparts',
    cues: [
      'Arms long; pull band to chest line',
      'Squeeze shoulder blades; don’t shrug',
      'Control the return',
    ],
    demoUrl: yt('band pull aparts form'),
  },
  'glute bridge': {
    name: 'Glute Bridge',
    cues: [
      'Drive through heels; squeeze glutes at top',
      'Don’t hyperextend the low back',
      'Pause briefly at lockout',
    ],
    demoUrl: yt('glute bridge exercise form'),
  },
  'light farmer carry': {
    name: 'Light Farmer Carry',
    cues: [
      'Tall posture; ribs stacked over pelvis',
      'Soft grip — don’t death-clench',
      'Even steps; easy pace on Reload',
    ],
    demoUrl: yt('farmer carry form'),
  },
  'sprint starts': {
    name: 'Sprint Starts / Accel',
    cues: [
      'Fall into acceleration; big first steps',
      'Drive arms hard; shin angles forward',
      'Stand up gradually — don’t pop up early',
    ],
    demoUrl: yt('sprint start acceleration drill'),
  },
  'goblet / front squat': {
    name: 'Goblet / Front Squat',
    cues: [
      'Elbows high (front) or bell at chest (goblet)',
      'Sit between the heels; knees track toes',
      'Brace before the descent — RPE 6–7',
    ],
    demoUrl: yt('goblet squat front squat form'),
  },
  'bench / floor press': {
    name: 'Bench / Floor Press',
    cues: [
      'Shoulders packed; feet planted (bench)',
      'Control the touch; drive evenly',
      'Floor press: upper arms kiss the floor then press',
    ],
    demoUrl: yt('bench press floor press form'),
  },
  'broad jump': {
    name: 'Broad Jump',
    cues: [
      'Load hips and arms; explode forward',
      'Stick the landing soft and quiet',
      'Reset fully between reps',
    ],
    demoUrl: yt('standing broad jump technique'),
  },
  'wall drill': {
    name: 'Wall Drill / A-Skip into Accel',
    cues: [
      'Wall: lean, drive knee, dorsiflex',
      'Then A-skip into a short accel',
      'Stay patient through the first steps',
    ],
    demoUrl: yt('sprint wall drill A skip acceleration'),
  },
  'rdl / deadlift': {
    name: 'RDL / Deadlift',
    cues: [
      'Hinge — push hips back; soft knees',
      'Bar close to legs; flat back',
      'Squeeze glutes to stand; RPE 6–7',
    ],
    demoUrl: yt('Romanian deadlift form'),
  },
  'pull-ups': {
    name: 'Pull-ups / Negatives',
    cues: [
      'Full hang to chin over bar (or controlled negative)',
      'No kipping unless coached',
      'Leave 1–2 reps in the tank (AMRAP-2)',
    ],
    demoUrl: yt('pull up negatives form'),
  },
  'med ball slam': {
    name: 'Med Ball Slam',
    cues: [
      'Reach tall then slam through the hips',
      'Absorb the bounce; reset stance',
      'Exhale on the slam',
    ],
    demoUrl: yt('medicine ball slam form'),
  },
  'flying 10s': {
    name: 'Flying 10s / Accel Starts',
    cues: [
      'Build into the fly zone then hold speed',
      'Relax face and hands at top speed',
      'Full recovery between flies',
    ],
    demoUrl: yt('flying 10s sprint drill'),
  },
  'split squat': {
    name: 'Split Squat',
    cues: [
      'Long enough stance; front shin mostly vertical',
      'Drop back knee under hip',
      'Drive through front mid-foot',
    ],
    demoUrl: yt('rear foot elevated split squat form'),
  },
  'box jump': {
    name: 'Box Jump',
    cues: [
      'Load and jump — soft quiet landing',
      'Stand tall on the box; step down',
      'Height you can own — not max chase',
    ],
    demoUrl: yt('box jump technique'),
  },
  'overhead press': {
    name: 'Overhead Press',
    cues: [
      'Brace core; press bar/path over mid-foot',
      'Head through at the top',
      'Don’t lean back to finish the lockout',
    ],
    demoUrl: yt('overhead press form'),
  },
  'resisted march': {
    name: 'Resisted March → Sprint',
    cues: [
      'March tall against light resistance',
      'Release into a free sprint',
      'Keep posture when the load comes off',
    ],
    demoUrl: yt('resisted march sprint drill'),
  },
  'hang clean': {
    name: 'Hang Clean / Jump Shrug',
    cues: [
      'Hips through; shrug and pull under (light)',
      'Or jump shrug — extend fully, soft land',
      'Technique over load',
    ],
    demoUrl: yt('hang clean jump shrug technique'),
  },
  'med ball rotational throw': {
    name: 'Med Ball Rotational Throw',
    cues: [
      'Load the rear hip; rotate through',
      'Throw across the body; follow through',
      'Reset feet each rep',
    ],
    demoUrl: yt('medicine ball rotational throw'),
  },
  'flying 20s': {
    name: 'Flying 20s',
    cues: [
      'Build, then hold 90–95% for 20 yd',
      'Stay tall and relaxed at speed',
      'Long rest — quality only',
    ],
    demoUrl: yt('flying 20s sprint'),
  },
  'ammo-can deadlift': {
    name: 'Ammo-Can Deadlift + Press',
    cues: [
      'Hinge to the cans; flat back',
      'Stand tall then press overhead with control',
      'Set cans down quietly',
    ],
    demoUrl: yt('ammo can deadlift press workout'),
  },
  'shuttle run': {
    name: 'Shuttle Run',
    cues: [
      'Touch the line every turn',
      'Decelerate into the plant; explode out',
      'Even effort across the set',
    ],
    demoUrl: yt('60 yard shuttle run'),
  },
  '60-yd shuttle': {
    name: '60-yd Shuttle',
    cues: [
      'Standard shuttle distances as marked',
      'Plant and go — no rounding',
      'Breathe on the recoveries',
    ],
    demoUrl: yt('60 yard shuttle drill'),
  },
  'sandbag clean + squat': {
    name: 'Sandbag Clean + Squat',
    cues: [
      'Hip drive to clean the bag to the rack',
      'Squat with elbows high / bag hugged',
      'Drop under control between reps',
    ],
    demoUrl: yt('sandbag clean squat'),
  },
  gassers: {
    name: 'Gassers',
    cues: [
      'Sideline-to-sideline shuttles as marked',
      'Touch lines; stay honest on the turns',
      'Controlled hard — not sloppy sprinting',
    ],
    demoUrl: yt('football gassers conditioning'),
  },
  'buddy drag': {
    name: 'Buddy Drag / Litter Carry',
    cues: [
      'Secure grip; hips drive the drag',
      'Litter: lift with legs, communicate',
      'Switch sides / roles as prescribed',
    ],
    demoUrl: yt('buddy drag litter carry drill'),
  },
  'ammo-can lunge': {
    name: 'Ammo-Can Lunge + Row',
    cues: [
      'Lunge with torso tall; cans stable',
      'Row elbows back without shrugging',
      'Alternate legs evenly',
    ],
    demoUrl: yt('ammo can lunge row'),
  },
  'shuttle + bear crawl': {
    name: 'Shuttle + Bear Crawl Mix',
    cues: [
      'Sprint shuttle then drop to bear crawl',
      'Bear: knees hover, opposite limbs move',
      'Keep hips level on the crawl',
    ],
    demoUrl: yt('bear crawl shuttle conditioning'),
  },
  'sandbag shouldering': {
    name: 'Sandbag Shouldering',
    cues: [
      'Hip hinge, scoop, and punch bag to shoulder',
      'Stand tall before switching sides',
      'Reset feet — don’t rush the scoop',
    ],
    demoUrl: yt('sandbag shouldering exercise'),
  },
  'ammo-can farmer carry': {
    name: 'Ammo-Can Farmer Carry',
    cues: [
      'Cans tight to sides; tall walk',
      'Don’t lean; short quick steps if needed',
      'Set down under control at the end',
    ],
    demoUrl: yt('farmer carry ammo cans'),
  },
  'burpee broad jump': {
    name: 'Burpee Broad Jump',
    cues: [
      'Chest to deck, stand, then broad jump',
      'Stick the landing before the next burpee',
      'Smooth rhythm over frantic reps',
    ],
    demoUrl: yt('burpee broad jump'),
  },
  'dead bugs': {
    name: 'Dead Bugs',
    cues: [
      'Press low back down the whole set',
      'Opposite arm/leg extend slowly',
      'Exhale on the extension',
    ],
    demoUrl: yt('dead bug core exercise'),
  },
  'bird-dog': {
    name: 'Bird-Dog',
    cues: [
      'Opposite arm and leg; hips square',
      'Pause at full reach; no wobble',
      'Soft return to start',
    ],
    demoUrl: yt('bird dog exercise form'),
  },
  'pallof': {
    name: 'Pallof Press',
    cues: [
      'Resist the band’s pull to rotate you',
      'Press out, hold, return slow',
      'Glutes and core braced',
    ],
    demoUrl: yt('pallof press anti rotation'),
  },
  plank: {
    name: 'Plank',
    cues: [
      'Elbows under shoulders; ribs down',
      'Squeeze glutes; long neck',
      'Breathe — don’t dump into the low back',
    ],
    demoUrl: yt('forearm plank form'),
  },
  'side plank': {
    name: 'Side Plank',
    cues: [
      'Stack feet or stagger; hips up',
      'Top hand on hip or sky',
      'Don’t let the bottom hip sag',
    ],
    demoUrl: yt('side plank form'),
  },
  'bear crawl': {
    name: 'Bear Crawl',
    cues: [
      'Knees hover an inch; flat back',
      'Opposite hand and foot move together',
      'Slow and controlled beats speed',
    ],
    demoUrl: yt('bear crawl exercise form'),
  },
  'back / goblet squat': {
    name: 'Back / Goblet Squat',
    cues: [
      'Brace before you sit',
      'Depth you own with a neutral spine',
      'Drive up without knees caving',
    ],
    demoUrl: yt('back squat goblet squat form'),
  },
}

function normalize(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[—–]/g, '-')
    .replace(/['']/g, '')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9+/.\s-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Strip session pack titles like "Warrior — Agility Circuit". */
function stripSessionTitle(name: string): string {
  return name.replace(
    /^(Warrior|Reload(?:\s*\(Thu\))?|Athlete|Combat)\s*[—–-]\s*/i,
    '',
  )
}

/**
 * Find a demo for an exercise name from the pools.
 * Returns null if nothing useful matches (UI can hide Demo).
 */
export function getDemo(exerciseName: string): ExerciseDemo | null {
  const stripped = stripSessionTitle(exerciseName)
  const n = normalize(stripped)
  if (!n) return null

  // Exact / near-exact
  if (DEMOS[n]) return DEMOS[n]

  // Try primary clause before + / /
  const primary = normalize(stripped.split(/\s*[+/]\s*/)[0] ?? stripped)
  if (DEMOS[primary]) return DEMOS[primary]

  // Substring / includes match on keys and demo names
  let best: ExerciseDemo | null = null
  let bestScore = 0
  for (const [key, demo] of Object.entries(DEMOS)) {
    if (n.includes(key) || key.includes(n)) {
      const score = Math.min(n.length, key.length)
      if (score > bestScore) {
        bestScore = score
        best = demo
      }
      continue
    }
    const dn = normalize(demo.name)
    if (n.includes(dn) || dn.includes(n)) {
      const score = Math.min(n.length, dn.length)
      if (score > bestScore) {
        bestScore = score
        best = demo
      }
    }
  }
  // Require a meaningful overlap so session titles don’t false-match
  if (best && bestScore >= 5) return best

  // Fallback: YouTube search for the exercise itself (still a real URL)
  return {
    name: stripped.trim() || exerciseName,
    cues: [
      'Watch a reputable coaching video — prioritize form over load',
      'Match the prescription (reps / distance / RPE) in the plan',
      'Ask the PTNCO if the movement is unclear',
    ],
    demoUrl: yt(`${stripped || exerciseName} exercise form`),
  }
}
