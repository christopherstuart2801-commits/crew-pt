export type Status = 'P' | 'A' | 'D' | 'L' | 'M'

export type Rank = 'Cpl' | 'LCpl' | 'PFC'

/** Official HITT Mon–Fri session types (UI labels). */
export type Focus = 'Warrior' | 'Reload' | 'Athlete' | 'Combat'

export type WorkoutStyle = 'hitt' | 'strength' | 'speed' | 'combat'

export type VolumeLevel = 'easy' | 'average' | 'hard'

export interface EquipmentToggles {
  barbell: boolean
  ammoCan: boolean
  sandbag: boolean
  kettlebell: boolean
  track: boolean
}

/** User-tunable workout parameters (persist + export). */
export interface WorkoutSettings {
  style: WorkoutStyle
  /** Block durations (minutes) */
  block1Min: number
  block2Min: number
  block3Min: number
  /** Circuit work:rest (seconds) */
  workSec: number
  restSec: number
  volume: VolumeLevel
  /** Default rest between sets (seconds) */
  restDefaultSec: number
  /** Target RPE 6–8 */
  rpeTarget: number
  equipment: EquipmentToggles
}

export interface Marine {
  id: string
  rank: Rank
  name: string
  role?: 'PTNCO'
}

export interface ExerciseItem {
  name: string
  detail?: string
}

export interface WarmupBlock {
  opener: ExerciseItem[]
  locomotion: ExerciseItem[]
  sprintPrep: ExerciseItem[]
  leaderId: string | null
  durationMin?: number
}

export interface MainBlock {
  focus: Focus
  /** Short UI badge, e.g. "Agility" */
  badge?: string
  items: ExerciseItem[]
  leaderId: string
  durationMin?: number
  workSec?: number
  restSec?: number
  rpeTarget?: number
}

export interface CooldownBlock {
  items: ExerciseItem[]
  leaderId: string | null
  durationMin?: number
}

export interface DayPlan {
  dateKey: string
  label: string
  focus: Focus
  block1: WarmupBlock
  block2: MainBlock
  block3: CooldownBlock
}

export interface AppState {
  version: 3
  roster: Marine[]
  statuses: Record<string, Status>
  startDate: string
  days: DayPlan[]
  settings: WorkoutSettings
}
