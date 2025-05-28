const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const optimizedDir = path.join(publicDir, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir);
}

async function optimizeImage(inputPath, outputPath, options = {}) {
  const { width, quality = 80 } = options;
  
  try {
    let pipeline = sharp(inputPath);
    
    if (width) {
      pipeline = pipeline.resize(width);
    }
    
    await pipeline
      .webp({ quality })
      .toFile(outputPath);
      
    console.log(`Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function processImages() {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(optimizedDir, `${path.parse(file).name}.webp`);
      
      await optimizeImage(inputPath, outputPath, {
        width: 1200, // Max width for most images
        quality: 80
      });
    }
  }
}

processImages().catch(console.error); 