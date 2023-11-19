import type {
  ClassesObjectType,
  ReturnStyleType,
  ProxyClassName,
  NonNestObjectType,
  RootType
} from '../../_internal/src'
import { sheet } from './sheet'
import { style } from './style'
import { core } from './core'
import { root } from './root'

export class Scoped {
  static sheet<T extends ClassesObjectType | ProxyClassName>(
    object: T
  ): ReturnStyleType<T> {
    return sheet(object)
  }
  static style<T extends NonNestObjectType>(object: T): string {
    return style(object)
  }
  static core<T extends ClassesObjectType>(object: T): void {
    return core(object)
  }
  static root<T extends RootType>(object: T): void {
    return root(object)
  }
}
