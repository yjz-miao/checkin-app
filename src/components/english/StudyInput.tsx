import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { today } from '../../utils/date'
import { saveStudyRecord } from '../../services/storage'

interface Props {
  profileId: string
  onSaved: () => void
}

export default function StudyInput({ profileId, onSaved }: Props) {
  const [duration, setDuration] = useState('')
  const [wordCount, setWordCount] = useState('')

  const handleSubmit = () => {
    const d = parseInt(duration)
    const w = parseInt(wordCount)
    if (!d || !w || d < 1 || w < 1) return
    saveStudyRecord({
      id: uuid(),
      date: today(),
      profileId,
      duration: d,
      wordCount: w,
    })
    setDuration('')
    setWordCount('')
    onSaved()
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-pinky-400 mb-3">✏️ 记录今日学习</h3>
      <div className="flex gap-2 items-end flex-wrap">
        <div className="flex-1 min-w-[80px]">
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            placeholder="时长"
            className="input-cute text-center"
          />
          <span className="text-gray-400 text-xs mt-1 block text-center">分钟</span>
        </div>
        <div className="flex-1 min-w-[80px]">
          <input
            type="number"
            value={wordCount}
            onChange={e => setWordCount(e.target.value)}
            placeholder="单词数"
            className="input-cute text-center"
          />
          <span className="text-gray-400 text-xs mt-1 block text-center">个单词</span>
        </div>
        <button onClick={handleSubmit} className="btn-primary">
          打卡 ✓
        </button>
      </div>
    </div>
  )
}
