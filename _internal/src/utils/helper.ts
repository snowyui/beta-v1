import path from 'path'

export const isUnderDevelopment = process.env.NODE_ENV !== 'development'

const dir = (direname: string, relativePath: string) => {
  return path.join(direname, relativePath)
}

export const get = {
  dir
}

export const camelToKebabCase = (property: string) => {
  return property.replace(/([A-Z])/g, '-$1').toLowerCase()
}
