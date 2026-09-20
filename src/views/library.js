import { renderLibraryCard } from '../components/libraryCard.js'
import { icon } from '../components/icons.js'
import { changeStatus, getLibrary, removeGame } from '../js/storage.js'

const filters = [
  { value: 'all', label: 'Todos' },
  { value: 'wishlist', label: 'Quiero jugar' },
  { value: 'playing', label: 'Jugando' },
  { value: 'completed', label: 'Completado' },
  { value: 'completed-100', label: '100%' },
]

export function renderLibraryView() {
  const filterButtons = filters.map(({ value, label }) => `<button type="button" class="library-filter${value === 'all' ? ' is-active' : ''}" data-filter="${value}" aria-pressed="${value === 'all'}">${label}</button>`).join('')
  return `<section class="view library-view" aria-labelledby="view-title"><p class="eyebrow">VISTA 04</p><h1 id="view-title">Mi biblioteca</h1><p class="view-description">Gestiona tus videojuegos, su estado y el avance de cada partida.</p><label class="sr-only" for="library-search">Buscar en mi biblioteca</label><input id="library-search" class="library-search" type="search" placeholder="Buscar en mi biblioteca..." autocomplete="off"><div class="library-filters" aria-label="Filtrar biblioteca">${filterButtons}</div><p class="library-count" id="library-count" aria-live="polite"></p><div class="library-grid" id="library-results"></div></section>`
}

export function activateLibraryView(root) {
  const search = root.querySelector('#library-search')
  const results = root.querySelector('#library-results')
  const count = root.querySelector('#library-count')
  let activeFilter = 'all'

  function renderGames() {
    const query = search.value.trim().toLocaleLowerCase()
    const games = getLibrary().filter((game) => {
      const matchesFilter = activeFilter === 'all' || game.status === activeFilter
      const matchesSearch = game.name.toLocaleLowerCase().includes(query)
      return matchesFilter && matchesSearch
    })

    count.textContent = `${games.length} ${games.length === 1 ? 'juego' : 'juegos'}`
    results.innerHTML = games.length
      ? games.map(renderLibraryCard).join('')
      : `<div class="library-empty">${icon('library')}<h2>${query || activeFilter !== 'all' ? 'No encontramos juegos' : 'Tu biblioteca está vacía'}</h2><p>${query || activeFilter !== 'all' ? 'Prueba ajustando la búsqueda o el filtro.' : 'Explora videojuegos y añade el primero a GameVault.'}</p><a href="#/explore">Explorar videojuegos</a></div>`
  }

  search.addEventListener('input', renderGames)

  root.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter
      root.querySelectorAll('[data-filter]').forEach((item) => {
        item.classList.toggle('is-active', item === button)
        item.setAttribute('aria-pressed', item === button)
      })
      renderGames()
    })
  })

  results.addEventListener('change', (event) => {
    if (event.target.matches('[data-change-status]')) {
      changeStatus(event.target.dataset.changeStatus, event.target.value)
      renderGames()
    }
  })

  results.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-game]')
    if (!button) return

    const game = getLibrary().find((item) => String(item.gameId) === button.dataset.removeGame)
    if (game && window.confirm(`¿Eliminar “${game.name}” de GameVault?`)) {
      removeGame(button.dataset.removeGame)
      renderGames()
    }
  })

  renderGames()
}
