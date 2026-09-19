import type { Marine } from '../types'

export const SEED_ROSTER: Marine[] = [
  { id: 'bledsoe', rank: 'Cpl', name: 'Bledsoe' },
  { id: 'diazreynoso', rank: 'Cpl', name: 'Diazreynoso' },
  { id: 'ferreira', rank: 'Cpl', name: 'Ferreira' },
  { id: 'garza', rank: 'Cpl', name: 'Garza' },
  { id: 'kersenbrock', rank: 'Cpl', name: 'Kersenbrock' },
  { id: 'kreul', rank: 'Cpl', name: 'Kreul' },
  { id: 'miles', rank: 'Cpl', name: 'Miles' },
  { id: 'romero', rank: 'Cpl', name: 'Romero' },
  { id: 'scott', rank: 'Cpl', name: 'Scott' },
  { id: 'frei', rank: 'LCpl', name: 'Frei' },
  { id: 'gomez', rank: 'LCpl', name: 'Gomez' },
  { id: 'kelmel', rank: 'LCpl', name: 'Kelmel' },
  { id: 'patteson', rank: 'LCpl', name: 'Patteson' },
  { id: 'sastre', rank: 'LCpl', name: 'Sastre' },
  { id: 'stuart', rank: 'LCpl', name: 'Stuart', role: 'PTNCO' },
  { id: 'valle', rank: 'LCpl', name: 'Valle' },
  { id: 'gerardoguillen', rank: 'PFC', name: 'Gerardoguillen' },
  { id: 'goins', rank: 'PFC', name: 'Goins' },
]

export const PTNCO_ID = 'stuart'

export const STATUS_CYCLE: Array<'P' | 'A' | 'D' | 'L' | 'M'> = [
  'P',
  'A',
  'D',
  'L',
  'M',
]

export const STATUS_LABEL: Record<'P' | 'A' | 'D' | 'L' | 'M', string> = {
  P: 'Present',
  A: 'Absent',
  D: 'Duty',
  L: 'Leave',
  M: 'Medical',
}

export const STATUS_COLOR: Record<'P' | 'A' | 'D' | 'L' | 'M', string> = {
  P: 'bg-emerald-600 text-white',
  A: 'bg-red-700 text-white',
  D: 'bg-amber-600 text-white',
  L: 'bg-sky-700 text-white',
  M: 'bg-violet-700 text-white',
}
