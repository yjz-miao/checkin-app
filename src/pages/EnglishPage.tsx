import { useState, useEffect } from 'react'
import PageHeader from '../components/layout/PageHeader'
import ProfileSwitch from '../components/english/ProfileSwitch'
import CalendarGrid from '../components/english/CalendarGrid'
import StudyInput from '../components/english/StudyInput'
import DayDetail from '../components/english/DayDetail'
import { getProfiles, getStudyRecords } from '../services/storage'
import type { StudyProfile, StudyRecord } from '../types'

export default function EnglishPage() {
  const [profiles, setProfiles] = useState<StudyProfile[]>([])
  const [activeProfile, setActiveProfile] = useState<string>('p1')
  const [records, setRecords] = useState<StudyRecord[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const refresh = () => {
    setProfiles(getProfiles())
    setRecords(getStudyRecords())
  }

  useEffect(() => { refresh() }, [])

  return (
    <div className="max-w-lg mx-auto">
      <PageHeader title="英语打卡" emoji="📚" />

      <div className="p-4 pb-24 space-y-4">
        <ProfileSwitch
          profiles={profiles}
          activeId={activeProfile}
          onChange={setActiveProfile}
        />

        <CalendarGrid
          records={records}
          profileId={activeProfile}
          onDayClick={setSelectedDate}
        />

        <StudyInput profileId={activeProfile} onSaved={refresh} />

        {/* Today summary */}
        {(() => {
          const todayStr = new Date().toISOString().slice(0, 10)
          const todayRecords = records.filter(
            r => r.date === todayStr && r.profileId === activeProfile
          )
          const totalMin = todayRecords.reduce((s, r) => s + r.duration, 0)
          const totalWords = todayRecords.reduce((s, r) => s + r.wordCount, 0)

          if (!totalMin && !totalWords) return null
          return (
            <div className="card bg-mint-50">
              <h3 className="text-lg font-bold text-mint-300 mb-2">📊 今日总结</h3>
              <div className="flex gap-4">
                <div>
                  <span className="text-2xl font-bold text-mint-300">{totalMin}</span>
                  <span className="text-sm text-gray-400 ml-1">分钟</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-mint-300">{totalWords}</span>
                  <span className="text-sm text-gray-400 ml-1">单词</span>
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {selectedDate && (
        <DayDetail
          date={selectedDate}
          records={records}
          onClose={() => setSelectedDate(null)}
          onUpdate={refresh}
        />
      )}
    </div>
  )
}
