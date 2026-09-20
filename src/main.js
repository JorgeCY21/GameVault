import './styles/global.css'
import './styles/components.css'
import './styles/responsive.css'
import { setupImageFallbacks } from './js/imageFallbacks.js'
import { startRouter } from './js/router.js'

setupImageFallbacks()
startRouter(document.querySelector('#app'))
