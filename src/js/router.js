import { renderBottomNavbar, renderMobileHeader } from '../components/navbar.js'
import { renderSidebar } from '../components/sidebar.js'
import { activateExploreView, renderExploreView } from '../views/explore.js'
import { activateGameDetailView, renderGameDetailView } from '../views/gameDetail.js'
import { activateLibraryView, renderLibraryView } from '../views/library.js'
import { activateProgressView, renderProgressView } from '../views/progress.js'
import { activateAchievementsView, renderAchievementsView } from '../views/achievements.js'
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
      : viewName === 'library'
        ? renderLibraryView()
        : viewName === 'progress'
          ? renderProgressView()
          : viewName === 'achievements'
            ? renderAchievementsView()
        : renderPlaceholderView(viewName)

  root.innerHTML = `<div class="app-shell">${renderSidebar(route)}<div class="main-area">${renderMobileHeader()}<main class="app-content">${view}</main>${renderBottomNavbar(route)}</div></div>`

  if (viewName === 'explore') {
    activateExploreView(root)
  }

  if (viewName === 'game') {
    activateGameDetailView(root, getRouteId())
  }

  if (viewName === 'library') {
    activateLibraryView(root)
  }

  if (viewName === 'progress') {
    activateProgressView(root, getRouteId())
  }

  if (viewName === 'achievements') {
    activateAchievementsView(root)
  }
}

export function startRouter(root) {
  window.addEventListener('hashchange', () => renderApp(root))
  renderApp(root)
}
