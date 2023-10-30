import type {
  StyleType,
  ReturnStyleType,
  ProxyClassName
} from '../../_internal/src'
import {
  serializer,
  buildIn,
  insertionCSS,
  isUnderDevelopment
} from '../../_internal/src'

import module from './style.module.css'

export function create<T extends StyleType | ProxyClassName>(
  object: T
): ReturnStyleType<T> {
  const { styleSheet, base62Hash } = serializer(object as StyleType)
  if (isUnderDevelopment) insertionCSS(styleSheet)
  if (!isUnderDevelopment) buildIn(styleSheet)

  return new Proxy<ProxyClassName>(object as ProxyClassName, {
    get: function (target, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        return isUnderDevelopment
          ? prop + '_' + base62Hash
          : module[prop + '_' + base62Hash]
      }
    }
  }) as ReturnStyleType<T>
}
