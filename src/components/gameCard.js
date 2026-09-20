function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]))
}

function formatDate(date) {
  if (!date) return 'Fecha no disponible'
  return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short' }).format(new Date(`${date}T00:00:00`))
}

export function renderGameCard(game) {
  const genres = (game.genres || []).slice(0, 2).map((genre) => escapeHtml(genre.name)).join(' · ') || 'Sin género'
  const image = game.background_image
    ? `<img src="${escapeHtml(game.background_image)}" alt="Portada de ${escapeHtml(game.name)}" loading="lazy">`
    : `<div class="game-card-image game-card-fallback">${icon('gamepad')}</div>`

  return `<a class="game-card" href="#/game/${game.id}"><div class="game-card-image">${image}</div><div class="game-card-content"><p class="game-card-genres">${genres}</p><h3>${escapeHtml(game.name)}</h3><div class="game-card-meta"><span>${formatDate(game.released)}</span><span class="rating-value">${icon('star')} ${Number(game.rating || 0).toFixed(1)}</span></div></div></a>`
}
import { icon } from './icons.js'
