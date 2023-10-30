import type { PropertyType } from '../../_internal/src'

export const mediaQuery = (query: string, secondQuery?: string) => {
  if (secondQuery) {
    return function (target: PropertyType): PropertyType {
      return {
        ['@media screen and (' + query + ') and (' + secondQuery + ')']: target
      }
    }
  } else {
    return function (target: PropertyType): PropertyType {
      return { ['@media screen and' + '(' + query + ')']: target }
    }
  }
}
