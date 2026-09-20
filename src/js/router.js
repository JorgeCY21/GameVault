import { renderNavbar } from '../components/navbar.js'

const routes = {
  '/': { title: 'Tu biblioteca, en un solo lugar', text: 'El panel de inicio mostrará el resumen de tus videojuegos.' },
  '/explore': { title: 'Explorar juegos', text: 'Aquí podrás descubrir y buscar videojuegos con RAWG.' },
  '/library': { title: 'Mi biblioteca', text: 'Tus videojuegos guardados aparecerán en esta vista.' },
  '/achievements': { title: 'Logros', text: 'Tus logros y su progreso se calcularán desde tu actividad.' },
  '/profile': { title: 'Perfil y estadísticas', text: 'Las estadísticas de tu biblioteca se mostrarán aquí.' },
  '/game': { title: 'Detalle del videojuego', text: 'Esta vista mostrará la información completa de cada juego.' },
  '/progress': { title: 'Actualizar progreso', text: 'Aquí podrás registrar avance, horas, puntuación y notas.' },
}

function getRoute() {
  const hash = window.location.hash.slice(1) || '/'
  const parts = hash.split('/')
  const path = parts.length > 2 ? `/${parts[1]}` : hash
  return routes[path] ? path : '/'
}

function renderApp(root) {
  const route = getRoute()
  const view = routes[route]
  root.innerHTML = `${renderNavbar(route)}<main class="app-content"><section class="welcome-panel" aria-labelledby="view-title"><p class="eyebrow">GAMEVAULT · FASE 1</p><h1 id="view-title">${view.title}</h1><p>${view.text}</p><p class="phase-note">Estructura inicial lista. Las funcionalidades se incorporarán en las siguientes fases.</p></section></main>`
}

export function startRouter(root) {
  window.addEventListener('hashchange', () => renderApp(root))
  renderApp(root)
}
