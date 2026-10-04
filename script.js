// UTILS //
const $ = (el) => document.querySelector(el)
const $$ = (el) => Array.from(document.querySelectorAll(el))
const out = $('#output')
const preview = $('#preview')
const STORAGE_KEY = 'local-storage'

// LESSON DATA //
let lessonData

async function loadLessons() {
  const response = await fetch('data.json')
  lessonData = await response.json()
  console.log(lessonData)
}

loadLessons()

// RENDER LESSONS //
function renderLessonList() {
  const container = $('#lesson-list')

  // clear existing content

  // loop through lessonData.categories

  // create a category heading for each category

  // create a container for its lessons
}

// BUTTON //
const button = document.createElement('button')

// SPECIAL CHARS //
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

// OUTPUT LOG //
function log(msg, type = 'info') {
  const colour =
    type === 'error'
      ? 'var(--err)'
      : type === 'warn'
        ? 'var(--warn)'
        : 'var(--brand)'

  const time = new Date().toLocaleTimeString()

  const line = document.createElement('div')

  line.innerHTML = `<span style="color: ${colour}">[${time}]</span> ${escapeHtml(msg)}`
  out.appendChild(line)
  out.scrollTop = out.scrollHeight
}

function clearOutput() {
  out.innerHTML = ''
}

$('#clear-output')?.addEventListener('click', clearOutput)

// EDITOR //
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
  editor.commands.addCommand({
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

const editor_html = makeEditor('editor_html', 'ace/mode/html')
const editor_css = makeEditor('editor_css', 'ace/mode/css')
const editor_js = makeEditor('editor_js', 'ace/mode/javascript')

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

// EVENT LISTENERS (TABS)
$('#web-tabs')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab')
  if (!btn) {
    return
  }
  showPane(btn.dataset.pane)
})

$('#web-tabs')?.addEventListener('keydown', (e) => {
  const index = TAB_ORDER.indexOf(activePane())
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const delta = e.key === 'ArrowLeft' ? -1 : 1
    showPane(TAB_ORDER[(index + delta + TAB_ORDER.length) % TAB_ORDER.length])
    e.preventDefault()
  }
})

showPane('html')

function buildWebSrcdoc(withTests = false) {
  const html = editor_html.getValue()
  const css = editor_css.getValue()
  const js = editor_js.getValue()
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
    html: editor_html.getValue(),
    css: editor_css.getValue(),
    js: editor_js.getValue(),
  }
}

// LOAD PROJECT //
function loadProject(obj) {
  try {
    if ($('#assignment')) $('#assignment').value = obj.assignment || ''
    if ($('#test-area')) $('#test-area').value = obj.test || ''
    editor_html.setValue(obj.html || '', -1)
    editor_css.setValue(obj.css || '', -1)
    editor_js.setValue(obj.js || '', -1)

    log('Web Project loaded')
  } catch (err) {
    log(`Unable to load project: ${err}`, 'error')
  }
}

// SET DEFAULT //
function setDefaultContent() {
  editor_html.setValue(
    `<!-- Welcome card -->
<section
  class="card"
  style="
    max-width: 520px;
    margin: 24px auto;
    padding: 18px;
    text-align: center;
  "
>
  <h1>Hello World</h1>
  <p>This example runs locally in the browser.</p>
  <button id="btn">Try me</button>
</section>`,
    -1,
  )

  editor_css.setValue(
    `body {
  font-family: system-ui;
  background: #f7fafc;
  margin: 0;
}

h1 {
  color: #0f172a;
}

#btn {
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 10px;
  background: #60a5fa;
  color: #08111f;
  font-weight: 700;
}`,
    -1,
  )

  editor_js.setValue(
    `document.getElementById('btn').addEventListener('click', () => {
  alert('Well done!');
});

console.log('Hello from JavaScript!');`,
    -1,
  )
}

// SAVE //
function saveProject() {
  try {
    const data = JSON.stringify(projectJSON(), null, 2)
    localStorage.setItem(STORAGE_KEY, data)
    const blob = new Blob([data], { type: 'application/json' })
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(blob)
    anchor.download = 'local-save.json'
    anchor.click()
    log('Saved locally and downloaded JSON file.')
  } catch (err) {
    log('Unable to save: ' + err, 'error')
  }
}

// EVENT LISTENERS //
$('#save-button')?.addEventListener('click', saveProject)
$('#load-button')?.addEventListener('click', () => $('#open-file').click())
$('#open-file')?.addEventListener('change', async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    const obj = JSON.parse(await file.text())
    loadProject(obj)
  } catch (err) {
    log('Invalid project file', 'error')
  }
})

// INIT LOAD //
try {
  const cache = localStorage.getItem(STORAGE_KEY)
  if (cache) {
    loadProject(JSON.parse(cache))
  } else {
    setDefaultContent()
  }
} catch {
  setDefaultContent()
}

log('Ready — Code Editor (HTML/CSS/JS)')
