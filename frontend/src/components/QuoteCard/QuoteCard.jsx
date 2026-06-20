import { useState, useEffect } from 'react'
import MoodSelector from '../../components/MoodSelector/MoodSelector'
import '../../components/QuoteCard/QuoteCard.css'
import './Home.css'
import { getRandomQuote, getMoods } from '../../services/quotes'

export default function Home({ dark }) {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showMoods, setShowMoods] = useState(false)
  const [moods, setMoods] = useState([])
  const [lastQuoteId, setLastQuoteId] = useState(null)

  useEffect(() => {
    getMoods().then(data => setMoods(data)).catch(() => {})
  }, [])

  const fetchQuote = async (moodId = null, retries = 3) => {
    setLoading(true)
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
                  <div className="skeleton-line skeleton-line-long" />
                  <div className="skeleton-line skeleton-line-medium" />
                  <div className="skeleton-line skeleton-line-short" />
                </div>
              ) : (
                <blockquote className="quote-text">
                  {renderQuoteText(quote.text)}
                </blockquote>
              )}

              <span className="quote-mark-close">"</span>
            </div>

            <footer className="quote-footer">
              {loading ? (
                <div className="quote-meta">
                  <div className="skeleton-line skeleton-line-author" />
                </div>
              ) : (
                <div className="quote-meta">
                  <span className="quote-author">— {quote.author}</span>
                  {quote.book && <span className="quote-book">{quote.book}</span>}
                </div>
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