import { getLibrary } from './storage.js'

const ACHIEVEMENT_RULES = [
  { id: 'first-playing', icon: 'gamepad', title: 'Primera partida', description: 'Añade el primer videojuego como Jugando.', target: 1, getValue: (games) => games.filter((game) => game.status === 'playing').length },
  { id: 'first-completed', icon: 'check', title: 'Fin del camino', description: 'Completa el primer videojuego.', target: 1, getValue: (games) => games.filter((game) => ['completed', 'completed-100'].includes(game.status)).length },
  { id: 'perfectionist', icon: 'trophy', title: 'Perfeccionista', description: 'Completa un videojuego al 100%.', target: 1, getValue: (games) => games.filter((game) => game.status === 'completed-100').length },
  { id: 'collector', icon: 'medal', title: 'Coleccionista', description: 'Ten 10 videojuegos en GameVault.', target: 10, getValue: (games) => games.length },
  { id: 'completion-master', icon: 'crown', title: 'Maestro completista', description: 'Completa 5 videojuegos al 100%.', target: 5, getValue: (games) => games.filter((game) => game.status === 'completed-100').length },
  { id: 'first-100-hours', icon: 'clock', title: 'Primeras 100 horas', description: 'Registra 100 horas acumuladas.', target: 100, getValue: (games) => games.reduce((total, game) => total + (Number(game.hours) || 0), 0) },
  { id: 'touch-grass', icon: 'clock', title: 'No toques pasto', description: 'Registra 500 horas acumuladas.', target: 500, getValue: (games) => games.reduce((total, game) => total + (Number(game.hours) || 0), 0) },
  { id: 'critic', icon: 'star', title: 'Crítico', description: 'Califica 10 videojuegos.', target: 10, getValue: (games) => games.filter((game) => Number.isInteger(game.personalRating) && game.personalRating >= 1).length },
]

export function getAchievements() {
  const games = getLibrary()

  return ACHIEVEMENT_RULES.map((achievement) => {
    const value = Math.min(achievement.getValue(games), achievement.target)
    return {
      ...achievement,
      value,
      unlocked: value >= achievement.target,
      progress: Math.round((value / achievement.target) * 100),
    }
  })
}

export function getAchievementSummary() {
  const achievements = getAchievements()
  return {
    total: achievements.length,
    unlocked: achievements.filter((achievement) => achievement.unlocked).length,
  }
}
