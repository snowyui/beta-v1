import type { NonNestObjectType, ClassesObjectType } from '../../_internal/src'

export const media = (query: string, secondary?: string) => {
  if (secondary) {
    return (
      target: NonNestObjectType
    ): NonNestObjectType | ClassesObjectType => {
      const result = {
        ['@media (' + query + ') and (' + secondary + ')']: target
      }
      return result
    }
  } else {
    return (
      target: NonNestObjectType
    ): NonNestObjectType | ClassesObjectType => {
      const result = { ['@media (' + query + ')']: target }
      return result
    }
  }
}
