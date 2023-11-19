import type { ClassesObjectType } from '../../_internal/src'
import {
  isInDevelopment,
  isWindowDefined,
  buildIn,
  injectCSS,
  serializeCreate as serializer
} from '../../_internal/src'

export function core<T extends ClassesObjectType>(object: T): void {
  const { styleSheet, base62Hash } = serializer(object)

  if (isInDevelopment && !isWindowDefined) {
    buildIn(styleSheet)
  }

  if (isInDevelopment) injectCSS(base62Hash, styleSheet)
}
