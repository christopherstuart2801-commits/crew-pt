import {
  COOLDOWN_PACKS,
  FOCUS_POOLS,
  LOCOMOTION_BASE,
  LOCOMOTION_LIGHT,
  OPENER_PACKS,
  OPENER_PACKS_LIGHT,
  RELOAD_THU_POOLS,
  SPRINT_PREP_LIGHT,
  SPRINT_PREP_PACKS,
  focusBadge,
} from '../data/exercises'
import { PTNCO_ID } from '../data/roster'
import type { DayPlan, Focus, Marine, WorkoutSettings } from '../types'
import {
  dayLabels,
  formatShort,
  isThursdayReload,
  nextWeekday,
  sessionForDate,
} from './dates'
import { pick, sampleLeaders, shuffle } from './random'
import {
  DEFAULT_SETTINGS,
  filterByEquipment,
  pickBiasedPack,
  scaleItem,
  volumeMultiplier,
} from './settings'

function presentIds(roster: Marine[], statuses: Record<string, string>): string[] {
  return roster
    .filter((m) => (statuses[m.id] ?? 'P') === 'P')
    .map((m) => m.id)
}

/** Next three Mon–Fri dates starting at startDate (inclusive). */
function threeWeekdays(startDate: string): [string, string, string] {
  const a = startDate
  const b = nextWeekday(a)
  const c = nextWeekday(b)
  return [a, b, c]
}

function applyVolumeAndEquip(
  items: { name: string; detail?: string }[],
  settings: WorkoutSettings,
): { name: string; detail?: string }[] {
  const mult = volumeMultiplier(settings.volume)
  const filtered = filterByEquipment(items, settings.equipment)
  const base = filtered.length > 0 ? filtered : items
  return base.map((e) => scaleItem(e, mult))
}

/** Block1: Movement Prep opener + loco + sprint prep (lighter on Reload). */
function buildWarmup(
  leaderPool: string[],
  focus: Focus,
  settings: WorkoutSettings,
): DayPlan['block1'] {
  const light = focus === 'Reload'
  const raw = light
    ? {
        opener: pick(OPENER_PACKS_LIGHT).map((e) => ({ ...e })),
        locomotion: shuffle(LOCOMOTION_LIGHT)
          .slice(0, 2)
          .map((e) => ({ ...e })),
        sprintPrep: pick(SPRINT_PREP_LIGHT).map((e) => ({ ...e })),
      }
    : {
        opener: pick(OPENER_PACKS).map((e) => ({ ...e })),
        locomotion: shuffle(LOCOMOTION_BASE).map((e) => ({ ...e })),
        sprintPrep: pick(SPRINT_PREP_PACKS).map((e) => ({ ...e })),
      }
  return {
    opener: applyVolumeAndEquip(raw.opener, settings),
    locomotion: applyVolumeAndEquip(raw.locomotion, settings),
    sprintPrep: applyVolumeAndEquip(raw.sprintPrep, settings),
    leaderId: sampleLeaders(leaderPool, [PTNCO_ID]),
    durationMin: settings.block1Min,
  }
}

function buildMain(
  focus: Focus,
  dateKey: string,
  settings: WorkoutSettings,
): DayPlan['block2'] {
  const packs =
    focus === 'Reload' && isThursdayReload(dateKey)
      ? RELOAD_THU_POOLS
      : FOCUS_POOLS[focus]
  // Filter packs that would be emptied by equipment, then style-bias pick
  const usable = packs
    .map((p) => filterByEquipment(p, settings.equipment))
    .filter((p) => p.length >= 2)
  const pool = usable.length > 0 ? usable : packs
  const chosen = pickBiasedPack(pool, settings.style, focus)
  const mult = volumeMultiplier(settings.volume)
  const items = chosen.map((e) => scaleItem(e, mult))
  // Annotate RPE on first item detail if strength/athlete leaning
  if (items[0] && focus === 'Athlete') {
    const d = items[0].detail ?? ''
    if (!/RPE/i.test(d)) {
      items[0] = {
        ...items[0],
        detail: d ? `${d} · RPE ${settings.rpeTarget}` : `RPE ${settings.rpeTarget}`,
      }
    }
  }
  return {
    focus,
    badge: focusBadge(focus),
    items,
    leaderId: PTNCO_ID,
    durationMin: settings.block2Min,
    workSec: settings.workSec,
    restSec: settings.restSec,
    rpeTarget: settings.rpeTarget,
  }
}

/** Block3: Flexibility & Mobility */
function buildCooldown(
  leaderPool: string[],
  settings: WorkoutSettings,
): DayPlan['block3'] {
  const pack = pick(COOLDOWN_PACKS).map((e) => ({ ...e }))
  return {
    items: applyVolumeAndEquip(pack, settings),
    leaderId: sampleLeaders(leaderPool, [PTNCO_ID]),
    durationMin: settings.block3Min,
  }
}

/**
 * Randomize packs for a day while locking focus to the HITT calendar
 * (Mon Warrior / Tue Reload / Wed Athlete / Thu Reload / Fri Combat).
 * Settings bias pack choice, scale volume, and stamp block timings.
 */
export function randomizeDay(
  dateKey: string,
  label: string,
  roster: Marine[],
  statuses: Record<string, string>,
  settings: WorkoutSettings = DEFAULT_SETTINGS,
  _avoidFocus?: Focus,
): DayPlan {
  const pool = presentIds(roster, statuses)
  const focus = sessionForDate(dateKey)
  return {
    dateKey,
    label: `${label} · ${formatShort(dateKey)}`,
    focus,
    block1: buildWarmup(pool, focus, settings),
    block2: buildMain(focus, dateKey, settings),
    block3: buildCooldown(pool, settings),
  }
}

export function randomizeThreeDays(
  startDate: string,
  roster: Marine[],
  statuses: Record<string, string>,
  settings: WorkoutSettings = DEFAULT_SETTINGS,
): DayPlan[] {
  const labels = dayLabels(startDate)
  const keys = threeWeekdays(startDate)
  return keys.map((key, i) =>
    randomizeDay(key, labels[i]!, roster, statuses, settings),
  )
}

export function reLabelDays(startDate: string, days: DayPlan[]): DayPlan[] {
  const labels = dayLabels(startDate)
  const keys = threeWeekdays(startDate)
  return days.map((d, i) => ({
    ...d,
    dateKey: keys[i]!,
    label: `${labels[i]} · ${formatShort(keys[i]!)}`,
  }))
}
