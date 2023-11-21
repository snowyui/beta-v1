import type { CSSColorNames } from './colors'

type AbsoluteCSSUnit = 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt' | 'px'
type RelativeCSSUnit = 'em' | 'rem' | 'ex' | 'ch' | 'lh' | 'rlh'
type ViewportCSSUnit = 'vh' | 'vw' | 'vmin' | 'vmax' | 'vb' | 'vi'
type RespectCSSUnit = 'svw' | 'svh' | 'lvw' | 'lvh' | 'dvw' | 'dvh'
type PercentageCSSUnit = '%'

type CSSAbsoluteUnitValue = '0' | `${number}${AbsoluteCSSUnit}`
type CSSRelativeUnitValue = '0' | `${number}${RelativeCSSUnit}`
type CSSViewportUnitValue = '0' | `${number}${ViewportCSSUnit}`
type CSSRespectUnitValue = '0' | `${number}${RespectCSSUnit}`
type CSSPercentageUnitValue = '0' | `${number}${PercentageCSSUnit}`
type CSSNumericValue =
  | CSSAbsoluteUnitValue
  | CSSRelativeUnitValue
  | CSSViewportUnitValue
  | CSSRespectUnitValue
  | CSSPercentageUnitValue
  | CSSVariableValue

type CSSSizeValue<
  T extends
    | CSSAbsoluteUnitValue
    | CSSRelativeUnitValue
    | CSSViewportUnitValue
    | CSSRespectUnitValue
    | CSSPercentageUnitValue
> = `${T}` | `${T} ${T}` | `${T} ${T} ${T}` | `${T} ${T} ${T} ${T}`

type CSSEdgeSizeAbsoluteValues = CSSSizeValue<CSSAbsoluteUnitValue>
type CSSEdgeSizeRelativeValues = CSSSizeValue<CSSRelativeUnitValue>
type CSSEdgeSizeViewportValues = CSSSizeValue<CSSViewportUnitValue>
type CSSEdgeSizeRespectValues = CSSSizeValue<CSSRespectUnitValue>
type CSSEdgeSizePercentageValues = CSSSizeValue<CSSPercentageUnitValue>
type CSSEdgeSizeValues =
  | CSSEdgeSizeAbsoluteValues
  | CSSEdgeSizeRelativeValues
  | CSSEdgeSizeViewportValues
  | CSSEdgeSizeRespectValues
  | CSSEdgeSizePercentageValues
  | CSSVariableValue

type CustomRadiusValue<
  T extends
    | CSSAbsoluteUnitValue
    | CSSRelativeUnitValue
    | CSSViewportUnitValue
    | CSSRespectUnitValue
    | CSSPercentageUnitValue
> = `${T} ${T} / ${T} ${T}`

type CSSRadiusValue<
  T extends
    | CSSAbsoluteUnitValue
    | CSSRelativeUnitValue
    | CSSViewportUnitValue
    | CSSRespectUnitValue
    | CSSPercentageUnitValue
> = CSSSizeValue<T> | CustomRadiusValue<T>

type CSSRadiusAbsoluteValues = CSSRadiusValue<CSSAbsoluteUnitValue>
type CSSRadiusRelativeValues = CSSRadiusValue<CSSRelativeUnitValue>
type CSSRadiusViewportValues = CSSRadiusValue<CSSViewportUnitValue>
type CSSRadiusRespectValues = CSSRadiusValue<CSSRespectUnitValue>
type CSSRadiusPercentageValues = CSSRadiusValue<CSSPercentageUnitValue>
type CSSRadiusValues =
  | CSSRadiusAbsoluteValues
  | CSSRadiusRelativeValues
  | CSSRadiusViewportValues
  | CSSRadiusRespectValues
  | CSSRadiusPercentageValues
  | CSSVariableValue

// ------------------------------- string Integer units type -//
export interface CustomExtendProperties {
  width?: CSSNumericValue
  height?: CSSNumericValue
  margin?: CSSEdgeSizeValues
  marginBottom?: CSSNumericValue
  marginLeft?: CSSNumericValue
  marginRight?: CSSNumericValue
  marginTop?: CSSNumericValue
  padding?: CSSEdgeSizeValues
  paddingBottom?: CSSNumericValue
  paddingLeft?: CSSNumericValue
  paddingRight?: CSSNumericValue
  paddingTop?: CSSNumericValue
  fontSize?: CSSNumericValue
  lineHeight?: CSSNumericValue
  letterSpacing?: CSSNumericValue
  wordSpacing?: CSSNumericValue
  borderWidth?: CSSNumericValue
  borderRadius?: CSSRadiusValues
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
  color?: CSSColorValue
  background?: CSSColorValue
  backgroundColor?: CSSColorValue
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

type CSSVariableKey = `--${string}-${string}`
type CSSVariableValue = `var(${CSSVariableKey})`
type CSSColorValue = CSSColorNames | CSSVariableValue

export type CustomCSSProperties = CustomExtendProperties & {
  [K in keyof React.CSSProperties]: React.CSSProperties[K] | CSSVariableValue
}

export type ClassesObjectType = {
  [className in string]: CustomCSSProperties
}

export type ReturnStyleType<T> = { [key in keyof T]: string }

export type NonNestObjectType = CustomCSSProperties

type HTMLType = keyof JSX.IntrinsicElements

export type RootType = {
  [K in CSSVariableKey]: string
}

export type CoreType = {
  [K in HTMLType]?: CustomCSSProperties
}

export type SerializeType = Record<string, string>
