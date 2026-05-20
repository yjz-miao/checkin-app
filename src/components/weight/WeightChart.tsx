import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { WeightRecord } from '../../types'

interface Props {
  records: WeightRecord[]
}

export default function WeightChart({ records }: Props) {
  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date))
  const data = sorted.slice(-14).map(r => ({
    date: r.date.slice(5),
    weight: r.weight,
  }))

  if (!data.length) return null

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-pinky-400 mb-3">📈 体重趋势</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#FFE3E3" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
          <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: '1rem', border: '2px solid #FFC0CB', boxShadow: '0 4px 20px rgba(255,182,193,0.25)' }}
            labelStyle={{ color: '#FFB6C1' }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#FFB6C1"
            strokeWidth={3}
            dot={{ fill: '#FFB6C1', stroke: '#fff', strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: '#FF6B81' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
