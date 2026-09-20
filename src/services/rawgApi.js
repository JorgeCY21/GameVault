const API_URL = 'https://api.rawg.io/api'
const apiKey = import.meta.env.VITE_RAWG_API_KEY

function requireApiKey() {
  if (!apiKey) {
    throw new Error('API_KEY_MISSING')
  }
}

async function request(endpoint, parameters = {}) {
  requireApiKey()

  const query = new URLSearchParams({ key: apiKey, ...parameters })
  const response = await fetch(`${API_URL}${endpoint}?${query}`)

  if (!response.ok) {
    throw new Error(`RAWG_ERROR_${response.status}`)
  }

  return response.json()
}

export async function getPopularGames() {
  const data = await request('/games', { ordering: '-added', page_size: 12 })
  return data.results || []
}

export async function searchGames(search) {
  const data = await request('/games', { search, search_precise: 'true', page_size: 12 })
  return data.results || []
}

export async function getGamesByGenre(genre) {
  const data = await request('/games', { genres: genre, ordering: '-added', page_size: 12 })
  return data.results || []
}

export async function getGameDetails(gameId) {
  return request(`/games/${encodeURIComponent(gameId)}`)
}

export async function getGameScreenshots(gameId) {
  const data = await request(`/games/${encodeURIComponent(gameId)}/screenshots`, { page_size: 6 })
  return data.results || []
}
