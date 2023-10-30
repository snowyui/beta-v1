import { genBase62Hash, pseudo, isUnderDevelopment } from '..'

import type { PropertyType, StyleType, ReturnType } from '..'

let isMedia: boolean
export function serializer(object: StyleType) {
  // object hex hash haved unique key.
  const base62Hash = genBase62Hash(object)
  // coding case transpile.
  function propConverter(property: string): string {
    return property
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
      .toLowerCase()
  }

  // transpile core.
  const stringConverter = (
    properties: PropertyType,
    className: string
  ): ReturnType => {
    const classSelector: ReturnType = {}
    const space = isMedia ? '\n    ' : '\n  '
    let CSSString = ''

    for (const property in properties) {
      const value = properties[property as keyof PropertyType] as PropertyType

      if (typeof value === 'string' || typeof value === 'number') {
        const CSSProp = propConverter(property)
        const applyValue = typeof value === 'number' ? value + 'px' : value

        CSSString += space + CSSProp + ': ' + applyValue + ';'
      } else if (pseudo.classes.includes(property)) {
        const styles = stringConverter(value, className + ':' + property)
        Object.assign(classSelector, styles)
      } else if (pseudo.elements.includes(property)) {
        const styles = stringConverter(value, className + '::' + property)
        Object.assign(classSelector, styles)
      } else if (property.startsWith('@media')) {
        isMedia = true
        const mediaQuery = stringConverter(value as PropertyType, className)
        const firstMediaQuery = Object.keys(mediaQuery)[0]
        const mediaBlock =
          '\n  ' +
          firstMediaQuery +
          ' { ' +
          mediaQuery[firstMediaQuery] +
          '\n  }'
        classSelector[property] = mediaBlock
        isMedia = false
      }
    }

    classSelector[className] = CSSString
    return classSelector
  }

  let styleSheet = ''
  const keys = Object.keys(object)
  const lastKey = keys[keys.length - 1]
  for (const property in object) {
    const lines = property == lastKey ? '\n' : '\n\n'
    const resultClass = property.replace(/_.*/, '') // under score remove.
    const classSelector = stringConverter(
      object[property],
      '.' + resultClass + '_' + base62Hash
    )
    const firstSelector = Object.keys(classSelector)[0]
    styleSheet += `${firstSelector} {${classSelector[firstSelector]}\n}` + lines
  }

  return { styleSheet, base62Hash }
}
