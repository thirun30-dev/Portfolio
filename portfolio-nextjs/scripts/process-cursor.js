const { Jimp, intToRGBA } = require('jimp');
const path = require('path');

const srcPath = path.join(__dirname, '../public/images/cursor.png');
const destPath = path.join(__dirname, '../public/images/cursor.png'); // Overwrite Next.js version
const rootDestPath = path.join(__dirname, '../../cursor.png'); // Overwrite root version

Jimp.read(srcPath)
  .then(image => {
    const w = image.width;
    const h = image.height;
    console.log('Original dimensions:', w, 'x', h);
    
    // Detect background color at top-left corner (0,0)
    const bgPixel = image.getPixelColor(0, 0);
    const bgRGBA = intToRGBA(bgPixel);
    console.log('Detected background color (top-left):', bgRGBA);

    // Make pixels matching/near background color transparent
    image.scan(0, 0, w, h, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];

      // Color distance formula
      const dist = Math.sqrt(
        Math.pow(r - bgRGBA.r, 2) +
        Math.pow(g - bgRGBA.g, 2) +
        Math.pow(b - bgRGBA.b, 2)
      );

      // If the color is within a threshold distance of the background color
      if (dist < 45) {
        this.bitmap.data[idx + 3] = 0; // Make transparent
      }
    });

    // Resize to 128x128 for performance & high-DPI crispness
    if (w > 128 || h > 128) {
      console.log('Resizing to 128x128 for optimal rendering...');
      image.resize({ w: 128, h: 128 });
    }

    // Save as transparent PNG
    return image.write(destPath)
      .then(() => {
        console.log('Saved transparent PNG to Next.js images:', destPath);
        return image.write(rootDestPath);
      })
      .then(() => {
        console.log('Saved transparent PNG to root workspace:', rootDestPath);
      });
  })
  .catch(err => {
    console.error('Failed to process cursor image:', err);
  });
