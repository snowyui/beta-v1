import { isWindowDefined, isDocumentDefined } from '../index'

const isServer = !isWindowDefined || !isDocumentDefined
const styleSheets: Record<string, HTMLStyleElement> = {}
const hashCache: Record<string, string> = {}

function createStyleElement(hash: string): HTMLStyleElement | null {
  if (document.getElementById(hash)) return null

  const styleElement = document.createElement('style')
  styleElement.setAttribute('id', hash)
  styleElement.setAttribute('type', 'text/css')
  styleSheets[hash] = styleElement
  document.head.appendChild(styleElement)

  return styleSheets[hash]
}

export function injectCSS(hash: string, sheet: string) {
  if (isServer) return

  styleCleanUp()
  hashCache[hash] = hash
  const styleElement = createStyleElement(hash)
  if (styleElement == null) return

  const hasClassName = /[^_]/.test(hash)
  const classSheet = (sheet.match(`\\.${hash}\\s*{[^}]+}`) || '')[0]
  const selector = hasClassName ? classSheet : sheet
  styleElement.textContent = selector
}

function styleCleanUp() {
  requestAnimationFrame(() => {
    for (const hash in hashCache) {
      const classElements = document.getElementsByClassName(hash)
      if (classElements.length === 0) {
        removeStyleElement(hashCache[hash])
      }
    }
  })
}

function removeStyleElement(hash: string) {
  if (styleSheets[hash]) {
    delete styleSheets[hash]

    if (hashCache.hasOwnProperty.call(hashCache, hash)) {
      delete hashCache[hash]
    }

    const styleElement = document.getElementById(hash)
    if (styleElement) {
      document.head.removeChild(styleElement)
    }
  }
}
