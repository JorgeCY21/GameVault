# GameVault

GameVault es una aplicación web responsive para organizar una biblioteca personal de videojuegos. Permite descubrir títulos reales con RAWG, añadirlos a una colección local, registrar el progreso de cada partida y consultar estadísticas, nivel y logros propios.

El proyecto fue desarrollado para el laboratorio **PE Lab 03** del curso Plataformas Emergentes.

## Características

- Interfaz mobile-first con navegación inferior en celular y sidebar en escritorio.
- Dashboard dinámico con resumen de la biblioteca y partidas en curso.
- Exploración de videojuegos reales con la API de RAWG.
- Búsqueda por nombre, categorías por género y tarjetas reutilizables.
- Vista de detalle con portada, descripción, rating, Metacritic, fecha, géneros, plataformas y screenshots.
- Biblioteca personal persistente en `localStorage`.
- Filtros, búsqueda local, cambio de estado y eliminación de videojuegos.
- Registro de progreso, horas, puntuación personal y notas.
- Logros internos calculados a partir de la actividad real del usuario.
- Perfil con estadísticas, distribución de géneros, XP y nivel.
- Estados de carga, error, ausencia de resultados, ausencia de API key e imágenes faltantes.
- Accesibilidad básica: etiquetas, foco visible, botones semánticos y soporte para movimiento reducido.

## Tecnologías

- HTML5
- CSS3
- JavaScript (ES Modules)
- [Vite](https://vite.dev/)
- [RAWG Video Games Database API](https://rawg.io/apidocs)
- `localStorage`
- Git y GitHub

## Requisitos

- Node.js compatible con la versión de Vite instalada.
- npm.
- Una API key de RAWG para consultar videojuegos reales.

## Instalación

Clona el repositorio cuando tengas su URL de GitHub:

```bash
git clone URL_DEL_REPOSITORIO
cd GameVault
npm install
```

Crea un archivo llamado `.env` en la raíz del proyecto a partir de `.env.example`:

```env
VITE_RAWG_API_KEY=TU_API_KEY_DE_RAWG
```

> `.env` está incluido en `.gitignore`; no se debe subir una clave real al repositorio.

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Para generar una compilación de producción:

```bash
npm run build
```

Para previsualizar la compilación:

```bash
npm run preview
```

## Uso

1. Abre **Explorar** y busca un videojuego o selecciona un género.
2. Abre una tarjeta para consultar su detalle.
3. Selecciona un estado para añadirlo a GameVault.
4. En **Biblioteca**, filtra o busca tus juegos y selecciona **Actualizar**.
5. Registra el progreso, horas, puntuación y notas.
6. Consulta los cambios en **Inicio**, **Logros** y **Perfil**.

## Vistas y rutas

| Vista | Ruta | Descripción |
| --- | --- | --- |
| Inicio | `#/` | Resumen dinámico y partidas en curso. |
| Explorar | `#/explore` | Búsqueda, categorías y juegos populares de RAWG. |
| Detalle | `#/game/:id` | Información completa de un videojuego. |
| Biblioteca | `#/library` | Juegos guardados, filtros y acciones locales. |
| Progreso | `#/progress/:id` | Formulario para actualizar datos personales. |
| Logros | `#/achievements` | Retos internos y avance calculado. |
| Perfil | `#/profile` | Estadísticas, XP, nivel y géneros. |

## Persistencia local

GameVault no utiliza backend. Los datos personales se almacenan en el navegador mediante `localStorage`, bajo la clave `gamevault-library`.

La información personal se conserva separada de los datos obtenidos desde RAWG. Cada juego guardado incluye, entre otros, su ID, nombre, portada, géneros, estado, progreso, horas, puntuación, notas y fechas de actualización.

## Estructura del proyecto

```text
GameVault/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── achievementCard.js
│   │   ├── gameCard.js
│   │   ├── icons.js
│   │   ├── libraryCard.js
│   │   ├── navbar.js
│   │   └── sidebar.js
│   ├── js/
│   │   ├── achievements.js
│   │   ├── imageFallbacks.js
│   │   ├── router.js
│   │   ├── stats.js
│   │   └── storage.js
│   ├── services/
│   │   └── rawgApi.js
│   ├── styles/
│   │   ├── components.css
│   │   ├── global.css
│   │   └── responsive.css
│   ├── views/
│   └── main.js
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Integrantes

Pendiente de completar por el equipo.

## Atribución de RAWG

GameVault muestra una atribución y enlace activo a RAWG en las vistas que utilizan sus datos e imágenes. Consulta los [términos de uso de RAWG](https://rawg.io/apidocs) antes de publicar o distribuir el proyecto.

## Referencias

- [Vite — Getting Started](https://vite.dev/guide/)
- [MDN — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN — Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN — Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)
- [RAWG Video Games Database API](https://api.rawg.io/docs/)

## Material para informe

El guion de exposición, la arquitectura, las conclusiones propuestas y la lista de capturas se encuentran en [docs/MATERIAL_INFORME.md](docs/MATERIAL_INFORME.md).
