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

$('#clearOutput')?.addEventListener('click', clearOut)

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
const editor_js = makeEditor('editor_js', 'ace/theme/js')
