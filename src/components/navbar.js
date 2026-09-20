import { icon } from './icons.js'

const mobileLinks = [
  { href: '#/', label: 'Inicio', icon: 'home' },
  { href: '#/explore', label: 'Explorar', icon: 'search' },
  { href: '#/library', label: 'Biblioteca', icon: 'library' },
  { href: '#/profile', label: 'Perfil', icon: 'user' },
]

function createLinks(links, currentPath) {
  return links.map(({ href, label, icon: iconName }) => {
    const isCurrent = href === `#${currentPath}`
    return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ''}>${icon(iconName)}<span>${label}</span></a>`
  }).join('')
}

export function renderMobileHeader() {
  return `<header class="mobile-header"><a class="brand" href="#/" aria-label="GameVault, ir a inicio"><img class="brand-logo" src="/gamevault-logo.svg" alt=""><span>GAME<span>VAULT</span></span></a><span class="header-status">Mi colección</span></header>`
}

export function renderBottomNavbar(currentPath) {
  return `<nav class="bottom-nav" aria-label="Navegación principal">${createLinks(mobileLinks, currentPath)}</nav>`
}
