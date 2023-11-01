import type { CustomCSSProperties } from '../../_internal/src'

export const mediaQuery = (query: string, secondQuery?: string) => {
  if (secondQuery) {
    return function (target: CustomCSSProperties): CustomCSSProperties {
      return { ['@media (' + query + ') and (' + secondQuery + ')']: target }
    }
  } else {
    return function (target: CustomCSSProperties): CustomCSSProperties {
      return { ['@media (' + query + ')']: target }
    }
  }
}
