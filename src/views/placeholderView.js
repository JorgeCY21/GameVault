const viewDetails = {
  home: { title: 'Bienvenido a GameVault', text: 'Tu resumen personal de videojuegos aparecerá aquí cuando empieces a crear tu biblioteca.' },
  explore: { title: 'Explorar videojuegos', text: 'Pronto podrás descubrir títulos reales, buscar por nombre y recorrer categorías.' },
  library: { title: 'Mi biblioteca', text: 'Los juegos que guardes en GameVault se organizarán en este espacio.' },
  achievements: { title: 'Tus logros', text: 'Aquí se mostrará tu progreso como jugador y los retos que vayas desbloqueando.' },
  profile: { title: 'Perfil y estadísticas', text: 'Las estadísticas de tu colección se calcularán automáticamente aquí.' },
  game: { title: 'Detalle del videojuego', text: 'Esta pantalla mostrará la ficha completa del juego que selecciones.' },
  progress: { title: 'Actualizar progreso', text: 'Aquí registrarás tu avance, horas jugadas, puntuación y notas.' },
}

export function renderPlaceholderView(viewName) {
  const view = viewDetails[viewName]
  return `<section class="view" aria-labelledby="view-title"><h1 id="view-title">${view.title}</h1><p class="view-description">${view.text}</p><div class="empty-state"><span class="empty-state-icon">${icon('gamepad')}</span><h2>Todo listo para empezar</h2><p>Esta vista ya forma parte de la navegación de GameVault.</p></div></section>`
}
import { icon } from '../components/icons.js'
