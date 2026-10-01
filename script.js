// UTILS //
const $ = (el) => document.querySelector(el)
const $$ = (el) => Array.from(document.querySelectorAll(el))
const out = $('#output')
const preview = $('#preview')
const STORAGE_KEY = 'local-storage'

const escapeHtml = (el) =>
  String(el).replace(
    /[&<>"]/g,
    (char) =>
      ({
        '&': '&amp;',

        '<': '&lt;',

        '>': '&gt;',

        '"': '&quot;',
      })[char],
  )

function log(message, type = 'info') {
  const colour =
    type === 'error'
      ? 'var(--err)'
      : type === 'warn'
        ? 'var(--warn)'
        : 'var(--brand)'

  const time = new Date().toLocaleTimeString()

  const line = document.createElement('div')

  line.innerHTML = `<span style="color: ${colour}>[${time}]</span> ${escapeHtml(message)}`
}
