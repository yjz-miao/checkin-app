import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { today, now } from '../../utils/date'
import { saveCalorie } from '../../services/storage'
import type { CalorieRecord } from '../../types'

interface Props {
  onSaved: () => void
}

const meals = [
  { key: 'breakfast', label: '🌅 早餐' },
  { key: 'lunch', label: '☀️ 午餐' },
  { key: 'dinner', label: '🌙 晚餐' },
  { key: 'snack', label: '🍪 零食' },
] as const

export default function CalorieInput({ onSaved }: Props) {
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [meal, setMeal] = useState<CalorieRecord['meal']>('lunch')

  const handleSubmit = () => {
    const cal = parseInt(calories)
    if (!foodName.trim() || !cal || cal < 0) return
    const record: CalorieRecord = {
      id: uuid(),
      date: today(),
      time: now(),
      meal,
      foodName: foodName.trim(),
      calories: cal,
    }
    saveCalorie(record)
    setFoodName('')
    setCalories('')
    onSaved()
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-pinky-400 mb-3">➕ 添加食物</h3>

      <div className="flex gap-2 mb-3 flex-wrap">
        {meals.map(m => (
          <button
            key={m.key}
            onClick={() => setMeal(m.key)}
            className={`px-3 py-1.5 rounded-xl text-sm transition-all ${
              meal === m.key
                ? 'bg-pinky-200 text-white font-bold'
                : 'bg-pinky-50 text-gray-500'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <input
            value={foodName}
            onChange={e => setFoodName(e.target.value)}
            placeholder="食物名称"
            className="input-cute text-sm"
          />
        </div>
        <div className="w-24">
          <input
            type="number"
            value={calories}
            onChange={e => setCalories(e.target.value)}
            placeholder="热量"
            className="input-cute text-sm"
          />
        </div>
        <span className="text-gray-400 text-xs pb-3">kcal</span>
        <button onClick={handleSubmit} className="btn-primary text-sm px-4 py-3">
          添加
        </button>
      </div>
    </div>
  )
}
