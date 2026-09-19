import type { EquipmentToggles, VolumeLevel, WorkoutSettings, WorkoutStyle } from '../types'
import {
  STYLE_OPTIONS,
  VOLUME_OPTIONS,
} from '../lib/settings'

interface Props {
  settings: WorkoutSettings
  onChange: (next: WorkoutSettings) => void
  onClose: () => void
  onApplyRegenerate: () => void
}

function Stepper({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  unit: string
  min: number
  max: number
  step: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-zinc-950 px-3 py-2">
      <div className="min-w-0">
        <div className="text-sm font-black">{label}</div>
        <div className="text-xs font-bold text-zinc-400">
          {value}
          {unit}
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          className="min-h-12 min-w-12 rounded-xl bg-zinc-700 text-xl font-black active:scale-95"
          onClick={() => onChange(Math.max(min, value - step))}
        >
          −
        </button>
        <button
          type="button"
          className="min-h-12 min-w-12 rounded-xl bg-zinc-700 text-xl font-black active:scale-95"
          onClick={() => onChange(Math.min(max, value + step))}
        >
          +
        </button>
      </div>
    </div>
  )
}

const EQUIP_LABELS: { key: keyof EquipmentToggles; label: string }[] = [
  { key: 'barbell', label: 'Barbell' },
  { key: 'ammoCan', label: 'Ammo can' },
  { key: 'sandbag', label: 'Sandbag' },
  { key: 'kettlebell', label: 'KB / Goblet' },
  { key: 'track', label: 'Track / flies' },
]

export function SettingsPanel({
  settings,
  onChange,
  onClose,
  onApplyRegenerate,
}: Props) {
  function patch(p: Partial<WorkoutSettings>) {
    onChange({ ...settings, ...p })
  }

  function patchEquip(key: keyof EquipmentToggles) {
    onChange({
      ...settings,
      equipment: { ...settings.equipment, [key]: !settings.equipment[key] },
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 sm:items-center">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-xl font-black">SETTINGS</h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-xl bg-zinc-700 px-4 font-bold"
          >
            Close
          </button>
        </div>

        <section className="mb-4 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wide text-emerald-400">
            Style
          </h3>
          <p className="text-[11px] text-zinc-500">
            Calendar stays Mon–Fri HITT; style biases pack picks.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {STYLE_OPTIONS.map((o) => {
              const on = settings.style === o.id
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => patch({ style: o.id as WorkoutStyle })}
                  className={`min-h-16 rounded-2xl border px-2 py-2 text-left active:scale-95 ${
                    on
                      ? 'border-emerald-500 bg-emerald-900/50'
                      : 'border-zinc-700 bg-zinc-950'
                  }`}
                >
                  <div className="text-sm font-black leading-tight">{o.label}</div>
                  <div className="mt-0.5 text-[10px] text-zinc-400">{o.hint}</div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mb-4 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wide text-emerald-400">
            Timing
          </h3>
          <Stepper
            label="Block 1 · Warm-up"
            value={settings.block1Min}
            unit=" min"
            min={5}
            max={30}
            step={1}
            onChange={(n) => patch({ block1Min: n })}
          />
          <Stepper
            label="Block 2 · Main"
            value={settings.block2Min}
            unit=" min"
            min={10}
            max={60}
            step={5}
            onChange={(n) => patch({ block2Min: n })}
          />
          <Stepper
            label="Block 3 · Cool-down"
            value={settings.block3Min}
            unit=" min"
            min={5}
            max={20}
            step={1}
            onChange={(n) => patch({ block3Min: n })}
          />
          <Stepper
            label="Circuit work"
            value={settings.workSec}
            unit="s"
            min={10}
            max={90}
            step={5}
            onChange={(n) => patch({ workSec: n })}
          />
          <Stepper
            label="Circuit rest"
            value={settings.restSec}
            unit="s"
            min={5}
            max={90}
            step={5}
            onChange={(n) => patch({ restSec: n })}
          />
        </section>

        <section className="mb-4 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wide text-emerald-400">
            Volume
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {VOLUME_OPTIONS.map((o) => {
              const on = settings.volume === o.id
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => patch({ volume: o.id as VolumeLevel })}
                  className={`min-h-16 rounded-2xl border px-1 py-2 text-center active:scale-95 ${
                    on
                      ? 'border-amber-500 bg-amber-900/40'
                      : 'border-zinc-700 bg-zinc-950'
                  }`}
                >
                  <div className="text-xs font-black leading-tight">{o.label}</div>
                  <div className="mt-1 text-[10px] text-zinc-400">×{o.mult}</div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mb-4 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wide text-emerald-400">
            Other
          </h3>
          <Stepper
            label="Rest between sets"
            value={settings.restDefaultSec}
            unit="s"
            min={15}
            max={180}
            step={15}
            onChange={(n) => patch({ restDefaultSec: n })}
          />
          <Stepper
            label="RPE target"
            value={settings.rpeTarget}
            unit=""
            min={6}
            max={8}
            step={1}
            onChange={(n) => patch({ rpeTarget: n })}
          />
          <div className="grid grid-cols-2 gap-2 pt-1">
            {EQUIP_LABELS.map(({ key, label }) => {
              const on = settings.equipment[key]
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => patchEquip(key)}
                  className={`min-h-14 rounded-2xl border text-sm font-black active:scale-95 ${
                    on
                      ? 'border-sky-500 bg-sky-900/40 text-sky-100'
                      : 'border-zinc-700 bg-zinc-950 text-zinc-500 line-through'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </section>

        <button
          type="button"
          onClick={onApplyRegenerate}
          className="mb-2 flex min-h-14 w-full items-center justify-center rounded-2xl bg-emerald-500 text-base font-black uppercase tracking-wide text-zinc-950 active:scale-[0.98]"
        >
          Save & re-roll 3 days
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-zinc-700 text-sm font-bold uppercase"
        >
          Save (keep current days)
        </button>
      </div>
    </div>
  )
}
