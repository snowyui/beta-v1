import { genBase62Hash, pseudo, isUnderDevelopment, camelToKebabCase } from '..'
import type {
  PropertiesType,
  CustomCSSProperties,
  SerializeType,
  ClassesObjectType
} from '..'

let isMedia: boolean
export function serializer(object: ClassesObjectType) {
  const base62Hash = genBase62Hash(object)

  const stringConverter = (
    properties: PropertiesType,
    className: string
  ): SerializeType => {
    const classSelector: SerializeType = {}
    const space = isMedia ? '\n    ' : '\n  '
    let CSSString = ''

    for (const property in properties) {
      const value = properties[
        property as keyof CustomCSSProperties
      ] as PropertiesType

      if (typeof value === 'string' || typeof value === 'number') {
        const CSSProp = camelToKebabCase(property)
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
        const mediaQuery = stringConverter(
          value as CustomCSSProperties,
          className
        )
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
    const lines = property == lastKey ? '\n' : '\n\n' // iranai.
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
