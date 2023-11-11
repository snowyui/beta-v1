import type { NonNestObjectType } from '../../_internal/src'
import {
  isInDevelopment,
  buildIn,
  injectCSS,
  serializeStyle as serializer
} from '../../_internal/src'
import module from './style.module.css'

export function style<T extends NonNestObjectType>(object: T): string {
  const { styleSheet, base62Hash } = serializer(object)

  if (isInDevelopment) buildIn(styleSheet)

  return isInDevelopment ? '_' + base62Hash : module[base62Hash]
}
