import type { RootType } from '../../_internal/src'
import {
  isInDevelopment,
  isWindowDefined,
  buildIn,
  serializeStyle as serializer,
  injectCSS
} from '../../_internal/src'

export function root<T extends RootType>(object: T): void {
  const { styleSheet, base62Hash } = serializer(object)

  if (isInDevelopment && !isWindowDefined) {
    buildIn(styleSheet)
  }

  if (isInDevelopment) injectCSS(base62Hash, styleSheet)
}
