export function renderAchievementCard(achievement) {
  const state = achievement.unlocked ? 'Desbloqueado' : 'En progreso'
  return `<article class="achievement-card${achievement.unlocked ? ' is-unlocked' : ''}"><div class="achievement-icon" aria-hidden="true">${achievement.icon}</div><div class="achievement-content"><div class="achievement-heading"><div><p>${state}</p><h2>${achievement.title}</h2></div><strong>${achievement.value} / ${achievement.target}</strong></div><p class="achievement-description">${achievement.description}</p><div class="achievement-progress" aria-label="Progreso ${achievement.value} de ${achievement.target}"><span style="width: ${achievement.progress}%"></span></div></div></article>`
}
