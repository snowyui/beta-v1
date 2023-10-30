import { globby } from 'globby'
import path from 'node:path'
;(async () => {
  const appRoot = path.join(process.cwd(), '../../')
  const cts = path.resolve(appRoot, '**/*/*.cts')
  const tsx = path.resolve(appRoot, '**/**/*.tsx')

  const files: string[] = await globby([cts, tsx])
  files.forEach(async file => {
    const filePath = path.resolve(file)
    await import(filePath)
  })
  return console.log('create built in css')
})()
