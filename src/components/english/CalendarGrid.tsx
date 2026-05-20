import { useState } from 'react'
import { getMonthDays, getFirstDayOfMonth, getDayKey } from '../../utils/date'
import type { StudyRecord } from '../../types'

interface Props {
  records: StudyRecord[]
  profileId: string
  onDayClick: (date: string) => void
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export default function CalendarGrid({ records, profileId, onDayClick }: Props) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const todayKey = getDayKey(today.getFullYear(), today.getMonth(), today.getDate())

  const profileRecords = records.filter(r => r.profileId === profileId)
  const recordMap = new Map<string, StudyRecord>()
  profileRecords.forEach(r => recordMap.set(r.date, r))

  const daysInMonth = getMonthDays(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
  }

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="card">
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-pinky-300 text-xl px-2">◀</button>
        <h3 className="text-lg font-bold text-pinky-400">
          {viewYear}年{viewMonth + 1}月
        </h3>
        <button onClick={nextMonth} className="text-pinky-300 text-xl px-2">▶</button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map(w => (
          <div key={w} className="text-center text-xs text-gray-400 py-1">{w}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />

          const dateKey = getDayKey(viewYear, viewMonth, day)
          const hasRecord = recordMap.has(dateKey)
          const isToday = dateKey === todayKey
          const record = recordMap.get(dateKey)

          return (
            <button
              key={dateKey}
              onClick={() => onDayClick(dateKey)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all ${
                isToday
                  ? 'bg-pinky-300 text-white shadow-cute'
                  : hasRecord
                  ? 'bg-mint-100 text-mint-300 font-bold'
                  : 'hover:bg-pinky-50 text-gray-500'
              }`}
            >
              <span>{day}</span>
              {hasRecord && (
                <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isToday ? 'bg-white' : 'bg-mint-300'}`} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
