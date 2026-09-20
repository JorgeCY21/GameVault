import { getStats } from '../js/stats.js'
import { icon } from '../components/icons.js'

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]))
}

function formatNumber(value) {
  return new Intl.NumberFormat('es-PE', { maximumFractionDigits: 1 }).format(value)
}

export function renderProfileView() {
  const stats = getStats()
  const overview = [
    ['Total', stats.totalGames], ['Quiero jugar', stats.wishlist], ['Jugando', stats.playing],
    ['Completados', stats.completed], ['100%', stats.completed100], ['Horas', `${formatNumber(stats.totalHours)} h`],
    ['Puntuación media', stats.averageRating === null ? '—' : `${stats.averageRating.toFixed(1)} / 10`], ['Completado', `${stats.completionRate}%`],
  ]
  const genreRows = stats.genreDistribution.length
    ? stats.genreDistribution.map((genre) => `<div class="genre-stat"><div><span>${escapeHtml(genre.name)}</span><strong>${genre.percentage}%</strong></div><div class="genre-stat-track"><span style="width: ${genre.percentage}%"></span></div></div>`).join('')
    : '<p class="profile-empty">Añade juegos con géneros para ver esta distribución.</p>'

  return `<section class="view profile-view" aria-labelledby="view-title"><h1 id="view-title">Perfil y estadísticas</h1><p class="view-description">Un resumen automático de tu actividad en GameVault.</p><section class="level-card" aria-label="Nivel ${stats.level}"><div><p>NIVEL ACTUAL</p><h2>Nivel ${stats.level}</h2></div><strong>${stats.xp} XP</strong><div class="level-progress"><span style="width: ${(stats.levelProgress / stats.xpPerLevel) * 100}%"></span></div><small>${stats.levelProgress} / ${stats.xpPerLevel} XP para el siguiente nivel</small></section><div class="profile-highlights"><article>${icon('sparkles')}<div><p>Género favorito</p><strong>${escapeHtml(stats.favoriteGenre)}</strong></div></article><article>${icon('trophy')}<div><p>Logros</p><strong>${stats.achievementsUnlocked} / ${stats.achievementsTotal}</strong></div></article></div><section class="profile-section"><h2>Tu biblioteca</h2><div class="stats-grid">${overview.map(([label, value]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join('')}</div></section><section class="profile-section"><h2>Distribución por géneros</h2><div class="genre-stat-list">${genreRows}</div></section></section>`
}
