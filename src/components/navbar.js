const mobileLinks = [
  { href: '#/', label: 'Inicio', icon: '⌂' },
  { href: '#/explore', label: 'Explorar', icon: '⌕' },
  { href: '#/library', label: 'Biblioteca', icon: '◈' },
  { href: '#/profile', label: 'Perfil', icon: '◉' },
]

function createLinks(links, currentPath) {
  return links.map(({ href, label, icon }) => {
    const isCurrent = href === `#${currentPath}`
    return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ''}><span aria-hidden="true">${icon}</span><span>${label}</span></a>`
  }).join('')
}

export function renderMobileHeader() {
  return `<header class="mobile-header"><a class="brand" href="#/" aria-label="GameVault, ir a inicio">GAME<span>VAULT</span></a><span class="header-status">Mi colección</span></header>`
}

export function renderBottomNavbar(currentPath) {
  return `<nav class="bottom-nav" aria-label="Navegación principal">${createLinks(mobileLinks, currentPath)}</nav>`
}
