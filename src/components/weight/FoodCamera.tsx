import { useCamera } from '../../hooks/useCamera'
import { searchFood } from '../../services/foodApi'
import { useState } from 'react'

interface Props {
  onFoodRecognized: (name: string, calories: number) => void
}

export default function FoodCamera({ onFoodRecognized }: Props) {
  const { videoRef, canvasRef, stream, error, capturedImage, startCamera, capture, retake } = useCamera()
  const [foodQuery, setFoodQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleSearch = async () => {
    if (!foodQuery.trim()) return
    setSearching(true)
    setApiError('')
    try {
      const result = await searchFood(foodQuery.trim())
      if (result) {
        onFoodRecognized(result.name, result.calories)
        setFoodQuery('')
      } else {
        setApiError('没找到这个食物，换个说法试试？')
      }
    } catch (e: any) {
      setApiError(e.message || '识别失败')
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-pinky-400 mb-3">📸 识别食物热量</h3>

      {!stream && !capturedImage && (
        <div className="space-y-3">
          <button onClick={startCamera} className="btn-primary w-full text-center">
            📷 打开相机拍照
          </button>

          <div className="relative flex items-center gap-2">
            <div className="flex-1 border-t border-pinky-100" />
            <span className="text-xs text-gray-400">或者</span>
            <div className="flex-1 border-t border-pinky-100" />
          </div>

          <div className="flex gap-2">
            <input
              value={foodQuery}
              onChange={e => setFoodQuery(e.target.value)}
              placeholder="输入食物名称搜索"
              className="input-cute text-sm flex-1"
            />
            <button
              onClick={handleSearch}
              disabled={searching || !foodQuery.trim()}
              className="btn-primary text-sm px-4"
            >
              {searching ? '...' : '搜索'}
            </button>
          </div>

          {apiError && <p className="text-red-400 text-xs text-center">{apiError}</p>}
        </div>
      )}

      {/* Camera viewfinder */}
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

      {/* Captured preview */}
      {capturedImage && (
        <div className="space-y-3">
          <img src={capturedImage} alt="食物照片" className="w-full rounded-2xl" />
          <p className="text-gray-400 text-xs text-center">
            Nutritionix 暂不支持中文图片识别，请用下方搜索框输入食物名称查询热量 ⬇️
          </p>
          <div className="flex gap-2">
            <input
              value={foodQuery}
              onChange={e => setFoodQuery(e.target.value)}
              placeholder="输入食物名称，如：一个苹果"
              className="input-cute text-sm flex-1"
            />
            <button
              onClick={handleSearch}
              disabled={searching || !foodQuery.trim()}
              className="btn-primary text-sm px-4"
            >
              {searching ? '...' : '查询'}
            </button>
          </div>
          {apiError && <p className="text-red-400 text-xs text-center">{apiError}</p>}
          <button onClick={retake} className="btn-secondary w-full text-sm">重拍</button>
        </div>
      )}

      {error && <p className="text-red-400 text-xs text-center">{error}</p>}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
