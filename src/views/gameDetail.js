import { getGameDetails, getGameScreenshots } from '../services/rawgApi.js'

const libraryStatuses = [
  { value: 'wishlist', label: '❤️ Quiero jugar' },
  { value: 'playing', label: '🎮 Jugando' },
  { value: 'completed', label: '✅ Completado' },
  { value: 'completed-100', label: '🏆 100%' },
]

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]))
}

function cleanDescription(description = '') {
  const element = document.createElement('div')
  element.innerHTML = description
  return element.textContent || element.innerText || 'No hay descripción disponible para este videojuego.'
}

function formatDate(date) {
  if (!date) return 'No disponible'
  return new Intl.DateTimeFormat('es-PE', { dateStyle: 'long' }).format(new Date(`${date}T00:00:00`))
}

function renderTags(items, property = 'name') {
  if (!items?.length) return '<span class="detail-empty">No disponible</span>'
  return items.map((item) => `<span class="detail-tag">${escapeHtml(item[property])}</span>`).join('')
}

function renderDetail(game, screenshots) {
  const hero = game.background_image
    ? `<img src="${escapeHtml(game.background_image)}" alt="Portada de ${escapeHtml(game.name)}">`
    : '<div class="detail-image-fallback" aria-hidden="true">🎮</div>'
  const statusButtons = libraryStatuses.map(({ value, label }) => `<button type="button" class="status-button" data-status="${value}">${label}</button>`).join('')
  const screenshotMarkup = screenshots.length
    ? `<div class="screenshot-grid">${screenshots.map((shot) => `<img src="${escapeHtml(shot.image)}" alt="Captura de ${escapeHtml(game.name)}" loading="lazy">`).join('')}</div>`
    : '<p class="detail-empty">No hay capturas disponibles para este videojuego.</p>'

  return `<section class="view detail-view" aria-labelledby="game-title"><a class="back-link" href="#/explore">← Volver a explorar</a><div class="detail-hero"><div class="detail-cover">${hero}</div><div class="detail-summary"><p class="eyebrow">VIDEOJUEGO</p><h1 id="game-title">${escapeHtml(game.name)}</h1><div class="detail-ratings"><span>★ ${Number(game.rating || 0).toFixed(1)} / 5</span>${game.metacritic ? `<span class="metacritic-badge">Metacritic ${game.metacritic}</span>` : ''}</div><p class="detail-description">${escapeHtml(cleanDescription(game.description_raw || game.description))}</p></div></div><section class="detail-section"><h2>Añadir a GameVault</h2><p>Selecciona el estado inicial para este videojuego.</p><div class="status-buttons">${statusButtons}</div><p class="status-feedback" id="status-feedback" aria-live="polite"></p></section><section class="detail-section detail-info"><div><h2>Fecha de lanzamiento</h2><p>${formatDate(game.released)}</p></div><div><h2>Géneros</h2><div class="detail-tags">${renderTags(game.genres)}</div></div><div><h2>Plataformas</h2><div class="detail-tags">${renderTags(game.platforms?.map(({ platform }) => platform))}</div></div></section><section class="detail-section"><h2>Capturas</h2>${screenshotMarkup}</section><p class="rawg-attribution">Datos e imágenes de videojuegos por <a href="https://rawg.io/" target="_blank" rel="noreferrer">RAWG</a>.</p></section>`
}

function renderDetailMessage(container, title, text, retry = false) {
  container.innerHTML = `<section class="view"><a class="back-link" href="#/explore">← Volver a explorar</a><div class="result-message error"><span aria-hidden="true">!</span><div><h3>${title}</h3><p>${text}</p>${retry ? '<button type="button" class="text-button" data-retry-detail>Reintentar</button>' : ''}</div></div></section>`
}

export function renderGameDetailView() {
  return '<div id="game-detail" aria-live="polite"></div>'
}

export function activateGameDetailView(root, gameId) {
  const container = root.querySelector('#game-detail')

  async function loadGame() {
    if (!gameId) {
      renderDetailMessage(container, 'No se seleccionó un videojuego', 'Vuelve a Explorar y elige un juego para ver sus detalles.')
      return
    }

    container.innerHTML = '<section class="view"><div class="result-message loading"><span aria-hidden="true">◌</span><div><h3>Cargando detalles</h3><p>Estamos reuniendo la información del videojuego.</p></div></div></section>'

    try {
      const [game, screenshots] = await Promise.all([
        getGameDetails(gameId),
        getGameScreenshots(gameId).catch(() => []),
      ])
      container.innerHTML = renderDetail(game, screenshots.length ? screenshots : (game.short_screenshots || []))
    } catch (error) {
      const text = error.message === 'API_KEY_MISSING'
        ? 'Configura VITE_RAWG_API_KEY en tu archivo .env y reinicia Vite.'
        : 'No fue posible cargar este videojuego. Revisa tu conexión e inténtalo nuevamente.'
      renderDetailMessage(container, 'No se pudo cargar el detalle', text, true)
    }
  }

  container.addEventListener('click', (event) => {
    const statusButton = event.target.closest('[data-status]')
    if (statusButton) {
      container.querySelectorAll('[data-status]').forEach((button) => button.classList.toggle('is-selected', button === statusButton))
      container.querySelector('#status-feedback').textContent = 'Estado seleccionado. Se guardará en tu biblioteca durante la Fase 5.'
    }
    if (event.target.matches('[data-retry-detail]')) loadGame()
  })

  loadGame()
}
