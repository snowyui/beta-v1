import { isWindowDefined, isDocumentDefined } from '_internal/src'
import { ClassesObjectType } from '_internal/src'

export function injectCSS(object: ClassesObjectType, className: string) {
  const targetElement = document.getElementsByClassName(className)[0]
  if (
    isWindowDefined &&
    isDocumentDefined &&
    targetElement instanceof HTMLElement
  ) {
    const rules = object[className]

    for (const [property, value] of Object.entries(rules)) {
      const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase()
      targetElement.style.setProperty(cssProperty, value)
    }
  }
}
