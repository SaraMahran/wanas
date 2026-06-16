import './QuoteCard.css'

export default function QuoteCard({ quote, dark }) {
  return (
    <article className={`quote-card ${dark ? 'dark' : ''}`}>
      <span className="quote-bg-mark">"</span>

      <blockquote className="quote-text">
        "{quote.text}"
      </blockquote>

      <footer className="quote-footer">
        <div className="quote-meta">
          <span className="quote-author">— {quote.author}</span>
          {quote.book && (
            <span className="quote-book">{quote.book}</span>
          )}
        </div>
      </footer>
    </article>
  )
}