'use client'
import { useState } from 'react'
import Link from 'next/link'
import { quizQuestions, getQuizResult, type QuizResult } from '../../data/quiz'

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const question = quizQuestions[current]

  const handleSelect = (optionId: string) => {
    if (transitioning) return
    const newAnswers = { ...answers, [question.id]: optionId }
    setAnswers(newAnswers)
    setTransitioning(true)
    setTimeout(() => {
      if (current < quizQuestions.length - 1) {
        setCurrent((c) => c + 1)
        setTransitioning(false)
      } else {
        setResult(getQuizResult(newAnswers))
        setTransitioning(false)
      }
    }, 400)
  }

  const reset = () => {
    setCurrent(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    return (
      <div style={{ background: 'var(--ivory)', minHeight: '80dvh', padding: '40px 24px' }}>
        <div style={{ maxWidth: 420, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 10 }}>Tu resultado</p>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 30, color: 'var(--taupe)', marginBottom: 6, lineHeight: 1.2 }}>Tenemos una experiencia para ti.</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: 'var(--espresso)', marginBottom: 16, lineHeight: 1.1 }}>{result.title}</h2>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75, marginBottom: 32 }}>{result.description}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {result.packageId && (
              <Link href={`/reservar?t=${result.packageId}&name=${encodeURIComponent(result.subtitle)}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E07560', color: '#FEFCF8', padding: '15px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                Reservar esta experiencia
              </Link>
            )}
            <button onClick={reset} style={{ background: 'transparent', color: 'var(--taupe)', padding: '14px', borderRadius: 22, border: '1px solid rgba(140,122,107,0.25)', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Hacer el quiz de nuevo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--ivory)', minHeight: '80dvh' }}>

      {/* Progress */}
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
          {quizQuestions.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= current ? 'var(--espresso)' : 'rgba(140,122,107,0.2)', transition: 'background 0.3s' }} />
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>
          Pregunta {current + 1} de {quizQuestions.length}
        </p>
      </div>

      <div style={{ padding: '0 24px 40px', opacity: transitioning ? 0 : 1, transition: 'opacity 0.3s', transform: transitioning ? 'translateY(8px)' : 'none' }}>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: 'var(--espresso)', lineHeight: 1.2, marginBottom: 8 }}>{question.question}</h2>
        {question.subtitle && (
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 28 }}>{question.subtitle}</p>
        )}
        {!question.subtitle && <div style={{ marginBottom: 24 }} />}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {question.options.map((opt) => (
            <button key={opt.id} onClick={() => handleSelect(opt.id)} style={{ display: 'flex', alignItems: 'center', padding: '18px 18px', borderRadius: 14, border: '1px solid rgba(201,160,140,0.18)', background: answers[question.id] === opt.id ? 'rgba(201,160,140,0.1)' : 'rgba(237,230,217,0.35)', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.2s cubic-bezier(.22,1,.36,1)' }}>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 15, color: 'var(--espresso)', fontWeight: 400, lineHeight: 1.4 }}>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
