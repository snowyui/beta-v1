import type {
  ReturnStyleType,
  ProxyClassName,
  ClassesObjectType
} from '../../_internal/src'
import {
  serializeSheet as serializer,
  buildIn,
  injectCSS,
  isInDevelopment,
  isWindowDefined
} from '../../_internal/src'

import module from './style.module.css'

export function sheet<T extends ClassesObjectType | ProxyClassName>(
  object: T
): ReturnStyleType<T> {
  const { styleSheet, base62Hash } = serializer(object as ClassesObjectType)

  if (isInDevelopment && !isWindowDefined) {
    buildIn(styleSheet)
  }

  if (isInDevelopment) injectCSS(base62Hash, styleSheet)

  return new Proxy<T>(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        return isInDevelopment
          ? prop + '_' + base62Hash
          : module[prop + '_' + base62Hash]
      }
    }
  }) as ReturnStyleType<T>
}
