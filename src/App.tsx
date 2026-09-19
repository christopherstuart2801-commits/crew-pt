import { useEffect, useState } from 'react'
import { Controls } from './components/Controls'
import { DayStrip } from './components/DayStrip'
import { DayView } from './components/DayView'
import { RollCall } from './components/RollCall'
import { RosterEditor } from './components/RosterEditor'
import { STATUS_CYCLE } from './data/roster'
import {
  advanceStart,
  exportJson,
  importJson,
  loadState,
  saveState,
} from './lib/storage'
import { randomizeDay, randomizeThreeDays } from './lib/randomize'
import type { AppState, Marine, Status } from './types'

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState())
  const [selected, setSelected] = useState(0)
  const [editing, setEditing] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(t)
  }, [toast])

  function cycleStatus(id: string) {
    setState((s) => {
      const cur = s.statuses[id] ?? 'P'
      const idx = STATUS_CYCLE.indexOf(cur)
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length]!
      return {
        ...s,
        statuses: { ...s.statuses, [id]: next },
      }
    })
  }

  function saveRoster(roster: Marine[]) {
    setState((s) => {
      const statuses: Record<string, Status> = { ...s.statuses }
      for (const m of roster) {
        if (!statuses[m.id]) statuses[m.id] = 'P'
      }
      for (const id of Object.keys(statuses)) {
        if (!roster.some((m) => m.id === id)) delete statuses[id]
      }
      return { ...s, roster, statuses }
    })
    setToast('Roster saved')
  }

  function randomizeSelected() {
    setState((s) => {
      const i = selected
      const labels = ['Today', 'Tomorrow', 'Day+2'] as const
      const prev = s.days[i]
      if (!prev) return s
      const day = randomizeDay(
        prev.dateKey,
        labels[i]!,
        s.roster,
        s.statuses,
      )
      const days = s.days.map((d, j) => (j === i ? day : d))
      return { ...s, days }
    })
    setToast('Day randomized')
  }

  function randomizeAll() {
    setState((s) => ({
      ...s,
      days: randomizeThreeDays(s.startDate, s.roster, s.statuses),
    }))
    setToast('All 3 days randomized')
  }

  function onAdvance() {
    setState((s) => advanceStart(s))
    setSelected(0)
    setToast('Advanced to next weekday')
  }

  function onExport() {
    const blob = new Blob([exportJson(state)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `crew-pt-${state.startDate}.json`
    a.click()
    URL.revokeObjectURL(url)
    setToast('Exported')
  }

  async function onImport(file: File) {
    try {
      const text = await file.text()
      const next = importJson(text)
      setState(next)
      setSelected(0)
      setToast('Imported')
    } catch {
      setToast('Import failed')
    }
  }

  const day = state.days[selected]

  return (
    <div className="mx-auto min-h-dvh max-w-lg px-3 pb-10 pt-4">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-black tracking-tight">CREW PT</h1>
        <p className="text-xs font-semibold uppercase text-zinc-500">
          Phone-first · HITT-ready
        </p>
      </header>

      <div className="space-y-4">
        <RollCall
          roster={state.roster}
          statuses={state.statuses}
          onCycle={cycleStatus}
          onEdit={() => setEditing(true)}
        />

        <DayStrip
          days={state.days}
          selected={selected}
          onSelect={setSelected}
        />

        <Controls
          onRandomizeDay={randomizeSelected}
          onRandomizeAll={randomizeAll}
          onAdvance={onAdvance}
          onExport={onExport}
          onImport={onImport}
          startDate={state.startDate}
        />

        {day && <DayView day={day} roster={state.roster} />}
      </div>

      {editing && (
        <RosterEditor
          roster={state.roster}
          onSave={saveRoster}
          onClose={() => setEditing(false)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
