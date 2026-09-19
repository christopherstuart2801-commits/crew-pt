import { useEffect, useState } from 'react'
import { CalendarMonth } from './components/CalendarMonth'
import { Controls } from './components/Controls'
import { DateControl } from './components/DateControl'
import { DayStrip } from './components/DayStrip'
import { DayView } from './components/DayView'
import { RollCall } from './components/RollCall'
import { RosterEditor } from './components/RosterEditor'
import { SettingsPanel } from './components/SettingsPanel'
import { STATUS_CYCLE } from './data/roster'
import {
  advanceStart,
  exportJson,
  importJson,
  loadState,
  saveState,
  setStartDate,
} from './lib/storage'
import { randomizeDay, randomizeThreeDays } from './lib/randomize'
import type { AppState, Marine, Status, WorkoutSettings } from './types'

type BlockKey = 'opener' | 'locomotion' | 'sprintPrep' | 'main' | 'cooldown'

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState())
  const [selected, setSelected] = useState(0)
  const [editing, setEditing] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
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
        s.settings,
      )
      const days = s.days.map((d, j) => (j === i ? day : d))
      return { ...s, days }
    })
    setToast('Day randomized')
  }

  function randomizeAll() {
    setState((s) => ({
      ...s,
      days: randomizeThreeDays(
        s.startDate,
        s.roster,
        s.statuses,
        s.settings,
      ),
    }))
    setToast('All 3 days randomized')
  }

  function onAdvance() {
    setState((s) => advanceStart(s))
    setSelected(0)
    setToast('Advanced to next weekday')
  }

  function onSelectCalendarDate(dateKey: string, note?: string | null) {
    const idx = state.days.findIndex((d) => d.dateKey === dateKey)
    if (idx >= 0) {
      setSelected(idx)
      setToast(note ?? 'Day selected')
      return
    }
    setState((s) => setStartDate(s, dateKey))
    setSelected(0)
    setToast(note ?? 'Plan window moved')
  }

  function onSettingsChange(settings: WorkoutSettings) {
    setState((s) => ({ ...s, settings }))
  }

  function onSettingsApplyRegenerate() {
    setState((s) => ({
      ...s,
      days: randomizeThreeDays(
        s.startDate,
        s.roster,
        s.statuses,
        s.settings,
      ),
    }))
    setSelected(0)
    setSettingsOpen(false)
    setToast('Settings applied · days re-rolled')
  }

  function onUpdateDetail(block: BlockKey, index: number, detail: string) {
    setState((s) => {
      const days = s.days.map((d, di) => {
        if (di !== selected) return d
        if (block === 'opener') {
          const opener = d.block1.opener.map((e, i) =>
            i === index ? { ...e, detail } : e,
          )
          return { ...d, block1: { ...d.block1, opener } }
        }
        if (block === 'locomotion') {
          const locomotion = d.block1.locomotion.map((e, i) =>
            i === index ? { ...e, detail } : e,
          )
          return { ...d, block1: { ...d.block1, locomotion } }
        }
        if (block === 'sprintPrep') {
          const sprintPrep = d.block1.sprintPrep.map((e, i) =>
            i === index ? { ...e, detail } : e,
          )
          return { ...d, block1: { ...d.block1, sprintPrep } }
        }
        if (block === 'main') {
          const items = d.block2.items.map((e, i) =>
            i === index ? { ...e, detail } : e,
          )
          return { ...d, block2: { ...d.block2, items } }
        }
        const items = d.block3.items.map((e, i) =>
          i === index ? { ...e, detail } : e,
        )
        return { ...d, block3: { ...d.block3, items } }
      })
      return { ...s, days }
    })
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
  const selectedDate = day?.dateKey ?? state.startDate
  const styleLabel =
    state.settings.style === 'hitt'
      ? 'HITT'
      : state.settings.style === 'strength'
        ? 'Strength'
        : state.settings.style === 'speed'
          ? 'Speed'
          : 'Combat'

  return (
    <div className="mx-auto min-h-dvh max-w-lg px-3 pb-10 pt-4">
      <header className="mb-4 flex items-start justify-between gap-2">
        <div className="text-center flex-1">
          <h1 className="text-3xl font-black tracking-tight">CREW PT</h1>
          <p className="text-xs font-semibold uppercase text-zinc-500">
            Phone-first · HITT-ready
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="min-h-12 shrink-0 rounded-2xl border border-zinc-600 bg-zinc-900 px-3 text-xs font-black uppercase active:scale-95"
        >
          Settings
          <div className="text-[9px] font-bold normal-case text-zinc-400">
            {styleLabel} · {state.settings.volume}
          </div>
        </button>
      </header>

      <div className="space-y-4">
        <DateControl
          selectedDate={selectedDate}
          onPickDate={() => setCalendarOpen(true)}
        />

        <DayStrip
          days={state.days}
          selected={selected}
          onSelect={setSelected}
        />

        <RollCall
          roster={state.roster}
          statuses={state.statuses}
          onCycle={cycleStatus}
          onEdit={() => setEditing(true)}
        />

        <Controls
          onRandomizeDay={randomizeSelected}
          onRandomizeAll={randomizeAll}
          onAdvance={onAdvance}
          onExport={onExport}
          onImport={onImport}
          startDate={state.startDate}
        />

        {day && (
          <DayView
            day={day}
            roster={state.roster}
            settings={state.settings}
            onUpdateDetail={onUpdateDetail}
          />
        )}
      </div>

      <CalendarMonth
        open={calendarOpen}
        selectedDate={selectedDate}
        startDate={state.startDate}
        onSelectDate={onSelectCalendarDate}
        onClose={() => setCalendarOpen(false)}
      />

      {editing && (
        <RosterEditor
          roster={state.roster}
          onSave={saveRoster}
          onClose={() => setEditing(false)}
        />
      )}

      {settingsOpen && (
        <SettingsPanel
          settings={state.settings}
          onChange={onSettingsChange}
          onClose={() => setSettingsOpen(false)}
          onApplyRegenerate={onSettingsApplyRegenerate}
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
