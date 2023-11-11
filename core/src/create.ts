import type {
  ReturnStyleType,
  ProxyClassName,
  ClassesObjectType
} from '../../_internal/src'
import {
  serializeCreate as serializer,
  buildIn,
  injectCSS,
  isInDevelopment
} from '../../_internal/src'

import module from './style.module.css'

export function create<T extends ClassesObjectType | ProxyClassName>(
  object: T
): ReturnStyleType<T> {
  const { styleSheet, base62Hash } = serializer(object as ClassesObjectType)

  if (isInDevelopment) buildIn(styleSheet)

  return new Proxy<T>(object, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        if (isInDevelopment)
          injectCSS(object as ClassesObjectType, prop, base62Hash, styleSheet)
        return isInDevelopment
          ? prop + '_' + base62Hash
          : module[prop + '_' + base62Hash]
      }
    }
  }) as ReturnStyleType<T>
}
