const pdfFonts = require('pdfmake/build/vfs_fonts');
console.log(Object.keys(pdfFonts));
if (pdfFonts.pdfMake) console.log('pdfMake keys:', Object.keys(pdfFonts.pdfMake));
