import { renderBottomNavbar, renderMobileHeader } from '../components/navbar.js'
import { renderSidebar } from '../components/sidebar.js'
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

function renderApp(root) {
  const route = getRoute()
  root.innerHTML = `<div class="app-shell">${renderSidebar(route)}<div class="main-area">${renderMobileHeader()}<main class="app-content">${renderPlaceholderView(routes[route])}</main>${renderBottomNavbar(route)}</div></div>`
}

export function startRouter(root) {
  window.addEventListener('hashchange', () => renderApp(root))
  renderApp(root)
}
