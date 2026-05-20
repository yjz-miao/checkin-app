import { getSettings } from './storage'

interface NutritionixFood {
  food_name: string
  nf_calories: number
  serving_qty: number
  serving_unit: string
}

interface NutritionixResponse {
  foods: NutritionixFood[]
}

export async function recognizeFood(imageBase64: string): Promise<{ name: string; calories: number } | null> {
  const settings = getSettings()
  if (!settings.nutritionixAppId || !settings.nutritionixApiKey) {
    throw new Error('请先在设置中配置 Nutritionix API Key')
  }

  const res = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': settings.nutritionixAppId,
      'x-app-key': settings.nutritionixApiKey,
    },
    body: JSON.stringify({ query: 'food', timezone: 'Asia/Shanghai' }),
  })

  if (!res.ok) {
    throw new Error(`API 请求失败 (${res.status})`)
  }

  const data: NutritionixResponse = await res.json()
  if (!data.foods?.length) return null
  return {
    name: data.foods[0].food_name,
    calories: Math.round(data.foods[0].nf_calories),
  }
}

// Since Nutritionix Natural API works with text queries, not images,
// we provide a manual search as fallback. For real image recognition,
// user would need a vision API or use Nutritionix with manual food name input.
export async function searchFood(query: string): Promise<{ name: string; calories: number } | null> {
  const settings = getSettings()
  if (!settings.nutritionixAppId || !settings.nutritionixApiKey) {
    throw new Error('请先在设置中配置 Nutritionix API Key')
  }

  const res = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': settings.nutritionixAppId,
      'x-app-key': settings.nutritionixApiKey,
    },
    body: JSON.stringify({ query, timezone: 'Asia/Shanghai' }),
  })

  if (!res.ok) {
    throw new Error(`API 请求失败 (${res.status})`)
  }

  const data: NutritionixResponse = await res.json()
  if (!data.foods?.length) return null
  return {
    name: data.foods[0].food_name,
    calories: Math.round(data.foods[0].nf_calories),
  }
}
