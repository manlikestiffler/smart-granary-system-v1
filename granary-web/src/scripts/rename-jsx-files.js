import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '..', 'src');

function renameJsxFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      renameJsxFiles(filePath);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('jsx') || content.includes('React.') || content.includes('<')) {
        const newPath = filePath.replace('.js', '.jsx');
        fs.renameSync(filePath, newPath);
        console.log(`Renamed ${filePath} to ${newPath}`);
      }
    }
  });
}

renameJsxFiles(srcDir); 