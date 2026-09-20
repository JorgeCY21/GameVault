import { renderAchievementCard } from '../components/achievementCard.js'
import { getAchievements, getAchievementSummary } from '../js/achievements.js'

export function renderAchievementsView() {
  return '<div id="achievements-view"></div>'
}

export function activateAchievementsView(root) {
  const container = root.querySelector('#achievements-view')
  const summary = getAchievementSummary()
  const achievements = getAchievements()

  container.innerHTML = `<section class="view achievements-view" aria-labelledby="view-title"><p class="eyebrow">VISTA 06</p><h1 id="view-title">Logros</h1><p class="view-description">Tus logros se desbloquean automáticamente con la actividad de tu biblioteca.</p><div class="achievement-summary"><span aria-hidden="true">🏆</span><div><strong>${summary.unlocked} de ${summary.total}</strong><p>logros desbloqueados</p></div></div><div class="achievement-list">${achievements.map(renderAchievementCard).join('')}</div></section>`
}
