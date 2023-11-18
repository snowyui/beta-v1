import type { CSSProperties } from 'react'
import type { CSSColorNames } from './colors'

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

type ExtractPercent<T> = T extends '%' ? '%' : never
type RemovePercent<T> = T extends '%' ? never : T
type PercentUnit = '0' | `${number}${ExtractPercent<CSSUnit>}`
type LengthUnit = '0' | `${number}${RemovePercent<CSSUnit>}`

type CSSFilterFunction =
  | `blur(${LengthUnit})`
  | `brightness(${PercentUnit})`
  | `contrast(${PercentUnit})`
  | `drop-shadow(${LengthUnit} ${LengthUnit} ${LengthUnit} ${string})`
  | `grayscale(${PercentUnit})`
  | `hue-rotate(${number}deg)`
  | `invert(${PercentUnit})`
  | `opacity(${PercentUnit})`
  | `sepia(${PercentUnit})`
  | `saturate(${PercentUnit})`
  | 'none'

// ------------------------------- string Integer units type -//
export interface CustomCSSProperties {
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
  color?: CSSColorNames
  background?: CSSColorNames
  backgroundColor?: CSSColorNames
  filter?: CSSFilterFunction
  backdropFilter?: CSSFilterFunction

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

// ------------------------------- build and insert ----------//
// ------------------------------- all strings ---------------//
export type SerializeType = Record<string, string>

// ------------------------------- nested string key in property ----------------------//
export type aClassesObjectType = Record<string, CustomCSSProperties> // ネストを表現しにくいから消す
export type ClassesObjectType = {
  [className in string]: CustomCSSProperties
}

// ------------------------------- nested return type ---------------------------------//
export type ReturnStyleType<T> = { [key in keyof T]: string }
export type ProxyClassName = Record<string, string>

export type NonNestObjectType = CustomCSSProperties

export type RootType = {
  [key: string]: string
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
