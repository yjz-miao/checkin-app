import { useState } from 'react'
import { today } from '../../utils/date'
import { saveWeight } from '../../services/storage'
import { v4 as uuid } from 'uuid'
import type { WeightRecord } from '../../types'

interface Props {
  onSaved: () => void
}

export default function WeightInput({ onSaved }: Props) {
  const [weight, setWeight] = useState('')

  const handleSubmit = () => {
    const w = parseFloat(weight)
    if (!w || w < 20 || w > 300) return
    const record: WeightRecord = {
      id: uuid(),
      date: today(),
      weight: Math.round(w * 10) / 10,
    }
    saveWeight(record)
    setWeight('')
    onSaved()
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-pinky-400 mb-3">📝 记录今日体重</h3>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="输入体重"
            step="0.1"
            min="20"
            max="300"
            className="input-cute text-center text-2xl font-bold text-pinky-400"
          />
          <span className="text-gray-400 text-xs mt-1 block text-center">单位：kg</span>
        </div>
        <button onClick={handleSubmit} className="btn-primary text-lg px-8">
          ✓
        </button>
      </div>
    </div>
  )
}
