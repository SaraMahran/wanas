import { useState } from 'react'
import MoodSelector from '../../components/MoodSelector/MoodSelector'
import '../../components/QuoteCard/QuoteCard.css'
import './Home.css'

const PLACEHOLDER_QUOTES = [
  {
    text: "The most courageous act is still to think for yourself. Aloud.",
    author: "Coco Chanel",
    book: "Chanel and Her World"
  },
  {
    text: "Not all those who wander are lost.",
    author: "J.R.R. Tolkien",
    book: "The Fellowship of the Ring"
  },
  {
    text: "We accept the love we think we deserve.",
    author: "Stephen Chbosky",
    book: "The Perks of Being a Wallflower"
  },
  {
    text: "It is not in the stars to hold our destiny but in ourselves.",
    author: "William Shakespeare",
    book: "Julius Caesar"
  },
]

// Pick quotes with 8 words or fewer for floating animation
const SHORT_QUOTES = PLACEHOLDER_QUOTES
  .filter(q => q.text.split(' ').length <= 8)
  .map(q => q.text)

const FLOATING_WORDS = SHORT_QUOTES.length >= 5
  ? SHORT_QUOTES.slice(0, 5)
  : [
    'في البدء كان الكلام',
    'وكانت الكتب',
    'والقصص لا تنتهي',
    'كل كلمة عالم',
    'تعيش فيها',
  ]

export default function Home({ dark }) {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showMoods, setShowMoods] = useState(false)

  const getRandomQuote = () => {
    setLoading(true)
    setShowMoods(false)
    setTimeout(() => {
      const random = PLACEHOLDER_QUOTES[Math.floor(Math.random() * PLACEHOLDER_QUOTES.length)]
      setQuote(random)
      setLoading(false)
    }, 1200)
  }

  return (
    <main className={`home ${dark ? 'dark' : ''}`}>

      {/* Hero */}
      {!quote && !loading && (
        <section className="hero">
          <p className="hero-tagline">"فهي لم تكن تملك، في مقابلة عالم التفاهة الّذي يحيط بها، إلا سلاحاً واحداً: الكُتب!"</p>
          <p className="hero-author">— ميلان كونديرا</p>
          <p className="hero-sub">من مكتبتي، إليك</p>
          <button className="btn-discover" onClick={getRandomQuote}>
            اكتشف ونس
          </button>
        </section>
      )}

      {/* Loading */}
      {loading && (
        <section className="loading-section">

          {/* Words surrounding the book */}
          <div className="floating-words">
            {FLOATING_WORDS.map((w, i) => (
              <span key={i} className={`word w${i + 1}`}>{w}</span>
            ))}
          </div>

          <div className="book-wrapper">
            <svg width="360" height="260" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Left page — lighter warm tones */}
                <linearGradient id="lp" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   style={{stopColor:'#EEAF82'}}/>
                  <stop offset="40%"  style={{stopColor:'#F5C49A'}}/>
                  <stop offset="100%" style={{stopColor:'#FAD4A8'}}/>
                </linearGradient>
                {/* Right page — lighter warm tones */}
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

              {/* Shadow */}
              <ellipse cx="180" cy="252" rx="110" ry="7" fill="#000" opacity="0.35"/>

              {/* Page stack left */}
              <path d="M 30 200 L 175 215 L 175 220 L 30 205 Z" fill="url(#stack)" opacity="0.4"/>
              <path d="M 30 195 L 175 210 L 175 215 L 30 200 Z" fill="url(#stack)" opacity="0.3"/>
              <path d="M 30 190 L 175 205 L 175 210 L 30 195 Z" fill="url(#stack)" opacity="0.2"/>

              {/* Page stack right */}
              <path d="M 185 215 L 330 200 L 330 205 L 185 220 Z" fill="url(#stack)" opacity="0.4"/>
              <path d="M 185 210 L 330 195 L 330 200 L 185 215 Z" fill="url(#stack)" opacity="0.3"/>
              <path d="M 185 205 L 330 190 L 330 195 L 185 210 Z" fill="url(#stack)" opacity="0.2"/>

              {/* Left page */}
              <path d="M 180 28 C 150 32, 90 42, 30 62 L 30 205 C 90 188, 150 178, 180 182 Z" fill="url(#lp)"/>
              <path d="M 180 28 C 155 31, 100 40, 50 56 C 40 59, 33 62, 30 63 L 30 205 C 33 204, 40 201, 50 198 C 100 182, 155 173, 180 182 Z" fill="white" opacity="0.04"/>

              {/* Left page lines */}
              <line x1="42"  y1="85"  x2="170" y2="74"  stroke="#FAF6F0" strokeWidth="1.8" opacity="0.4"  strokeLinecap="round"/>
              <line x1="42"  y1="101" x2="170" y2="90"  stroke="#FAF6F0" strokeWidth="1.8" opacity="0.35" strokeLinecap="round"/>
              <line x1="42"  y1="117" x2="170" y2="106" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.3"  strokeLinecap="round"/>
              <line x1="42"  y1="133" x2="170" y2="122" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.25" strokeLinecap="round"/>
              <line x1="42"  y1="149" x2="170" y2="138" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.2"  strokeLinecap="round"/>
              <line x1="42"  y1="165" x2="150" y2="155" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.15" strokeLinecap="round"/>
              <line x1="42"  y1="181" x2="120" y2="172" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.1"  strokeLinecap="round"/>

              {/* Right page */}
              <path d="M 180 28 C 210 32, 270 42, 330 62 L 330 205 C 270 188, 210 178, 180 182 Z" fill="url(#rp)"/>

              {/* Right page lines */}
              <line x1="190" y1="74"  x2="318" y2="85"  stroke="#FAF6F0" strokeWidth="1.8" opacity="0.4"  strokeLinecap="round"/>
              <line x1="190" y1="90"  x2="318" y2="101" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.35" strokeLinecap="round"/>
              <line x1="190" y1="106" x2="318" y2="117" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.3"  strokeLinecap="round"/>
              <line x1="190" y1="122" x2="318" y2="133" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.25" strokeLinecap="round"/>
              <line x1="190" y1="138" x2="318" y2="149" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.2"  strokeLinecap="round"/>
              <line x1="190" y1="155" x2="298" y2="165" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.15" strokeLinecap="round"/>
              <line x1="190" y1="172" x2="268" y2="181" stroke="#FAF6F0" strokeWidth="1.8" opacity="0.1"  strokeLinecap="round"/>

              {/* Spine */}
              <path d="M 180 28 C 177 70, 177 140, 180 182 C 183 140, 183 70, 180 28 Z" fill="url(#spine)"/>

              {/* Top edge */}
              <path d="M 30 62 C 90 42, 150 32, 180 28 C 210 32, 270 42, 330 62" fill="none" stroke="#F5C49A" strokeWidth="2" opacity="0.7"/>

              {/* Bottom cover */}
              <path d="M 30 205 C 90 188, 150 178, 180 182 C 210 178, 270 188, 330 205 L 330 218 C 270 201, 210 191, 180 195 C 150 191, 90 201, 30 218 Z" fill="url(#covbot)" opacity="0.9"/>
            </svg>
          </div>

          <p className="loading-text">بندورلك...</p>
        </section>
      )}

      {/* Quote card */}
      {quote && !loading && (
        <section className="quote-section">
          <article className={`quote-card ${dark ? 'dark' : ''}`}>
            <span className="quote-bg-mark">"</span>
            <span className="quote-end-mark">"</span>
            <blockquote className="quote-text">
              {quote.text}
            </blockquote>
            <footer className="quote-footer">
              <div className="quote-meta">
                <span className="quote-author">— {quote.author}</span>
                {quote.book && <span className="quote-book">{quote.book}</span>}
              </div>
              <button className="btn-mood" onClick={() => setShowMoods(s => !s)}>
                حسب المود
              </button>
            </footer>
          </article>

          <button className="btn-secondary" onClick={getRandomQuote}>
            كمان واحدة
          </button>

          {showMoods && (
            <MoodSelector dark={dark} onSelect={() => {
              setShowMoods(false)
              getRandomQuote()
            }} />
          )}
        </section>
      )}

    </main>
  )
}