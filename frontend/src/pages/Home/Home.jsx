import { useState, useEffect } from 'react'
import MoodSelector from '../../components/MoodSelector/MoodSelector'
import '../../components/QuoteCard/QuoteCard.css'
import './Home.css'
import { getRandomQuote, getMoods } from '../../services/quotes'

const FLOATING_WORDS = [
  'ونيس يؤنس روحي في ليالى الصمت',
  'كتاب يعرف الطريق إلى قلبي',
  'كلمات من نور تدغدغ ظلمة الليل',
  'بين يديّ كتاب يحمل العالم كله إلي',
  'خيال يهوّن من قسوة الواقع',
]

const pickDisplayWords = () => [...FLOATING_WORDS]

export default function Home({ dark }) {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showMoods, setShowMoods] = useState(false)
  const [moods, setMoods] = useState([])
  const [displayWords, setDisplayWords] = useState(FLOATING_WORDS.slice(0, 5))

  useEffect(() => {
    getMoods().then(data => setMoods(data)).catch(() => {})
  }, [])

  const fetchQuote = async (moodId = null) => {
    setDisplayWords(pickDisplayWords())
    setLoading(true)
    setShowMoods(false)
    try {
      const data = await getRandomQuote(moodId)
      setQuote(data)
    } catch (err) {
      console.error('Failed to fetch quote', err)
    } finally {
      setLoading(false)
    }
  }

  // Splits dialog lines starting with - onto new lines
  const renderQuoteText = (text) => {
    const lines = text.split('\n')
    if (lines.length > 1) {
      return lines.map((line, i) => (
        <span key={i} style={{ display: 'block', marginBottom: '0.3rem' }}>
          {line}
        </span>
      ))
    }
    if (text.includes(' -') || text.startsWith('-')) {
      return text.split(/(?= -)/).map((line, i) => (
        <span key={i} style={{ display: 'block', marginBottom: '0.3rem' }}>
          {line.trim()}
        </span>
      ))
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

      {/* Loading */}
      {loading && (
        <section className="loading-section">
          <p className="word-top">{displayWords[0]}</p>
          <div className="loading-middle-row">
            <p className="word-side word-left">{displayWords[1]}</p>
            <div className="book-wrapper">
              <svg width="360" height="260" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lp" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   style={{stopColor:'#EEAF82'}}/>
                    <stop offset="40%"  style={{stopColor:'#F5C49A'}}/>
                    <stop offset="100%" style={{stopColor:'#FAD4A8'}}/>
                  </linearGradient>
                  <linearGradient id="rp" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   style={{stopColor:'#FAD4A8'}}/>
                    <stop offset="60%"  style={{stopColor:'#F5C49A'}}/>
                    <stop offset="100%" style={{stopColor:'#EEAF82'}}/>
                  </linearGradient>
                  <linearGradient id="stack" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   style={{stopColor:'#FAF6F0', stopOpacity:0.9}}/>
                    <stop offset="100%" style={{stopColor:'#E8DDD4', stopOpacity:0.6}}/>
                  </linearGradient>
                  <linearGradient id="spine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   style={{stopColor:'#8B5E3C'}}/>
                    <stop offset="50%"  style={{stopColor:'#C4845A'}}/>
                    <stop offset="100%" style={{stopColor:'#8B5E3C'}}/>
                  </linearGradient>
                  <linearGradient id="covbot" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   style={{stopColor:'#A36840'}}/>
                    <stop offset="100%" style={{stopColor:'#7A4E2E'}}/>
                  </linearGradient>
                </defs>

                <ellipse cx="180" cy="252" rx="110" ry="7" fill="#000" opacity="0.35"/>
                <path d="M 30 200 L 175 215 L 175 220 L 30 205 Z" fill="url(#stack)" opacity="0.4"/>
                <path d="M 30 195 L 175 210 L 175 215 L 30 200 Z" fill="url(#stack)" opacity="0.3"/>
                <path d="M 30 190 L 175 205 L 175 210 L 30 195 Z" fill="url(#stack)" opacity="0.2"/>
                <path d="M 185 215 L 330 200 L 330 205 L 185 220 Z" fill="url(#stack)" opacity="0.4"/>
                <path d="M 185 210 L 330 195 L 330 200 L 185 215 Z" fill="url(#stack)" opacity="0.3"/>
                <path d="M 185 205 L 330 190 L 330 195 L 185 210 Z" fill="url(#stack)" opacity="0.2"/>
                <path d="M 180 28 C 150 32, 90 42, 30 62 L 30 205 C 90 188, 150 178, 180 182 Z" fill="url(#lp)"/>
                <path d="M 180 28 C 155 31, 100 40, 50 56 C 40 59, 33 62, 30 63 L 30 205 C 33 204, 40 201, 50 198 C 100 182, 155 173, 180 182 Z" fill="white" opacity="0.04"/>
                <line x1="42"  y1="85"  x2="170" y2="74"  stroke="#FAF6F0" strokeWidth="1.8" opacity="0.4"  strokeLinecap="round"/>
                <line x1="42"  y1="101" x2="170" y2="90"  stroke="#FAF6F0" strokeWidth="1.8" opacity="0.35" strokeLinecap="round"/>
                <line x1="42"  y1="117" x2="170" y2="106" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.3"  strokeLinecap="round"/>
                <line x1="42"  y1="133" x2="170" y2="122" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.25" strokeLinecap="round"/>
                <line x1="42"  y1="149" x2="170" y2="138" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.2"  strokeLinecap="round"/>
                <line x1="42"  y1="165" x2="150" y2="155" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.15" strokeLinecap="round"/>
                <line x1="42"  y1="181" x2="120" y2="172" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.1"  strokeLinecap="round"/>
                <path d="M 180 28 C 210 32, 270 42, 330 62 L 330 205 C 270 188, 210 178, 180 182 Z" fill="url(#rp)"/>
                <line x1="190" y1="74"  x2="318" y2="85"  stroke="#FAF6F0" strokeWidth="1.8" opacity="0.4"  strokeLinecap="round"/>
                <line x1="190" y1="90"  x2="318" y2="101" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.35" strokeLinecap="round"/>
                <line x1="190" y1="106" x2="318" y2="117" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.3"  strokeLinecap="round"/>
                <line x1="190" y1="122" x2="318" y2="133" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.25" strokeLinecap="round"/>
                <line x1="190" y1="138" x2="318" y2="149" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.2"  strokeLinecap="round"/>
                <line x1="190" y1="155" x2="298" y2="165" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.15" strokeLinecap="round"/>
                <line x1="190" y1="172" x2="268" y2="181" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.1"  strokeLinecap="round"/>
                <path d="M 180 28 C 177 70, 177 140, 180 182 C 183 140, 183 70, 180 28 Z" fill="url(#spine)"/>
                <path d="M 30 62 C 90 42, 150 32, 180 28 C 210 32, 270 42, 330 62" fill="none" stroke="#F5C49A" strokeWidth="2" opacity="0.7"/>
                <path d="M 30 205 C 90 188, 150 178, 180 182 C 210 178, 270 188, 330 205 L 330 218 C 270 201, 210 191, 180 195 C 150 191, 90 201, 30 218 Z" fill="url(#covbot)" opacity="0.9"/>
              </svg>
            </div>
            <p className="word-side word-right">{displayWords[2]}</p>
          </div>
          <p className="word-bottom">{displayWords[3]}</p>
          <p className="loading-text">بندورلك...</p>
        </section>
      )}

      {/* Quote card */}
      {quote && !loading && (
        <section className="quote-section">
          <article className={`quote-card ${dark ? 'dark' : ''}`}>
            <span className="quote-bg-mark">"</span>
            <blockquote className="quote-text">
              {renderQuoteText(quote.text)}
            </blockquote>
            <footer className="quote-footer">
              <button className="btn-mood" onClick={() => setShowMoods(s => !s)}>
                حسب المود
              </button>
              <div className="quote-meta">
                <span className="quote-author">— {quote.author}</span>
                {quote.book && <span className="quote-book">{quote.book}</span>}
              </div>
            </footer>
            <span className="quote-end-mark">"</span>
          </article>

          <button className="btn-secondary" onClick={() => fetchQuote()}>
            كمان واحدة
          </button>

          {showMoods && (
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