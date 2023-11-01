import type { NonNestObjectType } from '../../_internal/src'
import {
  serializer,
  buildIn,
  insertionCSS,
  isUnderDevelopment,
  genBase62Hash,
  camelToKebabCase
} from '../../_internal/src'
import module from './style.module.css'

export function styling<T extends NonNestObjectType>(object: T): string {
  const base62Hash = genBase62Hash(object)
  let styleSheet = ''
  let cssRule = ''
  for (const property in object) {
    const value = object[property]
    const CSSProp = camelToKebabCase(property)
    cssRule += '  ' + CSSProp + ': ' + value + ';\n'
  }
  styleSheet = '._' + base62Hash + ' {\n' + cssRule + '}'
  console.log(styleSheet)
  if (isUnderDevelopment) insertionCSS(styleSheet)
  if (!isUnderDevelopment) buildIn(styleSheet)
  if (isUnderDevelopment)
    console.log('...💫(Melty Prop devloping mode)\n\n' + styleSheet)
  return isUnderDevelopment ? '_' + base62Hash : module[base62Hash]
}
