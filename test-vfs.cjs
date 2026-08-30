const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
console.log('pdfMake.vfs exists?', !!pdfMake.vfs);
console.log('pdfFonts.pdfMake.vfs exists?', !!(pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs));
