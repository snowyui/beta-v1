import type {
  ClassesObjectType,
  ReturnStyleType,
  ProxyClassName,
  NonNestObjectType
} from '../../_internal/src'
import { create } from './create'
import { styling } from './style'

export class Scoped {
  static classes<T extends ClassesObjectType | ProxyClassName>(
    object: T
  ): ReturnStyleType<T> {
    return create(object)
  }
  static style<T extends NonNestObjectType>(object: T): string {
    return styling(object)
  }
}
