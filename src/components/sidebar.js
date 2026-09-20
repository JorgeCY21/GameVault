const desktopLinks = [
  { href: '#/', label: 'Inicio', icon: '⌂' },
  { href: '#/explore', label: 'Explorar', icon: '⌕' },
  { href: '#/library', label: 'Biblioteca', icon: '◈' },
  { href: '#/achievements', label: 'Logros', icon: '✦' },
  { href: '#/profile', label: 'Perfil', icon: '◉' },
]

export function renderSidebar(currentPath) {
  const links = desktopLinks.map(({ href, label, icon }) => {
    const isCurrent = href === `#${currentPath}`
    return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ''}><span aria-hidden="true">${icon}</span>${label}</a>`
  }).join('')

  return `<aside class="sidebar"><a class="brand" href="#/" aria-label="GameVault, ir a inicio">GAME<span>VAULT</span></a><p class="sidebar-caption">TU BIBLIOTECA PERSONAL</p><nav aria-label="Navegación principal">${links}</nav><div class="sidebar-footer"><span class="status-dot" aria-hidden="true"></span> Biblioteca local</div></aside>`
}
