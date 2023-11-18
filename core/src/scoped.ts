import type {
  ClassesObjectType,
  ReturnStyleType,
  ProxyClassName,
  NonNestObjectType
} from '../../_internal/src'
import { sheet } from './sheet'
import { style } from './style'

export class Scoped {
  static sheet<T extends ClassesObjectType | ProxyClassName>(
    object: T
  ): ReturnStyleType<T> {
    return sheet(object)
  }
  static style<T extends NonNestObjectType>(object: T): string {
    return style(object)
  }
}
