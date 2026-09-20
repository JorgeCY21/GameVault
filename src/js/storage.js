const STORAGE_KEY = 'gamevault-library'
const VALID_STATUSES = ['wishlist', 'playing', 'completed', 'completed-100']

function readLibrary() {
  try {
    const savedLibrary = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(savedLibrary)) return []
    return savedLibrary.filter((game) => game && game.gameId && typeof game.name === 'string')
  } catch {
    return []
  }
}

function saveLibrary(library) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(library))
}

function prepareGame(game, status) {
  const now = new Date().toISOString()
  return {
    gameId: game.id,
    name: game.name,
    image: game.background_image || '',
    genres: (game.genres || []).map((genre) => genre.name),
    platforms: (game.platforms || []).map(({ platform }) => platform.name),
    released: game.released || '',
    rawgRating: Number(game.rating || 0),
    metacritic: game.metacritic ?? null,
    status,
    progress: 0,
    hours: 0,
    personalRating: null,
    notes: '',
    addedAt: now,
    updatedAt: now,
  }
}

export function getLibrary() {
  return readLibrary()
}

export function getGame(gameId) {
  return readLibrary().find((game) => String(game.gameId) === String(gameId)) || null
}

export function addGame(game, status = 'wishlist') {
  if (!game?.id || !VALID_STATUSES.includes(status)) {
    throw new Error('INVALID_GAME')
  }

  const library = readLibrary()
  if (library.some((item) => String(item.gameId) === String(game.id))) {
    return { added: false, game: getGame(game.id) }
  }

  const newGame = prepareGame(game, status)
  library.unshift(newGame)
  saveLibrary(library)
  return { added: true, game: newGame }
}

export function updateGame(gameId, changes) {
  const library = readLibrary()
  const index = library.findIndex((game) => String(game.gameId) === String(gameId))

  if (index === -1) return null

  library[index] = { ...library[index], ...changes, gameId: library[index].gameId, updatedAt: new Date().toISOString() }
  saveLibrary(library)
  return library[index]
}

export function removeGame(gameId) {
  const library = readLibrary()
  const updatedLibrary = library.filter((game) => String(game.gameId) !== String(gameId))

  if (updatedLibrary.length === library.length) return false

  saveLibrary(updatedLibrary)
  return true
}

export function changeStatus(gameId, status) {
  if (!VALID_STATUSES.includes(status)) return null
  return updateGame(gameId, { status })
}
