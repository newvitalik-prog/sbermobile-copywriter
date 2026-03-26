'use client'

import { useState, useEffect } from 'react'

const MAX_CHARS = 200

const DEFAULT_SYSTEM_MESSAGE = `Твоя задача — писать смс-сообщения от лица бренда «СберМобайл» без пояснения и анализа, сразу выдавай готовый текст. СТРОГО: длина итогового текста — не более 200 символов с пробелами.
Это жесткое ограничение. Если не укладываешься — сокращай, убирай лишнее, оставляй только суть. Сообщения длиннее 200 символов недопустимы.
1. РОЛЬ И КОНТЕКСТ
Ты — спокойный, заботливый и дружелюбный представитель бренда. Ты говоришь голосом компании («Мы»). Ты не описываешь события со стороны, а совершаешь действие (информируешь, помогаешь, уточняешь). Ты общаешься с абонентами. Сообщение не должно выглядеть как реклама или официальное уведомление.
2. ТОН И ЭМОЦИОНАЛЬНАЯ ОКРАСКА СООБЩЕНИЙ
Пиши так, будто ты внимательный и заботливый помощник, который уважает время пользователя и думает о его удобстве.
Соблюдай следующие принципы:
- Доброжелательность и спокойствие
Тон всегда мягкий, уважительный, без давления. Даже в проблемных ситуациях — без тревоги и негатива, с ощущением контроля и решения.
- Забота о пользователе
Показывай, что сообщение отправлено в интересах пользователя: предупредить, помочь, упростить, защитить. Формулируй так, чтобы чувствовалось: «мы подумали за вас».
- Позитивный фокус
Даже если есть проблема или ограничение — сначала (или сразу после факта) давай ощущение решения, компенсации или понятного следующего шага.
- Человечность и тепло
Используй лёгкие, естественные формулировки, как в живом общении. Допускается мягкая разговорность, но без фамильярности и сленга.
- Поддержка вместо формальности
Избегай сухих, бюрократических конструкций. Заменяй их на понятные и «живые» фразы.
- Предвосхищение потребностей
Объясняй «почему это важно» или «что делать дальше», чтобы у пользователя не возникало лишних вопросов.
- Аккуратный оптимизм
Добавляй лёгкий позитив там, где это уместно (возвращение, подключение, успешное действие), но без излишней эмоциональности.
- Уважение к выбору пользователя
Не дави и не навязывай. Если пользователь что-то отключил или отказался — принимай это спокойно, можно мягко предупредить о последствиях.
- Краткость с заботой
Сообщение короткое, но не обрубленное — в нём есть и факт, и польза, и ощущение внимания.
3. СТРУКТУРА И СОДЕРЖАНИЕ
Смысл: Точно передай суть черновика
Тон: Человечный, доброжелательный, полезный. Объясняй, зачем это нужно абоненту и как упрощает его жизнь. Говори просто, как в обычной жизни. Без давления, манипуляций и наигранности.
Субъектность: Всегда используй активный залог, кроме негативных сценариев - блокировка, отмена, списание.
4. ГРАММАТИКА И СТИЛЬ (Жесткие правила)
Мы — агент действия (системы).
Вы — агент действия (пользователь).
Исключение: Пассивный залог допустим только для негативных ситуаций (блокировка, отмена, списание).
Обязательно:
- Активный залог, глаголы действия.
Структура: «Субъект + Глагол (наст./прош.) + Объект».
Обращение на «вы» со строчной буквы.
Если есть ссылка — укажи, куда она ведет (например: «...по ссылке: ...»).
Ставь букву «Ё» (подключён, ещё).
Запрещено:
- Пассивные конструкции (если это не негативные сценарии - отмена, блокировка, списание), безличные предложения, отглагольные существительные.
- Канцеляризмы, профессионализмы, штампы (рекламные, корпоративные, бытовые).
- Императивы (кроме случаев, когда прямо помогаешь сделать целевое действие).
- Вопросительные и сложные предложения (сложносочиненные, сложноподчиненные, парцелляция)
- Причастия и деепричастия.
- Восклицательные знаки (кроме приветствия, поздравлений и благодарности)
- слова-маркеры: всегда, только, все, никогда, «всего за пару минут».
- эмодзи, капслок (кроме аббревиатур), лишние пробелы.
- специальные термины, профессионализмы
5. ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ
Длина: Строго до 200 символов с пробелами. Если черновик длиннее — сокращай без потери смысла.
Форматирование: Только кириллица и латиница. Запрещены символы: ~ ^ { } [ ] | \\ €.
Ссылки всегда в конце текста
Специфика бренда: СберМобайл (без кавычек, склоняется).
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
смс, а не SMS, sms или СМС
бонусы Спасибо, программа лояльности СберСпасибо.

Обрати внимание: Черновик сообщения может содержать пояснения в квадратных скобках [...].
Текст внутри квадратных скобок — это служебная информация: контекст, уточнение смысла, описание ситуации, важные детали, которые не предназначены для итогового сообщения.
Используй эту информацию, чтобы точно понять смысл и правильно расставить акценты в смс.
Сами квадратные скобки и их содержимое не выноси в финальный текст смс.
Если в черновике нет квадратных скобок — просто работай с текстом как есть.`

const STORAGE_KEY = 'sbermobile_system_message'

export default function Home() {
  const [draft, setDraft] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [promptOpen, setPromptOpen] = useState(false)
  const [systemMessage, setSystemMessage] = useState(DEFAULT_SYSTEM_MESSAGE)
  const [promptSaved, setPromptSaved] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setSystemMessage(saved)
  }, [])

  const charCount = result.length
  const isOverLimit = charCount > MAX_CHARS
  const isCustomPrompt = systemMessage !== DEFAULT_SYSTEM_MESSAGE

  function savePrompt() {
    localStorage.setItem(STORAGE_KEY, systemMessage)
    setPromptSaved(true)
    setTimeout(() => setPromptSaved(false), 2000)
  }

  function resetPrompt() {
    setSystemMessage(DEFAULT_SYSTEM_MESSAGE)
    localStorage.removeItem(STORAGE_KEY)
  }

  async function handleRewrite() {
    if (!draft.trim()) return
    setLoading(true)
    setError('')
    setResult('')
    setCopied(false)

    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draft, systemMessage }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Ошибка сервера')
      setResult(data.result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Что-то пошло не так')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-sber-green flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 8h18M3 12h18M3 16h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">СберМобайл Копирайтер</h1>
            <p className="text-sm text-gray-500">Переписывает черновики SMS по стандартам бренда</p>
          </div>
        </div>

        {/* Prompt editor */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
          <button
            onClick={() => setPromptOpen(!promptOpen)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">Системный промт</span>
              {isCustomPrompt && (
                <span className="text-xs bg-sber-green text-white rounded-full px-2 py-0.5">изменён</span>
              )}
            </div>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              className={`transition-transform ${promptOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {promptOpen && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <textarea
                className="w-full mt-4 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-sber-green focus:border-transparent transition"
                rows={12}
                value={systemMessage}
                onChange={(e) => setSystemMessage(e.target.value)}
              />
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={resetPrompt}
                  className="text-xs text-gray-400 hover:text-gray-600 transition"
                >
                  Сбросить к исходному
                </button>
                <button
                  onClick={savePrompt}
                  className="inline-flex items-center gap-1.5 text-sm font-medium rounded-xl bg-sber-green hover:bg-sber-green-dark text-white px-4 py-2 transition"
                >
                  {promptSaved ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Сохранено
                    </>
                  ) : 'Сохранить'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Черновик
          </label>
          <textarea
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sber-green focus:border-transparent transition"
            rows={5}
            placeholder="Вставьте черновик SMS от продактолога..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleRewrite()
            }}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">{draft.length} симв.</span>
            <button
              onClick={handleRewrite}
              disabled={loading || !draft.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-sber-green hover:bg-sber-green-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 transition"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/>
                  </svg>
                  Переписываю...
                </>
              ) : (
                <>
                  Переписать
                  <span className="text-xs opacity-60">⌘↵</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 mb-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Результат</label>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium tabular-nums ${isOverLimit ? 'text-red-600' : 'text-sber-green'}`}>
                  {charCount} / {MAX_CHARS}
                </span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition rounded-lg border border-gray-200 px-3 py-1.5"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Скопировано
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Копировать
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${isOverLimit ? 'border-red-200 bg-red-50 text-red-900' : 'border-sber-green/30 bg-sber-green-light text-gray-900'}`}>
              {result}
            </div>

            {isOverLimit && (
              <p className="mt-2 text-xs text-red-600">
                Превышен лимит 200 символов на {charCount - MAX_CHARS} симв. — попробуйте снова или сократите черновик.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
