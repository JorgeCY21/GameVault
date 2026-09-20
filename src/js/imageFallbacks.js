export function setupImageFallbacks() {
  document.addEventListener('error', (event) => {
    const image = event.target
    if (!(image instanceof HTMLImageElement) || !image.closest('#app')) return

    const fallback = document.createElement('span')
    fallback.className = 'image-fallback'
    fallback.setAttribute('aria-hidden', 'true')
    fallback.innerHTML = icon('gamepad')
    image.replaceWith(fallback)
  }, true)
}
import { icon } from '../components/icons.js'
