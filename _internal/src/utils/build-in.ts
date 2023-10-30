import { createWriteStream, readFile } from 'fs'
import { isUnderDevelopment, get } from '../'

export const buildIn = (styleSheet: string) => {
  const filePath = get.dir(__dirname, '../../core/src/style.module.css')

  if (isUnderDevelopment)
    readFile(filePath, 'utf-8', (error, data) => {
      if (error || data.includes(styleSheet)) {
        return
      } else {
        const writeStream = createWriteStream(filePath, { flags: 'a' })
        writeStream.write(styleSheet, 'utf-8', error => {
          if (error) {
            console.log('write error')
          } else {
            console.log(' ✓ Generating static css \n' + styleSheet)
          }
          writeStream.end()
        })
      }
    })
}
