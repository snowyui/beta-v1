import type {
  ClassesObjectType,
  ReturnStyleType,
  ProxyClassName,
  NonNestObjectType
} from '../../_internal/src'
import { create } from './create'
import { style } from './style'

export class Scoped {
  static create<T extends ClassesObjectType | ProxyClassName>(
    object: T
  ): ReturnStyleType<T> {
    return create(object)
  }
  static style<T extends NonNestObjectType>(object: T): string {
    return style(object)
  }
}
