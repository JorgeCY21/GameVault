const primaryLinks = [
  { href: '#/', label: 'Inicio' },
  { href: '#/explore', label: 'Explorar' },
  { href: '#/library', label: 'Biblioteca' },
  { href: '#/achievements', label: 'Logros' },
  { href: '#/profile', label: 'Perfil' },
]

export function renderNavbar(currentPath) {
  const links = primaryLinks.map(({ href, label }) => {
    const isCurrent = href === `#${currentPath}`
    return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ''}>${label}</a>`
  }).join('')

  return `<header class="site-header"><a class="brand" href="#/" aria-label="GameVault, ir a inicio">GAME<span>VAULT</span></a><nav class="main-nav" aria-label="Navegación principal">${links}</nav></header>`
}
