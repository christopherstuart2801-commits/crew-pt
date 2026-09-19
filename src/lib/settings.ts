import type {
  EquipmentToggles,
  ExerciseItem,
  Focus,
  VolumeLevel,
  WorkoutSettings,
  WorkoutStyle,
} from '../types'

export const DEFAULT_SETTINGS: WorkoutSettings = {
  style: 'hitt',
  block1Min: 10,
  block2Min: 30,
  block3Min: 10,
  workSec: 40,
  restSec: 20,
  volume: 'average',
  restDefaultSec: 60,
  rpeTarget: 7,
  equipment: {
    barbell: true,
    ammoCan: true,
    sandbag: true,
    kettlebell: true,
    track: true,
  },
}

export const STYLE_OPTIONS: { id: WorkoutStyle; label: string; hint: string }[] =
  [
    { id: 'hitt', label: 'HITT default', hint: 'Balanced open-session packs' },
    {
      id: 'strength',
      label: 'Strength-biased',
      hint: 'Prefer compounds & loaded work',
    },
    {
      id: 'speed',
      label: 'Speed-biased',
      hint: 'Prefer accel, flies, build-ups',
    },
    {
      id: 'combat',
      label: 'Combat-biased',
      hint: 'Prefer ammo / sandbag / shuttles',
    },
  ]

export const VOLUME_OPTIONS: {
  id: VolumeLevel
  label: string
  mult: number
}[] = [
  { id: 'easy', label: 'Easy', mult: 0.75 },
  { id: 'average', label: 'Average Marine', mult: 1 },
  { id: 'hard', label: 'Hard', mult: 1.25 },
]

export function volumeMultiplier(level: VolumeLevel): number {
  return VOLUME_OPTIONS.find((v) => v.id === level)?.mult ?? 1
}

/** Scale integers in prescription strings (sets, reps, yards, seconds, rounds). */
export function scaleDetail(
  detail: string | undefined,
  mult: number,
): string | undefined {
  if (!detail || mult === 1) return detail
  return detail.replace(/\d+/g, (raw) => {
    const n = Number(raw)
    if (!Number.isFinite(n) || n <= 0) return raw
    return String(Math.max(1, Math.round(n * mult)))
  })
}

export function scaleItem(item: ExerciseItem, mult: number): ExerciseItem {
  return {
    name: item.name,
    detail: scaleDetail(item.detail, mult),
  }
}

const EQUIP_RULES: {
  key: keyof EquipmentToggles
  patterns: RegExp[]
}[] = [
  {
    key: 'barbell',
    patterns: [
      /\bback\s*\/\s*goblet squat\b/i,
      /\brdl\b/i,
      /\bdeadlift\b/i,
      /\bhang clean\b/i,
      /\bbench\b/i,
      /\bfloor press\b/i,
      /\boverhead press\b/i,
      /\bbarbell\b/i,
    ],
  },
  {
    key: 'ammoCan',
    patterns: [/\bammo[- ]?can\b/i],
  },
  {
    key: 'sandbag',
    patterns: [/\bsandbag\b/i],
  },
  {
    key: 'kettlebell',
    patterns: [/\bkettlebell\b/i, /\bgoblet\b/i],
  },
  {
    key: 'track',
    patterns: [/\bflying\b/i, /\bbuild-?ups?\b/i, /\bsprint starts\b/i],
  },
]

export function needsDisabledEquipment(
  name: string,
  equipment: EquipmentToggles,
): boolean {
  for (const rule of EQUIP_RULES) {
    if (equipment[rule.key]) continue
    if (rule.patterns.some((p) => p.test(name))) return true
  }
  return false
}

export function filterByEquipment(
  items: ExerciseItem[],
  equipment: EquipmentToggles,
): ExerciseItem[] {
  return items.filter((e) => !needsDisabledEquipment(e.name, equipment))
}

function styleKeywords(style: WorkoutStyle): RegExp[] {
  switch (style) {
    case 'strength':
      return [
        /squat/i,
        /deadlift/i,
        /rdl/i,
        /press/i,
        /pull-?up/i,
        /clean/i,
        /bridge/i,
        /farmer/i,
        /compound/i,
        /strength/i,
      ]
    case 'speed':
      return [
        /sprint/i,
        /flying/i,
        /build-?up/i,
        /accel/i,
        /skip/i,
        /stride/i,
        /max speed/i,
        /wall drill/i,
      ]
    case 'combat':
      return [
        /ammo/i,
        /sandbag/i,
        /gasser/i,
        /shuttle/i,
        /buddy/i,
        /litter/i,
        /combat/i,
        /bear crawl/i,
      ]
    default:
      return []
  }
}

export function scorePackForStyle(
  pack: ExerciseItem[],
  style: WorkoutStyle,
  focus: Focus,
): number {
  if (style === 'hitt') return 0
  const kws = styleKeywords(style)
  let score = 0
  for (const item of pack) {
    const text = `${item.name} ${item.detail ?? ''}`
    for (const k of kws) if (k.test(text)) score += 2
  }
  if (style === 'strength' && focus === 'Athlete') score += 3
  if (style === 'speed' && (focus === 'Combat' || focus === 'Athlete')) score += 3
  if (style === 'combat' && focus === 'Combat') score += 3
  if (style === 'combat' && focus === 'Warrior') score += 1
  return score
}

export function pickBiasedPack(
  packs: ExerciseItem[][],
  style: WorkoutStyle,
  focus: Focus,
  rand: () => number = Math.random,
): ExerciseItem[] {
  if (packs.length === 0) return []
  if (style === 'hitt') {
    return packs[Math.floor(rand() * packs.length)]!
  }
  const scored = packs.map((p, i) => ({
    i,
    s: scorePackForStyle(p, style, focus),
  }))
  const max = Math.max(...scored.map((x) => x.s))
  const top = scored.filter((x) => x.s === max)
  const choice = top[Math.floor(rand() * top.length)]!
  return packs[choice.i]!
}

export function normalizeSettings(
  raw: Partial<WorkoutSettings> | undefined | null,
): WorkoutSettings {
  const d = DEFAULT_SETTINGS
  if (!raw || typeof raw !== 'object') {
    return { ...d, equipment: { ...d.equipment } }
  }
  const style = (['hitt', 'strength', 'speed', 'combat'] as const).includes(
    raw.style as WorkoutStyle,
  )
    ? (raw.style as WorkoutStyle)
    : d.style
  const volume = (['easy', 'average', 'hard'] as const).includes(
    raw.volume as VolumeLevel,
  )
    ? (raw.volume as VolumeLevel)
    : d.volume
  const clamp = (n: unknown, lo: number, hi: number, fallback: number) => {
    const v = Number(n)
    if (!Number.isFinite(v)) return fallback
    return Math.min(hi, Math.max(lo, Math.round(v)))
  }
  const eq = raw.equipment ?? d.equipment
  return {
    style,
    volume,
    block1Min: clamp(raw.block1Min, 5, 30, d.block1Min),
    block2Min: clamp(raw.block2Min, 10, 60, d.block2Min),
    block3Min: clamp(raw.block3Min, 5, 20, d.block3Min),
    workSec: clamp(raw.workSec, 10, 90, d.workSec),
    restSec: clamp(raw.restSec, 5, 90, d.restSec),
    restDefaultSec: clamp(raw.restDefaultSec, 15, 180, d.restDefaultSec),
    rpeTarget: clamp(raw.rpeTarget, 6, 8, d.rpeTarget),
    equipment: {
      barbell: eq.barbell !== false,
      ammoCan: eq.ammoCan !== false,
      sandbag: eq.sandbag !== false,
      kettlebell: eq.kettlebell !== false,
      track: eq.track !== false,
    },
  }
}
