import { useCamera } from '../../hooks/useCamera'
import { useState } from 'react'

interface Props {
  onFoodRecognized: (name: string, calories: number, imageUrl?: string) => void
}

export default function FoodCamera({ onFoodRecognized }: Props) {
  const { videoRef, canvasRef, stream, error, capturedImage, startCamera, capture, retake } = useCamera()
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')

  const handleSubmit = () => {
    const cal = parseInt(calories)
    if (!foodName.trim() || !cal || cal < 1) return
    onFoodRecognized(foodName.trim(), cal, capturedImage || undefined)
    setFoodName('')
    setCalories('')
    retake()
  }

  const mealTemplates = [
    { name: '苹果', cal: '86' },
    { name: '鸡蛋', cal: '144' },
    { name: '米饭（一碗）', cal: '232' },
    { name: '鸡胸肉（100g）', cal: '133' },
    { name: '牛奶（250ml）', cal: '155' },
    { name: '面包（一片）', cal: '79' },
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-pinky-400 mb-3">📸 拍照记录食物</h3>

      {!stream && !capturedImage && (
        <div className="space-y-3">
          <button onClick={startCamera} className="btn-primary w-full text-center">
            📷 打开相机拍照
          </button>

          <div className="relative flex items-center gap-2">
            <div className="flex-1 border-t border-pinky-100" />
            <span className="text-xs text-gray-400">快速模板</span>
            <div className="flex-1 border-t border-pinky-100" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {mealTemplates.map(t => (
              <button
                key={t.name}
                onClick={() => { setFoodName(t.name); setCalories(t.cal) }}
                className="bg-pinky-50 rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-pinky-100 transition-all"
              >
                {t.name} <span className="text-pinky-300 font-bold">{t.cal}kcal</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-end">
            <input
              value={foodName}
              onChange={e => setFoodName(e.target.value)}
              placeholder="食物名称"
              className="input-cute text-sm flex-1"
            />
            <input
              type="number"
              value={calories}
              onChange={e => setCalories(e.target.value)}
              placeholder="热量"
              className="input-cute text-sm w-20"
            />
            <span className="text-gray-400 text-xs pb-3">kcal</span>
            <button onClick={handleSubmit} className="btn-primary text-sm px-4 py-3">
              记录
            </button>
          </div>
        </div>
      )}

      {stream && (
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-black">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl" />
          </div>
          <div className="flex gap-3">
            <button onClick={capture} className="btn-primary flex-1">📸 拍照</button>
            <button onClick={retake} className="btn-secondary flex-1">✕ 取消</button>
          </div>
        </div>
      )}

      {capturedImage && (
        <div className="space-y-3">
          <img src={capturedImage} alt="食物" className="w-full rounded-2xl" />
          <div className="flex gap-2 items-end">
            <input
              value={foodName}
              onChange={e => setFoodName(e.target.value)}
              placeholder="食物名称"
              className="input-cute text-sm flex-1"
            />
            <input
              type="number"
              value={calories}
              onChange={e => setCalories(e.target.value)}
              placeholder="热量"
              className="input-cute text-sm w-20"
            />
            <span className="text-gray-400 text-xs pb-3">kcal</span>
            <button onClick={handleSubmit} className="btn-primary text-sm px-4 py-3">
              记录
            </button>
          </div>
          <button onClick={retake} className="btn-secondary w-full text-sm">重拍</button>
        </div>
      )}

      {error && <p className="text-red-400 text-xs text-center">{error}</p>}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
