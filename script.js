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
