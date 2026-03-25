'use client'

import { useState } from 'react'

const MAX_CHARS = 200

export default function Home() {
  const [draft, setDraft] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const charCount = result.length
  const isOverLimit = charCount > MAX_CHARS

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
        body: JSON.stringify({ draft }),
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
