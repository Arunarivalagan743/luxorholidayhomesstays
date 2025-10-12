import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting image optimization process...');

// Directories containing villa images
const directories = [
  'public/AmrithPalace',
  'public/eastcoastvilla',
  'public/empireanandvillasamudra',
  'public/ramwatervilla',
  'public/LavishVilla 1',
  'public/LavishVilla 2',
  'public/LavishVilla 3'
];

// Process each directory
directories.forEach(directory => {
  // Make sure directory exists
  if (!fs.existsSync(directory)) {
    console.error(`Directory does not exist: ${directory}`);
    return;
  }

  // Create optimized subfolder
  const optimizedDir = path.join(directory, 'optimized');
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  // Read all files in the directory
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}: ${err}`);
      return;
    }
    
    // Process each image file
    files.forEach(file => {
      const filePath = path.join(directory, file);
      
      // Skip directories and non-image files
      if (fs.statSync(filePath).isDirectory() || 
          !['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) {
        return;
      }
      
      const outputFilePath = path.join(optimizedDir, file);
      const webpFilePath = outputFilePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      console.log(`Optimizing ${filePath}...`);
      
      // Create WebP version
      sharp(filePath)
        .resize(1200) // Resize to reasonable dimensions
        .webp({ quality: 80 })
        .toFile(webpFilePath)
        .then(() => console.log(`Created WebP: ${webpFilePath}`))
        .catch(err => console.error(`Error creating WebP for ${file}: ${err}`));
      
      // Create thumbnail version
      sharp(filePath)
        .resize(400) // Thumbnail size
        .webp({ quality: 75 })
        .toFile(webpFilePath.replace('.webp', '-thumbnail.webp'))
        .then(() => console.log(`Created thumbnail: ${webpFilePath.replace('.webp', '-thumbnail.webp')}`))
        .catch(err => console.error(`Error creating thumbnail for ${file}: ${err}`));
      
      // Optimize original format but with better compression
      sharp(filePath)
        .resize(1200)
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputFilePath)
        .then(() => console.log(`Optimized original: ${outputFilePath}`))
        .catch(err => console.error(`Error optimizing original ${file}: ${err}`));
    });
  });
});