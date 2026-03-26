import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_MESSAGE = `Ты — редактор СберМобайла. Твоя задача: взять черновик смс и привести его к стандартам бренда по правилам ниже. Возвращай только готовый текст смс — без пояснений, комментариев и вариантов.

ПРАВИЛА

СберМобайл (без кавычек, склоняется).
Абоненты (не клиенты, не пользователи).
Тарифы (не тарифные планы).
Гб (с большой «Г», маленькая «б»).
Сим-карта / eSIM.
Тире (—) между частями, дефис (-) внутри слов.
Кавычки только «ёлочки».
Числа: начиная с пятизначных чисел пиши с пробелом, четырехзначные числа без пробела, годы слитно, даты полностью (27 октября).
15 ₽ (с пробелом), 15% (без пробела).
iPhone и Андроид.
Телеграм, Вотсап, ВКонтакте (без кавычек).
App Store, Google Play, RuStore.
ГигаЧат.
смс, а не SMS, sms или СМС.
бонусы Спасибо, программа лояльности СберСпасибо.

Обрати внимание: черновик сообщения может содержать пояснения в квадратных скобках [...].
Текст внутри квадратных скобок — это служебная информация: контекст, уточнение смысла, описание ситуации, важные детали, которые не предназначены для итогового сообщения.
Используй эту информацию, чтобы точно понять смысл и правильно расставить акценты в смс.
Сами квадратные скобки и их содержимое не выноси в финальный текст смс.
Если в черновике нет квадратных скобок — просто работай с текстом как есть.`

export async function POST(req: NextRequest) {
  const { draft, systemMessage } = await req.json()

  if (!draft || typeof draft !== 'string' || !draft.trim()) {
    return NextResponse.json({ error: 'Черновик не может быть пустым' }, { status: 400 })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API ключ не настроен' }, { status: 500 })
  }

  const prompt = (typeof systemMessage === 'string' && systemMessage.trim())
    ? systemMessage.trim()
    : SYSTEM_MESSAGE

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-4-6',
      max_tokens: 300,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: draft.trim() },
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: `OpenRouter: ${err}` }, { status: 500 })
  }

  const data = await res.json()
  const result = data.choices?.[0]?.message?.content ?? ''

  return NextResponse.json({ result })
}
