import { genBase62Hash, pseudo, isInDevelopment, camelToKebabCase } from '..'
import type { PropertiesType, SerializeType, ClassesObjectType } from '../types'

export function serializeSheet(object: ClassesObjectType) {
  const base62Hash = genBase62Hash(object, 5)

  let styleSheet = ''
  let rule = ''
  let mediaRule = ''
  let mediaQueries = ''
  let isMedia: boolean

  const rules = (indent: string, rulesValue: unknown, property: unknown) => {
    if (typeof property !== 'string') return
    const value = (rulesValue as Record<string, unknown>)[property]
    const cssProp = camelToKebabCase(property)
    return indent + cssProp + ': ' + value + ';\n'
  }

  const selector = (
    dot: string,
    colon: string,
    property: string,
    rule: string,
    space?: string
  ) => {
    return dot + colon + property + ' {\n' + rule + space
  }

  const stringConverter = (
    className: string,
    properties: PropertiesType
  ): SerializeType => {
    const classSelector: SerializeType = {}
    const space = isMedia ? '\n    ' : '\n  '
    let cssRule = ''

    for (const property in properties) {
      const value = properties[
        property as keyof PropertiesType
      ] as PropertiesType

      if (typeof value === 'string' || typeof value === 'number') {
        const CSSProp = camelToKebabCase(property)
        const applyValue = typeof value === 'number' ? value + 'px' : value

        cssRule += space + CSSProp + ': ' + applyValue + ';'
      } else if (pseudo.classes.includes(property)) {
        const styles = stringConverter(className + ':' + property, value)
        Object.assign(classSelector, styles)
      } else if (pseudo.elements.includes(property)) {
        const styles = stringConverter(className + '::' + property, value)
        Object.assign(classSelector, styles)
      } else if (property.startsWith('@media')) {
        isMedia = true

        for (const mediaProp in value) {
          const mediaValue = value[
            mediaProp as keyof PropertiesType
          ] as PropertiesType

          if (pseudo.classes.includes(mediaProp)) {
            let pseudoClassRule = ''
            for (const pseudoProp in mediaValue) {
              pseudoClassRule += rules('    ', mediaValue, pseudoProp)
            }
            mediaRule += selector(
              '\n  ' + className,
              ':',
              mediaProp,
              pseudoClassRule,
              '  }\n'
            )
          } else if (pseudo.elements.includes(mediaProp)) {
            let pseudoElementRule = ''
            for (const pseudoProp in mediaValue) {
              pseudoElementRule += rules('    ', mediaValue, pseudoProp)
            }
            mediaRule += selector(
              '\n  ' + className,
              '::',
              mediaProp,
              pseudoElementRule,
              '  }\n'
            )
          } else {
            rule += rules('    ', value, mediaProp)
          }
        }

        if (rule !== '')
          mediaRule += selector('\n  ' + className, '', '', rule, '  }  \n')
        mediaQueries += '\n' + property + ' {' + mediaRule + '}\n\n'
      }

      isMedia = false
    }

    classSelector[className] = cssRule
    return classSelector
  }

  function devmode(property: string) {
    return isInDevelopment ? '' : property
  }

  for (const property in object) {
    const classSelectors = stringConverter(
      '.' + devmode(property) + '_' + base62Hash,
      object[property]
    )

    for (const selector in classSelectors) {
      if (classSelectors[selector] !== '')
        styleSheet += `\n${selector} {${classSelectors[selector]}\n}\n`
    }
    styleSheet += mediaQueries
  }

  return { styleSheet, base62Hash }
}
