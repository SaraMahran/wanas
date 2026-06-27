

import { useState, useEffect } from 'react'
import MoodSelector from '../../components/MoodSelector/MoodSelector'
import '../../components/QuoteCard/QuoteCard.css'
import './Home.css'
import { getRandomQuote, getMoods } from '../../services/quotes'

const LOADING_PHRASES = [
  'ونيس يؤنس روحي في ليالى الصمت',
  'كتاب يعرف الطريق إلى قلبي',
  'كلمات من نور تدغدغ ظلمة الليل',
  'بين يديّ كتاب يحمل العالم كله إلي',
  'خيال يهوّن من قسوة الواقع',
]

export default function Home({ dark }) {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showMoods, setShowMoods] = useState(false)
  const [moods, setMoods] = useState([])
  const [lastQuoteId, setLastQuoteId] = useState(null)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phraseVisible, setPhraseVisible] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    getMoods().then(data => setMoods(data)).catch(() => {})
  }, [])

  useEffect(() => {
    if (!loading) return
    const cycle = setInterval(() => {
      setPhraseVisible(false)
      setTimeout(() => {
        setPhraseIndex(i => (i + 1) % LOADING_PHRASES.length)
        setPhraseVisible(true)
      }, 400)
    }, 2200)
    return () => clearInterval(cycle)
  }, [loading])

  const handleCopy = () => {
    if (!quote) return
    const attribution = quote.book
      ? `— ${quote.author}، ${quote.book}`
      : `— ${quote.author}`
    const text = `❝ ${quote.text} ❞\n\n${attribution}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const fetchQuote = async (moodId = null, retries = 3) => {
    setLoading(true)
    setPhraseVisible(true)
    setShowMoods(false)
    try {
      let data = await getRandomQuote(moodId)
      let attempts = 0
      while (data.id === lastQuoteId && attempts < retries) {
        data = await getRandomQuote(moodId)
        attempts++
      }
      setLastQuoteId(data.id)
      setQuote(data)
    } catch (err) {
      console.error('Failed to fetch quote', err)
    } finally {
      setLoading(false)
    }
  }

  const renderQuoteText = (text) => {
    const lines = text.split('\n')
    if (lines.length > 1) {
      return lines.map((line, i) => <span key={i}>{line}</span>)
    }
    if (text.includes(' -') || text.startsWith('-')) {
      return text.split(/(?= -)/).map((line, i) => <span key={i}>{line.trim()}</span>)
    }
    return text
  }

  return (
    <main className={`home ${dark ? 'dark' : ''}`}>

      {/* Hero */}
      {!quote && !loading && (
        <section className="hero">
          <p className="hero-tagline">"فهي لم تكن تملك، في مقابلة عالم التفاهة الّذي يحيط بها، إلا سلاحاً واحداً: الكُتب!"</p>
          <p className="hero-author">— ميلان كونديرا</p>
          <p className="hero-sub">من مكتبتي، إليك</p>
          <button className="btn-discover" onClick={() => fetchQuote()}>
            اكتشف ونس
          </button>
        </section>
      )}

      {/* Quote card */}
      {(quote || loading) && (
        <section className="quote-section">
          <article className={`quote-card ${dark ? 'dark' : ''}`}>

            <div className="quote-inner">
              <span className="quote-mark-open">"</span>

              {loading ? (
                <div className="quote-skeleton">
                  <p className={`loading-phrase ${phraseVisible ? 'visible' : ''}`}>
                    {LOADING_PHRASES[phraseIndex]}
                  </p>
                </div>
              ) : (
                <blockquote className="quote-text">
                  {renderQuoteText(quote.text)}
                </blockquote>
              )}

              <span className="quote-mark-close">"</span>
            </div>

            <footer className="quote-footer">
              {!loading && quote && (
                <>
                  <div className="quote-meta">
                    <span className="quote-author">— {quote.author}</span>
                    {quote.book && <span className="quote-book">{quote.book}</span>}
                  </div>
                  <button
                    className={`btn-copy${copied ? ' copied' : ''}`}
                    onClick={handleCopy}
                    title="نسخ"
                    aria-label="نسخ الاقتباس"
                  >
                    {copied ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    )}
                  </button>
                </>
              )}
            </footer>
          </article>

          {quote && (
            <div className="quote-actions">
              <button className="btn-secondary" onClick={() => fetchQuote()}>
                كمان واحدة
              </button>
              <button className="btn-mood" onClick={() => setShowMoods(s => !s)}>
                حسب المود
              </button>
            </div>
          )}

          {showMoods && !loading && (
            <MoodSelector
              dark={dark}
              moods={moods}
              onSelect={(mood) => {
                setShowMoods(false)
                fetchQuote(mood.id)
              }}
            />
          )}
        </section>
      )}

    </main>
  )
}