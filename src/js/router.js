import { renderBottomNavbar, renderMobileHeader } from '../components/navbar.js'
import { renderSidebar } from '../components/sidebar.js'
import { activateExploreView, renderExploreView } from '../views/explore.js'
import { activateGameDetailView, renderGameDetailView } from '../views/gameDetail.js'
import { renderPlaceholderView } from '../views/placeholderView.js'

const routes = {
  '/': 'home',
  '/explore': 'explore',
  '/library': 'library',
  '/achievements': 'achievements',
  '/profile': 'profile',
  '/game': 'game',
  '/progress': 'progress',
}

function getRoute() {
  const hash = window.location.hash.slice(1) || '/'
  const parts = hash.split('/')
  const path = parts.length > 2 ? `/${parts[1]}` : hash
  return routes[path] ? path : '/'
}

function getRouteId() {
  return window.location.hash.slice(1).split('/')[2] || ''
}

function renderApp(root) {
  const route = getRoute()
  const viewName = routes[route]
  const view = viewName === 'explore'
    ? renderExploreView()
    : viewName === 'game'
      ? renderGameDetailView()
      : renderPlaceholderView(viewName)

  root.innerHTML = `<div class="app-shell">${renderSidebar(route)}<div class="main-area">${renderMobileHeader()}<main class="app-content">${view}</main>${renderBottomNavbar(route)}</div></div>`

  if (viewName === 'explore') {
    activateExploreView(root)
  }

  if (viewName === 'game') {
    activateGameDetailView(root, getRouteId())
  }
}

export function startRouter(root) {
  window.addEventListener('hashchange', () => renderApp(root))
  renderApp(root)
}
