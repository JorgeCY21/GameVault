import { getGame, updateGame } from '../js/storage.js'
import { getAchievementSummary } from '../js/achievements.js'
import { icon } from '../components/icons.js'

const statuses = [
  { value: 'wishlist', label: 'Quiero jugar' },
  { value: 'playing', label: 'Jugando' },
  { value: 'completed', label: 'Completado' },
  { value: 'completed-100', label: '100%' },
]

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  }[character]))
}

function renderForm(game) {
  const statusOptions = statuses.map(({ value, label }) => `<option value="${value}"${game.status === value ? ' selected' : ''}>${label}</option>`).join('')
  const image = game.image
    ? `<img src="${escapeHtml(game.image)}" alt="Portada de ${escapeHtml(game.name)}">`
    : icon('gamepad')

  return `<section class="view progress-view" aria-labelledby="view-title"><a class="back-link" href="#/library">← Volver a mi biblioteca</a><p class="eyebrow">VISTA 05</p><h1 id="view-title">Actualizar progreso</h1><div class="progress-game-summary"><div class="progress-game-image">${image}</div><p>${escapeHtml(game.name)}</p></div><form id="progress-form" class="progress-form" novalidate><div class="form-field"><label for="progress-status">Estado</label><select id="progress-status" name="status">${statusOptions}</select></div><div class="form-row"><div class="form-field"><label for="progress-value">Progreso (%)</label><input id="progress-value" name="progress" type="number" min="0" max="100" step="1" value="${Number(game.progress) || 0}" required></div><div class="form-field"><label for="hours-value">Horas jugadas</label><input id="hours-value" name="hours" type="number" min="0" step="0.5" value="${Number(game.hours) || 0}" required></div></div><div class="form-field"><label for="rating-value">Puntuación personal <span>(opcional)</span></label><input id="rating-value" name="personalRating" type="number" min="1" max="10" step="1" value="${game.personalRating ?? ''}" placeholder="Del 1 al 10"></div><div class="form-field"><label for="notes-value">Notas <span>(opcional)</span></label><textarea id="notes-value" name="notes" rows="5" maxlength="1000" placeholder="Escribe tus impresiones del juego...">${escapeHtml(game.notes)}</textarea><small>Máximo 1000 caracteres.</small></div><p id="progress-feedback" class="form-feedback" aria-live="polite"></p><button class="save-progress-button" type="submit">Guardar cambios</button></form></section>`
}

function renderMissingGame() {
  return `<section class="view"><a class="back-link" href="#/library">← Volver a mi biblioteca</a><div class="library-empty">${icon('library')}<h2>Juego no encontrado</h2><p>Este videojuego no está en tu biblioteca o pudo haber sido eliminado.</p><a href="#/library">Ir a mi biblioteca</a></div></section>`
}

function validateForm(values) {
  if (!statuses.some((status) => status.value === values.status)) {
    return 'Selecciona un estado válido.'
  }
  if (!Number.isInteger(values.progress) || values.progress < 0 || values.progress > 100) {
    return 'El progreso debe ser un número entero entre 0 y 100.'
  }
  if (!Number.isFinite(values.hours) || values.hours < 0) {
    return 'Las horas jugadas deben ser un número igual o mayor a 0.'
  }
  if (values.personalRating !== null && (!Number.isInteger(values.personalRating) || values.personalRating < 1 || values.personalRating > 10)) {
    return 'La puntuación personal debe estar entre 1 y 10.'
  }
  if (values.notes.length > 1000) return 'Las notas no pueden superar los 1000 caracteres.'
  return ''
}

export function renderProgressView() {
  return '<div id="progress-view"></div>'
}

export function activateProgressView(root, gameId) {
  const container = root.querySelector('#progress-view')
  const game = getGame(gameId)

  if (!game) {
    container.innerHTML = renderMissingGame()
    return
  }

  container.innerHTML = renderForm(game)
  const form = container.querySelector('#progress-form')
  const feedback = container.querySelector('#progress-feedback')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const ratingValue = formData.get('personalRating').trim()
    const values = {
      status: formData.get('status'),
      progress: Number(formData.get('progress')),
      hours: Number(formData.get('hours')),
      personalRating: ratingValue === '' ? null : Number(ratingValue),
      notes: formData.get('notes').trim(),
    }
    const error = validateForm(values)

    if (error) {
      feedback.textContent = error
      feedback.className = 'form-feedback is-error'
      return
    }

    updateGame(gameId, values)
    const summary = getAchievementSummary()
    feedback.textContent = `Cambios guardados. Logros actuales: ${summary.unlocked} de ${summary.total}.`
    feedback.className = 'form-feedback is-success'
  })
}
