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
import type { DayPlan, Focus, Marine } from '../types'
import {
  dayLabels,
  formatShort,
  isThursdayReload,
  nextWeekday,
  sessionForDate,
} from './dates'
import { pick, sampleLeaders, shuffle } from './random'

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

/** Block1: Movement Prep opener + loco + sprint prep (lighter on Reload). */
function buildWarmup(
  leaderPool: string[],
  focus: Focus,
): DayPlan['block1'] {
  const light = focus === 'Reload'
  if (light) {
    return {
      opener: pick(OPENER_PACKS_LIGHT).map((e) => ({ ...e })),
      locomotion: shuffle(LOCOMOTION_LIGHT)
        .slice(0, 2)
        .map((e) => ({ ...e })),
      sprintPrep: pick(SPRINT_PREP_LIGHT).map((e) => ({ ...e })),
      leaderId: sampleLeaders(leaderPool, [PTNCO_ID]),
    }
  }
  return {
    opener: pick(OPENER_PACKS).map((e) => ({ ...e })),
    locomotion: shuffle(LOCOMOTION_BASE).map((e) => ({ ...e })),
    sprintPrep: pick(SPRINT_PREP_PACKS).map((e) => ({ ...e })),
    leaderId: sampleLeaders(leaderPool, [PTNCO_ID]),
  }
}

function buildMain(focus: Focus, dateKey: string): DayPlan['block2'] {
  const packs =
    focus === 'Reload' && isThursdayReload(dateKey)
      ? RELOAD_THU_POOLS
      : FOCUS_POOLS[focus]
  return {
    focus,
    badge: focusBadge(focus),
    items: pick(packs).map((e) => ({ ...e })),
    leaderId: PTNCO_ID,
  }
}

/** Block3: Flexibility & Mobility */
function buildCooldown(leaderPool: string[]): DayPlan['block3'] {
  return {
    items: pick(COOLDOWN_PACKS).map((e) => ({ ...e })),
    leaderId: sampleLeaders(leaderPool, [PTNCO_ID]),
  }
}

/**
 * Randomize packs for a day while locking focus to the HITT calendar
 * (Mon Warrior / Tue Reload / Wed Athlete / Thu Reload / Fri Combat).
 */
export function randomizeDay(
  dateKey: string,
  label: string,
  roster: Marine[],
  statuses: Record<string, string>,
  _avoidFocus?: Focus,
): DayPlan {
  const pool = presentIds(roster, statuses)
  const focus = sessionForDate(dateKey)
  return {
    dateKey,
    label: `${label} · ${formatShort(dateKey)}`,
    focus,
    block1: buildWarmup(pool, focus),
    block2: buildMain(focus, dateKey),
    block3: buildCooldown(pool),
  }
}

export function randomizeThreeDays(
  startDate: string,
  roster: Marine[],
  statuses: Record<string, string>,
): DayPlan[] {
  const labels = dayLabels(startDate)
  const keys = threeWeekdays(startDate)
  return keys.map((key, i) =>
    randomizeDay(key, labels[i]!, roster, statuses),
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
