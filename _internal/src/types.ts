import type { CSSProperties } from 'react'

// -------------------------- defined string Integer unit --//
type CSSUnit =
  | 'px'
  | 'em'
  | 'rem'
  | '%'
  | 'vh'
  | 'vw'
  | 'vmin'
  | 'vmax'
  | 'cm'
  | 'mm'
  | 'in'
  | 'pt'
  | 'pc'
  | 'ex'
  | 'ch'
export type CSSNumericValue = '0' | `${number}${CSSUnit}`
type CSSPropertiesValues =
  | CSSNumericValue
  | `${CSSNumericValue} ${CSSNumericValue}`
  | `${CSSNumericValue} ${CSSNumericValue} ${CSSNumericValue}`
  | `${CSSNumericValue} ${CSSNumericValue} ${CSSNumericValue} ${CSSNumericValue}`

// ------------------------------- string Integer units type -//
export interface CustomCSSProperties extends CSSProperties {
  width?: CSSNumericValue
  height?: CSSNumericValue
  margin?: CSSPropertiesValues
  padding?: CSSPropertiesValues
  fontSize?: CSSNumericValue
  lineHeight?: CSSNumericValue
  letterSpacing?: CSSNumericValue
  wordSpacing?: CSSNumericValue
  borderWidth?: CSSNumericValue
  borderRadius?: CSSNumericValue
  top?: CSSNumericValue
  right?: CSSNumericValue
  bottom?: CSSNumericValue
  left?: CSSNumericValue
  maxWidth?: CSSNumericValue
  maxHeight?: CSSNumericValue
  minWidth?: CSSNumericValue
  minHeight?: CSSNumericValue
  flexBasis?: CSSNumericValue
  gap?: CSSNumericValue
  gridGap?: CSSNumericValue
  gridColumnGap?: CSSNumericValue
  gridRowGap?: CSSNumericValue
}

// ------------------------------- build and insert ----------//
// ------------------------------- all strings ---------------//
export type SerializeType = Record<string, string>

// ------------------------------- nested string key in property ----------------------//
export type ClassesObjectType = Record<string, CustomCSSProperties>
// ------------------------------- nested return type ---------------------------------//
export type ReturnStyleType<T> = { [key in keyof T]: string }
export type ProxyClassName = { [key: string]: string }

// ------------------------------- direct key and value property ----------------------//
export interface PropertiesType extends CSSProperties {
  link?: CustomCSSProperties
  visited?: CustomCSSProperties
  hover?: CustomCSSProperties
  active?: CustomCSSProperties
  firstChild?: CustomCSSProperties
  lastChild?: CustomCSSProperties
  firstLine?: CustomCSSProperties
  lastLine?: CustomCSSProperties
  firstLetter?: CustomCSSProperties
  lastLetter?: CustomCSSProperties
  before?: CustomCSSProperties
  after?: CustomCSSProperties
}

export type NonNestObjectType = Record<
  string,
  (CSSNumericValue | CSSPropertiesValues) & string
>

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
