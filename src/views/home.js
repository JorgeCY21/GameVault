import { getLibrary } from '../js/storage.js'
import { getStats } from '../js/stats.js'
import { icon } from '../components/icons.js'

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]))
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function renderContinueCard(game) {
  const image = game.image
    ? `<img src="${escapeHtml(game.image)}" alt="Portada de ${escapeHtml(game.name)}" loading="lazy">`
    : `<span class="image-fallback">${icon('gamepad')}</span>`
  const progress = Math.min(Math.max(Number(game.progress) || 0, 0), 100)

  return `<a class="continue-card" href="#/progress/${game.gameId}"><div class="continue-image">${image}</div><div class="continue-content"><p>JUGANDO</p><h3>${escapeHtml(game.name)}</h3><div class="continue-progress"><span style="width: ${progress}%"></span></div><div><span>${progress}% completado</span><span>${Number(game.hours) || 0} h</span></div></div></a>`
}

export function renderHomeView() {
  const stats = getStats()
  const playingGames = getLibrary()
    .filter((game) => game.status === 'playing')
    .sort((first, second) => new Date(second.updatedAt) - new Date(first.updatedAt))
    .slice(0, 3)
  const summaryCards = [
    ['heart', 'Quiero jugar', stats.wishlist], ['gamepad', 'Jugando', stats.playing],
    ['check', 'Completados', stats.completed], ['trophy', '100%', stats.completed100],
  ]

  if (!stats.totalGames) {
    return `<section class="view home-view" aria-labelledby="view-title"><p class="eyebrow">INICIO</p><h1 id="view-title">${getGreeting()}, jugador</h1><p class="view-description">Tu biblioteca todavía espera su primera aventura.</p><section class="home-empty">${icon('gamepad')}<div><p class="eyebrow">EMPIEZA TU COLECCIÓN</p><h2>Encuentra tu próximo juego</h2><p>Descubre videojuegos reales, guárdalos y registra cada partida en GameVault.</p><a href="#/explore">Explorar videojuegos ${icon('arrow')}</a></div></section></section>`
  }

  const continueSection = playingGames.length
    ? `<div class="continue-grid">${playingGames.map(renderContinueCard).join('')}</div>`
    : `<div class="home-inline-empty">${icon('gamepad')}<div><h3>Aún no tienes partidas activas</h3><p>Cambia el estado de un juego a “Jugando” desde tu biblioteca para verlo aquí.</p></div><a href="#/library">Ir a mi biblioteca</a></div>`

  return `<section class="view home-view" aria-labelledby="view-title"><div class="home-title-row"><div><p class="eyebrow">INICIO</p><h1 id="view-title">${getGreeting()}, jugador</h1><p class="view-description">Aquí está el resumen de tu biblioteca personal.</p></div><a class="home-explore-link" href="#/explore">Explorar ${icon('arrow')}</a></div><div class="home-summary-grid">${summaryCards.map(([iconName, label, value]) => `<article>${icon(iconName)}<strong>${value}</strong><p>${label}</p></article>`).join('')}</div><section class="home-section"><div class="home-section-heading"><div><p class="eyebrow">CONTINÚA JUGANDO</p><h2>Tu siguiente partida</h2></div><a href="#/library">Ver biblioteca</a></div>${continueSection}</section><section class="home-level-strip"><div>${icon('sparkles')}<div><p>Nivel ${stats.level}</p><strong>${stats.xp} XP acumulados</strong></div></div><a href="#/profile">Ver perfil</a></section></section>`
}
