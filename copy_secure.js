const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Jabir\\.gemini\\antigravity\\brain\\b6afc95f-db27-4e24-be1f-e7627a614953\\jabx_brand_icon_1774430248669.png';
const publicDir = 'f:\\PieceOfShit\\Projects\\JabX\\public';
const dests = ['icon.png', 'apple-icon.png', 'favicon.ico'];

if (!fs.existsSync(src)) {
  console.error('Source not found:', src);
  process.exit(1);
}

dests.forEach(dest => {
  try {
    const destPath = path.join(publicDir, dest);
    fs.copyFileSync(src, destPath);
    console.log('Success:', destPath);
  } catch (err) {
    console.error('Failed:', dest, err.message);
    process.exit(1);
  }
});

console.log('All files copied successfully');
