import { genBase62Hash, camelToKebabCase, pseudo, isInDevelopment } from '..'
import type { NonNestObjectType } from '..'

export function serializeStyle<T extends NonNestObjectType>(object: T) {
  const base62Hash = genBase62Hash(object, 6)

  let styleSheet = ''
  let cssRule = ''
  let rule = ''
  let pseudoElements = ''
  let pseudoClasses = ''
  let mediaQueries = ''

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
    return dot + '_' + base62Hash + colon + property + ' {\n' + rule + space
  }

  for (const property in object) {
    const value = object[property]

    if (property.startsWith('@media')) {
      let mediaRule = ''

      const keys = Object.keys(value as object)
      const lastKey = keys[keys.length - 1]

      for (const mediaProp in value) {
        const mediaValue = value[mediaProp]
        const endNoLine = mediaProp === lastKey ? '\n' : '\n\n'

        if (pseudo.classes.includes(mediaProp)) {
          let pseudoClassRule = ''
          for (const pseudoProp in mediaValue) {
            pseudoClassRule += rules('    ', mediaValue, pseudoProp)
          }
          mediaRule += selector(
            '  .',
            ':',
            mediaProp,
            pseudoClassRule,
            '  }  ' + endNoLine
          )
        } else if (pseudo.elements.includes(mediaProp)) {
          let pseudoElementRule = ''
          for (const pseudoProp in mediaValue) {
            pseudoElementRule += rules('    ', mediaValue, pseudoProp)
          }
          mediaRule += selector(
            '  .',
            '::',
            mediaProp,
            pseudoElementRule,
            '  }  ' + endNoLine
          )
        } else {
          rule += rules('    ', value, mediaProp)
        }
      }
      if (rule !== '') mediaRule += selector('  .', '', '', rule, '  }  \n')
      mediaQueries += '\n' + property + ' {\n' + mediaRule + '}\n'
    } else if (pseudo.classes.includes(property)) {
      let pseudoClassesRule = ''
      for (const pseudoProp in value) {
        pseudoClassesRule += rules('  ', value, pseudoProp)
      }
      pseudoClasses += selector('\n.', ':', property, pseudoClassesRule, '}\n')
    } else if (pseudo.elements.includes(property)) {
      let pseudoElementRule = ''
      for (const pseudoProp in value) {
        pseudoElementRule += rules('  ', value, pseudoProp)
      }
      pseudoElements += selector(
        '\n.',
        '::',
        property,
        pseudoElementRule,
        '}\n'
      )
    } else {
      const cssProp = camelToKebabCase(property)
      cssRule += '  ' + cssProp + ': ' + value + ';\n'
    }

    if (cssRule !== '')
      styleSheet = '\n._' + base62Hash + ' {\n' + cssRule + '}\n'
  }

  styleSheet += pseudoClasses + pseudoElements + mediaQueries

  if (isInDevelopment)
    console.log('.....💫 Melt Scoped CSS style .....' + styleSheet)
  return { styleSheet, base62Hash }
}
