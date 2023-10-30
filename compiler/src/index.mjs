import { readFile, writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { get } from './';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = get.dir(__dirname, '../../core/src/style.module.css');

readFile(filePath, 'utf8', (err) => {
  if (err) {
    console.error('An error occurred while loading the file:', err);
    return;
  }

  writeFile(filePath, '/*_*/', (err) => {
    if (err) {
      console.error('An error occurred while writing the file:', err);
    } else {
      console.log('...💫(build cache applied the css successfully)');
    }
  });
});
