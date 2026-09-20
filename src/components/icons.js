const paths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4-4"/>',
  library: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 2v4m8-4v4M8 10h8m-8 4h5"/>',
  user: '<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H4v1a4 4 0 0 0 4 4m8-5h4v1a4 4 0 0 1-4 4m-4 2v4m-3 4h6m-8 0h10"/>',
  gamepad: '<path d="M7 9h10a4 4 0 0 1 3.8 5.2l-1 3a2 2 0 0 1-3.2.9L14 16H10l-2.6 2.1a2 2 0 0 1-3.2-.9l-1-3A4 4 0 0 1 7 9Z"/><path d="M7 13v4m-2-2h4m8-1h.01M19 16h.01"/>',
  heart: '<path d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
  crown: '<path d="m4 8 4 4 4-7 4 7 4-4-2 11H6Z"/><path d="M6 21h12"/>',
  medal: '<circle cx="12" cy="15" r="5"/><path d="m8 3 4 4 4-4 2 6H6Z"/>',
  sparkles: '<path d="m12 3 .9 4.1L17 8l-4.1.9L12 13l-.9-4.1L7 8l4.1-.9ZM19 15l.5 2.5L22 18l-2.5.5L19 21l-.5-2.5L16 18l2.5-.5Z"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
}

export function icon(name, className = '') {
  const path = paths[name] || paths.gamepad
  return `<svg class="icon icon-${name} ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`
}
