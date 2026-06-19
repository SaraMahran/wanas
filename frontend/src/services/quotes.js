import api from './api'

// Get a random quote, optionally filtered by mood ID
export const getRandomQuote = async (moodId = null) => {
  const url = moodId
    ? `/api/quotes/random/?mood=${moodId}`
    : '/api/quotes/random/'
  const res = await api.get(url)
  return res.data
}

// Get all moods from the database
export const getMoods = async () => {
  const res = await api.get('/api/quotes/moods/')
  return res.data
}