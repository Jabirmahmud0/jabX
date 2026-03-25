const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Jabir\\.gemini\\antigravity\\brain\\b6afc95f-db27-4e24-be1f-e7627a614953\\jabx_brand_icon_1774430248669.png';
const dests = [
  'f:\\PieceOfShit\\Projects\\JabX\\public\\icon.png',
  'f:\\PieceOfShit\\Projects\\JabX\\public\\apple-icon.png',
  'f:\\PieceOfShit\\Projects\\JabX\\public\\favicon.ico'
];

dests.forEach(dest => {
  try {
    fs.copyFileSync(src, dest);
    console.log(`Copied to ${dest}`);
  } catch (err) {
    console.error(`Error copying to ${dest}:`, err);
  }
});
