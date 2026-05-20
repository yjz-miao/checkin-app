import type { CalorieRecord } from '../../types'
import { deleteCalorie } from '../../services/storage'

interface Props {
  records: CalorieRecord[]
  onUpdate: () => void
}

const mealLabels: Record<string, string> = {
  breakfast: '🌅 早餐',
  lunch: '☀️ 午餐',
  dinner: '🌙 晚餐',
  snack: '🍪 零食',
}

export default function CalorieLog({ records, onUpdate }: Props) {
  const todayRecords = records
    .filter(r => r.date === new Date().toISOString().slice(0, 10))
    .sort((a, b) => b.time.localeCompare(a.time))

  const totalCal = todayRecords.reduce((sum, r) => sum + r.calories, 0)

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-pinky-400">🍽️ 今日饮食</h3>
        <span className="text-sm font-bold text-pinky-300">
          共 {totalCal} kcal
        </span>
      </div>

      {todayRecords.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">还没有记录，来添加一顿吧~</p>
      )}

      <div className="space-y-2">
        {todayRecords.map(r => (
          <div key={r.id} className="flex items-center gap-3 bg-pinky-50 rounded-2xl p-3">
            <span className="text-sm whitespace-nowrap">{mealLabels[r.meal] || r.meal}</span>
            <span className="flex-1 text-sm truncate">{r.foodName}</span>
            <span className="text-sm font-bold text-pinky-400">{r.calories} kcal</span>
            <button
              onClick={() => { deleteCalorie(r.id); onUpdate() }}
              className="text-gray-300 hover:text-red-300 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
