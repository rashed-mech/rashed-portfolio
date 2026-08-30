import('pdfmake/build/vfs_fonts.js').then(m => {
  console.log(Object.keys(m));
  if (m.default) {
    console.log('default keys:', Object.keys(m.default));
    if (m.default.pdfMake) console.log('default.pdfMake keys:', Object.keys(m.default.pdfMake));
  }
}).catch(console.error);
