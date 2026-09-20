const viewDetails = {
  home: { eyebrow: 'VISTA 01', title: 'Bienvenido a GameVault', text: 'Tu resumen personal de videojuegos aparecerá aquí cuando empieces a crear tu biblioteca.' },
  explore: { eyebrow: 'VISTA 02', title: 'Explorar videojuegos', text: 'Pronto podrás descubrir títulos reales, buscar por nombre y recorrer categorías.' },
  library: { eyebrow: 'VISTA 04', title: 'Mi biblioteca', text: 'Los juegos que guardes en GameVault se organizarán en este espacio.' },
  achievements: { eyebrow: 'VISTA 06', title: 'Tus logros', text: 'Aquí se mostrará tu progreso como jugador y los retos que vayas desbloqueando.' },
  profile: { eyebrow: 'VISTA 07', title: 'Perfil y estadísticas', text: 'Las estadísticas de tu colección se calcularán automáticamente aquí.' },
  game: { eyebrow: 'VISTA 03', title: 'Detalle del videojuego', text: 'Esta pantalla mostrará la ficha completa del juego que selecciones.' },
  progress: { eyebrow: 'VISTA 05', title: 'Actualizar progreso', text: 'Aquí registrarás tu avance, horas jugadas, puntuación y notas.' },
}

export function renderPlaceholderView(viewName) {
  const view = viewDetails[viewName]
  return `<section class="view" aria-labelledby="view-title"><p class="eyebrow">${view.eyebrow}</p><h1 id="view-title">${view.title}</h1><p class="view-description">${view.text}</p><div class="empty-state"><span class="empty-state-icon">${icon('gamepad')}</span><h2>Todo listo para empezar</h2><p>Esta vista ya forma parte de la navegación de GameVault.</p></div></section>`
}
import { icon } from '../components/icons.js'
