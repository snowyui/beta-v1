import path from 'path'

export const isWindowDefined = typeof window !== 'undefined'
export const isDocumentDefined = typeof document !== 'undefined'
export const isInDevelopment = process.env.NODE_ENV === 'development'

const dir = (direname: string, relativePath: string) => {
  return path.join(direname, relativePath)
}

export const get = {
  dir
}

export const camelToKebabCase = (property: string) => {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase()
}
