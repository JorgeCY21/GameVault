import { getAchievementSummary } from './achievements.js'
import { getLibrary } from './storage.js'

function getGenreData(games) {
  const counts = {}

  games.forEach((game) => {
    ;(game.genres || []).forEach((genre) => {
      counts[genre] = (counts[genre] || 0) + 1
    })
  })

  const entries = Object.entries(counts).sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0]))
  const total = entries.reduce((sum, [, count]) => sum + count, 0)

  return {
    favoriteGenre: entries[0]?.[0] || 'Sin datos',
    distribution: entries.slice(0, 5).map(([name, count]) => ({ name, count, percentage: Math.round((count / total) * 100) })),
  }
}

export function getStats() {
  const games = getLibrary()
  const wishlist = games.filter((game) => game.status === 'wishlist').length
  const playing = games.filter((game) => game.status === 'playing').length
  const completed = games.filter((game) => game.status === 'completed').length
  const completed100 = games.filter((game) => game.status === 'completed-100').length
  const totalHours = games.reduce((total, game) => total + (Number(game.hours) || 0), 0)
  const ratedGames = games.filter((game) => Number.isFinite(game.personalRating) && game.personalRating >= 1)
  const averageRating = ratedGames.length
    ? ratedGames.reduce((total, game) => total + game.personalRating, 0) / ratedGames.length
    : null
  const achievementSummary = getAchievementSummary()
  const genreData = getGenreData(games)
  const xp = (games.length * 10) + ((completed + completed100) * 50) + (completed100 * 50) + Math.min(Math.floor(totalHours), 100) + (achievementSummary.unlocked * 25)
  const xpPerLevel = 200

  return {
    totalGames: games.length,
    wishlist,
    playing,
    completed,
    completed100,
    totalHours,
    averageRating,
    completionRate: games.length ? Math.round(((completed + completed100) / games.length) * 100) : 0,
    achievementsUnlocked: achievementSummary.unlocked,
    achievementsTotal: achievementSummary.total,
    favoriteGenre: genreData.favoriteGenre,
    genreDistribution: genreData.distribution,
    xp,
    level: Math.floor(xp / xpPerLevel) + 1,
    levelProgress: xp % xpPerLevel,
    xpPerLevel,
  }
}
