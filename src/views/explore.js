import { renderGameCard } from '../components/gameCard.js'
import { getGamesByGenre, getPopularGames, searchGames } from '../services/rawgApi.js'

const genres = [
  { label: 'Acción', value: 'action' },
  { label: 'RPG', value: 'role-playing-games-rpg' },
  { label: 'Shooter', value: 'shooter' },
  { label: 'Racing', value: 'racing' },
  { label: 'Aventura', value: 'adventure' },
  { label: 'Indie', value: 'indie' },
  { label: 'Estrategia', value: 'strategy' },
]

export function renderExploreView() {
  const genreButtons = genres.map(({ label, value }) => `<button class="genre-chip" type="button" data-genre="${value}">${label}</button>`).join('')

  return `<section class="view explore-view" aria-labelledby="view-title"><h1 id="view-title">Explorar videojuegos</h1><p class="view-description">Encuentra tu próxima aventura y añádela a tu colección personal.</p><form class="search-form" id="game-search" role="search"><label class="sr-only" for="game-query">Buscar videojuegos</label><input id="game-query" name="query" type="search" placeholder="Busca un videojuego..." autocomplete="off"><button type="submit">Buscar</button></form><div class="genre-section"><h2>Explora por género</h2><div class="genre-list">${genreButtons}</div></div><div class="results-heading"><div><p class="eyebrow" id="results-kicker">DESTACADOS</p><h2 id="results-title">Juegos populares</h2></div></div><div id="explore-results" class="game-grid" aria-live="polite"></div><p class="rawg-attribution">Datos e imágenes de videojuegos por <a href="https://rawg.io/" target="_blank" rel="noreferrer">RAWG</a>.</p></section>`
}

function renderMessage(container, type, title, text, showRetry = false) {
  container.setAttribute('aria-busy', type === 'loading' ? 'true' : 'false')
  container.innerHTML = `<div class="result-message ${type}"><span aria-hidden="true">${type === 'loading' ? '◌' : '!'}</span><div><h3>${title}</h3><p>${text}</p>${showRetry ? '<button type="button" class="text-button" data-retry>Reintentar</button>' : ''}</div></div>`
}

function renderGames(container, games) {
  container.setAttribute('aria-busy', 'false')
  if (!games.length) {
    renderMessage(container, 'empty', 'Sin resultados', 'Prueba con otro nombre o elige una categoría diferente.')
    return
  }

  container.innerHTML = games.map(renderGameCard).join('')
}

function getErrorMessage(error) {
  if (error.message === 'API_KEY_MISSING') {
    return 'Crea un archivo .env con VITE_RAWG_API_KEY=TU_CLAVE y reinicia el servidor de Vite.'
  }

  return 'No fue posible obtener juegos de RAWG. Revisa tu conexión e inténtalo nuevamente.'
}

export function activateExploreView(root) {
  const form = root.querySelector('#game-search')
  const input = root.querySelector('#game-query')
  const results = root.querySelector('#explore-results')
  const title = root.querySelector('#results-title')
  const kicker = root.querySelector('#results-kicker')

  async function loadGames(loader, heading, label) {
    title.textContent = heading
    kicker.textContent = label
    renderMessage(results, 'loading', 'Cargando juegos', 'Estamos buscando recomendaciones para ti.')

    try {
      renderGames(results, await loader())
    } catch (error) {
      renderMessage(results, 'error', 'No se pudieron cargar los juegos', getErrorMessage(error), true)
    }
  }

  function loadPopularGames() {
    loadGames(getPopularGames, 'Juegos populares', 'DESTACADOS')
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const query = input.value.trim()

    if (query.length < 2) {
      title.textContent = 'Busca al menos 2 caracteres'
      kicker.textContent = 'BÚSQUEDA'
      renderMessage(results, 'empty', 'Escribe un poco más', 'Usa al menos dos caracteres para buscar un videojuego.')
      return
    }

    loadGames(() => searchGames(query), `Resultados para “${query}”`, 'BÚSQUEDA')
  })

  root.querySelectorAll('[data-genre]').forEach((button) => {
    button.addEventListener('click', () => {
      const genre = genres.find((item) => item.value === button.dataset.genre)
      loadGames(() => getGamesByGenre(genre.value), genre.label, 'GÉNERO')
    })
  })

  results.addEventListener('click', (event) => {
    if (event.target.matches('[data-retry]')) loadPopularGames()
  })

  loadPopularGames()
}
