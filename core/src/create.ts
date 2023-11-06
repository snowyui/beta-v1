import type {
  ReturnStyleType,
  ProxyClassName,
  ClassesObjectType
} from '../../_internal/src'
import {
  serializer,
  buildIn,
  injectCSS,
  isUnderDevelopment
} from '../../_internal/src'

import module from './style.module.css'

export function create<T extends ClassesObjectType | ProxyClassName>(
  object: T
): ReturnStyleType<T> {
  const { styleSheet, base62Hash } = serializer(object as ClassesObjectType)

  if (!isUnderDevelopment) buildIn(styleSheet)

  return new Proxy<ReturnStyleType<T>>(object as ReturnStyleType<T>, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        if (isUnderDevelopment) injectCSS(object as ClassesObjectType, prop)
        return isUnderDevelopment
          ? prop + '_' + base62Hash
          : module[prop + '_' + base62Hash]
      }
    }
  })
}
