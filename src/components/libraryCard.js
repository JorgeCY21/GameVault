import { icon } from './icons.js'

const statusLabels = {
  wishlist: 'Quiero jugar',
  playing: 'Jugando',
  completed: 'Completado',
  'completed-100': '100%',
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]))
}

export function renderLibraryCard(game) {
  const image = game.image
    ? `<img src="${escapeHtml(game.image)}" alt="Portada de ${escapeHtml(game.name)}" loading="lazy">`
    : `<div class="library-card-fallback">${icon('gamepad')}</div>`
  const personalRating = game.personalRating ? `${game.personalRating}/10` : 'Sin puntuar'

  return `<article class="library-card"><a class="library-card-cover" href="#/game/${game.gameId}">${image}</a><div class="library-card-content"><span class="library-status status-${game.status}">${statusLabels[game.status]}</span><h3><a href="#/game/${game.gameId}">${escapeHtml(game.name)}</a></h3><div class="library-progress"><div><span>Progreso</span><strong>${game.progress}%</strong></div><div class="progress-track"><span style="width: ${Math.min(Math.max(Number(game.progress) || 0, 0), 100)}%"></span></div></div><div class="library-stats"><span>${Number(game.hours) || 0} h</span><span>${personalRating}</span></div><div class="library-actions"><label class="sr-only" for="status-${game.gameId}">Cambiar estado de ${escapeHtml(game.name)}</label><select id="status-${game.gameId}" data-change-status="${game.gameId}"><option value="wishlist"${game.status === 'wishlist' ? ' selected' : ''}>Quiero jugar</option><option value="playing"${game.status === 'playing' ? ' selected' : ''}>Jugando</option><option value="completed"${game.status === 'completed' ? ' selected' : ''}>Completado</option><option value="completed-100"${game.status === 'completed-100' ? ' selected' : ''}>100%</option></select><a class="card-action-link" href="#/progress/${game.gameId}">Actualizar</a><button type="button" class="delete-button" data-remove-game="${game.gameId}">Eliminar</button></div></div></article>`
}
