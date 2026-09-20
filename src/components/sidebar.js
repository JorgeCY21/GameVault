import { icon } from './icons.js'

const desktopLinks = [
  { href: '#/', label: 'Inicio', icon: 'home' },
  { href: '#/explore', label: 'Explorar', icon: 'search' },
  { href: '#/library', label: 'Biblioteca', icon: 'library' },
  { href: '#/achievements', label: 'Logros', icon: 'trophy' },
  { href: '#/profile', label: 'Perfil', icon: 'user' },
]

export function renderSidebar(currentPath) {
  const links = desktopLinks.map(({ href, label, icon: iconName }) => {
    const isCurrent = href === `#${currentPath}`
    return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ''}>${icon(iconName)}${label}</a>`
  }).join('')

  return `<aside class="sidebar"><a class="brand" href="#/" aria-label="GameVault, ir a inicio">GAME<span>VAULT</span></a><p class="sidebar-caption">TU BIBLIOTECA PERSONAL</p><nav aria-label="Navegación principal">${links}</nav><div class="sidebar-footer"></div></aside>`
}
