# Material para el informe — GameVault

> Este documento prepara el contenido del informe académico. No sustituye el PDF final ni incluye nombres de integrantes inventados.

## 1. Datos del proyecto

- **Curso:** Plataformas Emergentes
- **Laboratorio:** PE Lab 03
- **Proyecto:** GameVault
- **Integrantes:** Pendiente de completar por el equipo.

## 2. Objetivo de la aplicación

Desarrollar una aplicación web local, responsive y orientada a dispositivos móviles que permita al usuario descubrir videojuegos reales y gestionar una biblioteca personal. GameVault integra datos externos de RAWG con información propia almacenada localmente, como el estado de juego, progreso, horas, puntuación y notas.

## 3. Tecnologías utilizadas

| Tecnología | Uso en GameVault |
| --- | --- |
| HTML5 | Estructura semántica de vistas, formularios y navegación. |
| CSS3 | Diseño mobile-first, Flexbox, Grid, media queries, transiciones y accesibilidad visual. |
| JavaScript | Renderizado dinámico, router hash, validaciones, estadísticas, logros y eventos. |
| Vite | Servidor local de desarrollo y compilación de producción. |
| RAWG API | Obtención de videojuegos, géneros, detalles y screenshots reales. |
| localStorage | Persistencia de la biblioteca personal sin backend. |
| Git / GitHub | Control de versiones y publicación del repositorio. |

## 4. Descripción breve de la solución

GameVault se construyó como una aplicación de página única con JavaScript vanilla. El router utiliza hashes para cambiar entre vistas sin recargar el documento completo. La comunicación con RAWG está centralizada en un servicio, mientras que las operaciones locales se concentran en un módulo de almacenamiento.

La aplicación separa dos tipos de información:

- **Datos externos:** nombre, portada, géneros, plataformas, rating, fecha de lanzamiento y screenshots obtenidos desde RAWG.
- **Datos personales:** estado, progreso, horas, puntuación, notas y fechas de actualización guardados con `localStorage`.

## 5. Arquitectura

```text
Usuario
  │
  ├── Navegación hash (router.js)
  │       │
  │       └── Vistas: Inicio, Explorar, Detalle, Biblioteca,
  │           Progreso, Logros y Perfil
  │
  ├── rawgApi.js ── fetch() ──> RAWG API
  │
  └── storage.js ──> localStorage
          │
          ├── achievements.js
          └── stats.js
```

### Responsabilidad de los módulos principales

| Módulo | Responsabilidad |
| --- | --- |
| `router.js` | Detecta la ruta hash y renderiza la vista correspondiente. |
| `rawgApi.js` | Centraliza solicitudes a RAWG y el uso de la API key. |
| `storage.js` | Añade, consulta, actualiza, elimina y cambia el estado de juegos guardados. |
| `achievements.js` | Calcula logros a partir de datos reales de biblioteca. |
| `stats.js` | Calcula totales, promedio, géneros, XP y nivel. |
| `components/` | Reutiliza tarjetas, navegación, sidebar e íconos SVG. |

## 6. Funcionalidades implementadas

1. **Inicio:** saludo dinámico, conteos por estado, partidas en curso y nivel.
2. **Explorar:** juegos populares, búsqueda, géneros, carga, errores y resultados vacíos.
3. **Detalle:** ficha del videojuego, Metacritic cuando existe, plataformas, capturas y estados de incorporación.
4. **Biblioteca:** búsqueda local, filtros, progreso, horas, cambio de estado y eliminación.
5. **Progreso:** validación de porcentaje, horas, puntuación y notas.
6. **Logros:** ocho retos internos con estado desbloqueado o avance parcial.
7. **Perfil:** estadísticas, distribución de géneros, XP y nivel.

## 7. Flujo principal para demostrar

1. Ir a **Explorar**.
2. Buscar `Resident Evil 4`.
3. Abrir el resultado deseado.
4. Añadirlo como **Jugando**.
5. Abrir **Biblioteca** y elegir **Actualizar**.
6. Registrar 72% de progreso, 34 horas, puntuación 9 y una nota breve.
7. Volver a **Inicio** para observar la partida activa.
8. Consultar **Logros** y **Perfil** para mostrar el recálculo automático.

## 8. Guion de capturas de pantalla

Antes de capturar, asegúrense de tener una API key RAWG configurada y al menos un videojuego guardado. Usen el mismo conjunto de datos durante todas las capturas para que el informe sea coherente.

| Archivo sugerido | Vista / ruta | Tamaño recomendado | Evidencia que muestra |
| --- | --- | --- | --- |
| `01-home-mobile.png` | `#/` | móvil, 390 px de ancho | Dashboard, conteos y navegación inferior. |
| `02-explore.png` | `#/explore` | escritorio | Juegos populares, buscador, categorías y atribución RAWG. |
| `03-search-resident-evil.png` | `#/explore` con búsqueda `Resident Evil 4` | escritorio | Consumo de API y resultados dinámicos. |
| `04-game-detail.png` | `#/game/:id` | escritorio | Descripción, rating, Metacritic, plataformas, estados y screenshots. |
| `05-library.png` | `#/library` | escritorio | Juegos guardados, filtro, progreso y acciones. |
| `06-progress-form.png` | `#/progress/:id` | escritorio | Campos validados de progreso, horas, puntuación y notas. |
| `07-achievements.png` | `#/achievements` | escritorio | Logros bloqueados, desbloqueados y barras de avance. |
| `08-profile.png` | `#/profile` | escritorio | Estadísticas, XP, nivel y distribución de géneros. |
| `09-desktop-layout.png` | cualquier vista con contenido | escritorio | Sidebar y adaptación del layout a pantalla amplia. |

## 9. Puntos para la exposición

### Cómo se evita duplicar videojuegos

Antes de añadir un juego, `storage.js` compara el ID de RAWG con los IDs ya guardados en la biblioteca. Si el ID existe, la interfaz informa el estado actual y desactiva las opciones para añadirlo nuevamente.

### Cómo se guardan los datos sin backend

La aplicación serializa el arreglo de juegos personales en formato JSON dentro de `localStorage`. Al recargar, `storage.js` lee y valida ese arreglo antes de mostrarlo en las vistas.

### Cómo se calculan los logros y estadísticas

No se guardan logros ni estadísticas por separado. Cada vez que se consultan, se calculan desde los juegos guardados: estados, horas, puntuaciones y géneros. Esto evita inconsistencias entre pantallas.

### Cómo funciona el responsive design

El CSS parte de tamaños móviles. En pantalla pequeña se usa navegación inferior; desde el breakpoint de escritorio se muestra un sidebar. La organización de tarjetas y formularios cambia mediante CSS Grid y media queries.

## 10. Conclusiones propuestas

Adapten estas conclusiones después de la demostración final:

1. El proyecto permitió aplicar HTML, CSS y JavaScript en una aplicación funcional sin depender de un framework frontend.
2. La separación entre servicio API, almacenamiento local, vistas y componentes facilitó mantener el código organizado y explicable.
3. `localStorage` resultó suficiente para una biblioteca personal local, aunque una futura versión podría incorporar autenticación y sincronización con un backend.
4. El diseño mobile-first permitió adaptar la experiencia a celular y escritorio con una navegación diferente en cada contexto.
5. Las estadísticas, logros y XP muestran cómo datos simples registrados por el usuario pueden transformarse en una experiencia más motivadora.

## 11. Limitaciones y trabajo futuro

- La biblioteca se guarda únicamente en el navegador actual.
- Se requiere una API key de RAWG para consultar datos reales.
- No existe autenticación ni sincronización entre dispositivos.
- Posibles mejoras: backend, cuentas de usuario, sincronización en la nube, filtros adicionales y exportación de la biblioteca.

## 12. Referencias

- Vite. (s. f.). *Getting Started*. https://vite.dev/guide/
- MDN Web Docs. (s. f.). *Fetch API*. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN Web Docs. (s. f.). *Window: localStorage property*. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN Web Docs. (s. f.). *Using media queries*. https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using
- RAWG. (s. f.). *RAWG Video Games Database API*. https://api.rawg.io/docs/
