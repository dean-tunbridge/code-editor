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

function log(msg, type = 'info') {
  const colour =
    type === 'error'
      ? 'var(--err)'
      : type === 'warn'
        ? 'var(--warn)'
        : 'var(--brand)'

  const time = new Date().toLocaleTimeString()

  const line = document.createElement('div')

  line.innerHTML = `<span style="color: ${colour}>[${time}]</span> ${escapeHtml(msg)}`

  out.appendChild(line)
  out.scrollTop = out.scrollHeight
}

function clearOutput() {
  out.innerHTML = ''
}

$('#clear-output')?.addEventListener('click', clearOutput)

function makeEditor(id, mode) {
  const editor = ace.edit(id, {
    theme: 'ace/theme/dracula',
    mode,
    tabSize: 2,
    useSoftTabs: true,
    showPrintMargin: false,
    wrap: true,
  })

  editor.session.setUseWrapMode(true)
  editor.commands({
    name: 'run',
    bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
    exec() {
      runWeb(false)
    },
  })

  editor.commands.addCommand({
    name: 'save',
    bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
    exec() {
      saveProject()
    },
  })

  return editor
}

const editor_html = makeEditor('editor_html', 'ace/theme/html')
const editor_css = makeEditor('editor_css', 'ace/theme/css')
const editor_js = makeEditor('editor_js', 'ace/theme/javascript')

const TAB_ORDER = ['html', 'css', 'js']

const wraps = Object.fromEntries(
  $$('#web-editors .editor-wrap').map((el) => [el.dataset.pane, el]),
)

const editors = {
  html: editor_html,
  css: editor_css,
  js: editor_js,
}

function activePane() {
  const tab = $('#web-tabs .tab.active')

  return tab ? tab.dataset.pane : 'html'
}

function showPane(name) {
  TAB_ORDER.forEach((key) => {
    if (wraps[key]) {
      wraps[key].hidden = key !== name
    }
  })

  $$('#web-tabs .tab').forEach((tab) => {
    const on = tab.dataset.pane === name
    tab.classList.toggle('active', on)
    tab.setAttribute('aria-selected', on)
    tab.tabIndex = on ? 0 : -1
  })

  requestAnimationFrame(() => {
    const editor = editors[name]
    if (editor && editor.resize) {
      editor.resize(true)
      editor.focus()
    }
  })
}

$('#web-tabs')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab')
  if (!btn) {
    return
  }
  showPane(btn.dataset.pane)
})

$('#webTabs')?.addEventListener('keydown', (e) => {
  const index = TAB_ORDER.indexOf(activePane())
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const delta = e.key === 'ArrowLeft' ? -1 : 1
    showPane(TAB_ORDER[(index + delta + TAB_ORDER.length) % TAB_ORDER.length])
    e.preventDefault()
  }
})

showPane('html')

function buildWebSrcdoc(withTests = false) {
  const html = ed_html.getValue()
  const css = ed_css.getValue()
  const js = ed_js.getValue()
  const tests = ($('#test-area')?.value || '').trim()

  return `<!doctype html>
  
    <html lang="en" dir="ltr">
  
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">

        <style>${css}\n</style>
      </head>

      <body>
        ${html}

      <script>

        try{
           ${js}
          ${withTests && tests ? `\n/* tests */\n${tests}` : ''}
            } catch (e){console.error(e)}<\/script>

      </body>

    </html>`
}

function runWeb(withTests = false) {
  preview.srcdoc = buildWebSrcdoc(withTests)
  log(withTests ? 'Run with tests.' : 'Web preview updated.')
}

$('#run-web')?.addEventListener('click', () => runWeb(false))

$('#run-tests')?.addEventListener('click', () => runWeb(true))

$('#open-preview')?.addEventListener('click', () => {
  const src = buildWebSrcdoc(false)

  const w = window.open('about:blank')

  w.document.open()
  w.document.write(src)
  w.document.close()
})

function projectJSON() {
  return {
    version: 1,
    kind: 'web-only',
    assignment: $('#assignment')?.value || '',
    test: $('#test-area')?.value || '',
    html: ed_html.getValue(),
    css: ed_css.getValue(),
    js: ed_js.getValue(),
  }
}

function loadProject(obj) {
  try {
    if ($('#assignment')) $('#assignment').value = obj.assignment || ''
    if ($('#test-area')) $('#test-area').value = obj.test || ''
    editor_html.setValue(obj.html) || ''
    editor_css.setValue(obj.css) || ''
    editor_js.setValue(obj.js) || ''
  } catch (err) {}
}
