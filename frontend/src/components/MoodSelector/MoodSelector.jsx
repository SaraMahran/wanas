import './MoodSelector.css'

const MOODS = [
  { emoji: '☀️', name: 'متفائل' },
  { emoji: '🌧', name: 'حزين شوية' },
  { emoji: '🌿', name: 'هادي' },
  { emoji: '🔥', name: 'متحمس' },
  { emoji: '🌙', name: 'في تأمل' },
  { emoji: '💛', name: 'ممتنن' },
]

export default function MoodSelector({ dark, onSelect }) {
  return (
    <div className={`mood-selector ${dark ? 'dark' : ''}`}>
      <p className="mood-title">حاسس بإيه دلوقت؟</p>
      <div className="mood-grid">
        {MOODS.map(mood => (
          <button
            key={mood.name}
            className="mood-btn"
            onClick={() => onSelect(mood)}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-name">{mood.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}