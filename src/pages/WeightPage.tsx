import { useState, useEffect } from 'react'
import PageHeader from '../components/layout/PageHeader'
import WeightInput from '../components/weight/WeightInput'
import WeightChart from '../components/weight/WeightChart'
import CalorieInput from '../components/weight/CalorieInput'
import CalorieLog from '../components/weight/CalorieLog'
import FoodCamera from '../components/weight/FoodCamera'
import { getWeights, getCalories, saveCalorie } from '../services/storage'
import { v4 as uuid } from 'uuid'
import { today, now } from '../utils/date'
import type { WeightRecord, CalorieRecord } from '../types'

export default function WeightPage() {
  const [weights, setWeights] = useState<WeightRecord[]>([])
  const [calories, setCalories] = useState<CalorieRecord[]>([])
  const [tab, setTab] = useState<'manual' | 'camera'>('manual')

  const refresh = () => {
    setWeights(getWeights())
    setCalories(getCalories())
  }

  useEffect(() => { refresh() }, [])

  const handleFoodRecognized = (name: string, cal: number, imageUrl?: string) => {
    const record: CalorieRecord = {
      id: uuid(),
      date: today(),
      time: now(),
      meal: 'lunch',
      foodName: name,
      calories: cal,
      imageUrl,
    }
    saveCalorie(record)
    refresh()
  }

  return (
    <div className="max-w-lg mx-auto">
      <PageHeader title="减肥打卡" emoji="🍰" />

      <div className="p-4 pb-24 space-y-4">
        <WeightInput onSaved={refresh} />
        <WeightChart records={weights} />

        <div className="flex gap-2">
          <button
            onClick={() => setTab('manual')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              tab === 'manual' ? 'bg-pinky-200 text-white' : 'bg-pinky-50 text-gray-400'
            }`}
          >
            ✏️ 手动输入
          </button>
          <button
            onClick={() => setTab('camera')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              tab === 'camera' ? 'bg-pinky-200 text-white' : 'bg-pinky-50 text-gray-400'
            }`}
          >
            📸 拍照识别
          </button>
        </div>

        {tab === 'manual' ? (
          <CalorieInput onSaved={refresh} />
        ) : (
          <FoodCamera onFoodRecognized={handleFoodRecognized} />
        )}

        <CalorieLog records={calories} onUpdate={refresh} />
      </div>
    </div>
  )
}
