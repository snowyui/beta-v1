export type ReturnType = Record<string, string>

export type StyleType = {
  [key: string]: PropertyType
}

export type ReturnStyleType<T> = { [key in keyof T]: string }
export type ProxyClassName = { any: string | [key: string] }

type CSSProperties = React.CSSProperties
export interface PropertyType extends CSSProperties {
  link?: CSSProperties
  visited?: CSSProperties
  hover?: CSSProperties
  active?: CSSProperties
  firstChild?: CSSProperties
  lastChild?: CSSProperties
  firstLine?: CSSProperties
  lastLine?: CSSProperties
  firstLetter?: CSSProperties
  lastLetter?: CSSProperties
  before?: CSSProperties
  after?: CSSProperties
}

export interface AnimationConfig {
  animates: {
    styles: {
      base: string
      going?: string
      coming?: string
      viewing?: string
    }
    times: {
      going?: number
      coming?: number
      viewing?: number
    }
  }
}
