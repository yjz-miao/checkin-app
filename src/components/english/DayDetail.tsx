import type { StudyRecord } from '../../types'
import { formatDate } from '../../utils/date'
import { deleteStudyRecord } from '../../services/storage'

interface Props {
  date: string
  records: StudyRecord[]
  onClose: () => void
  onUpdate: () => void
}

export default function DayDetail({ date, records, onClose, onUpdate }: Props) {
  const dayRecords = records.filter(r => r.date === date)

  const handleDelete = (id: string) => {
    deleteStudyRecord(id)
    onUpdate()
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl p-6 w-full max-w-lg animate-[slideUp_0.3s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        <h3 className="text-xl font-bold text-pinky-400 text-center mb-4">
          📅 {formatDate(date)}
        </h3>

        {dayRecords.length === 0 && (
          <p className="text-gray-400 text-center py-6">这天还没有记录哦~</p>
        )}

        <div className="space-y-2 mb-4">
          {dayRecords.map(r => (
            <div key={r.id} className="flex items-center gap-3 bg-pinky-50 rounded-2xl p-3">
              <span className="text-pinky-300 font-bold">{r.duration}分钟</span>
              <span className="flex-1 text-sm text-gray-500">{r.wordCount} 个单词</span>
              <button
                onClick={() => handleDelete(r.id)}
                className="text-gray-300 hover:text-red-300 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn-secondary w-full">
          关闭
        </button>
      </div>
    </div>
  )
}
