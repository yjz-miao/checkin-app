import FeatureCard from '../components/home/FeatureCard'

export default function HomePage() {
  return (
    <div className="p-4 pt-8 pb-24 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-pinky-400 mb-2">
          ✨ 小打卡 ✨
        </h1>
        <p className="text-gray-400 text-sm">每天进步一点点 💪</p>
      </div>

      <div className="flex flex-col gap-4">
        <FeatureCard
          emoji="🍰"
          title="减肥打卡"
          subtitle="记录体重变化 · 识别食物热量"
          color="text-pinky-400"
          bgColor=""
          path="/weight"
        />
        <FeatureCard
          emoji="📚"
          title="英语打卡"
          subtitle="双人背单词 · 日历跟踪进度"
          color="text-mint-300"
          bgColor="bg-mint-100/50"
          path="/english"
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 text-xs">
          🌸 每一次坚持都值得被记录 🌸
        </p>
      </div>
    </div>
  )
}
