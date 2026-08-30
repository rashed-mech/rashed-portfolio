const fs = require('fs');

// CertificationsTab
let certFile = 'src/components/admin/tabs/CertificationsTab.tsx';
let certContent = fs.readFileSync(certFile, 'utf8');
certContent = certContent.replace(/bg-indigo-900\/30 text-indigo-700/g, 'bg-indigo-900/30 text-white');
fs.writeFileSync(certFile, certContent, 'utf8');

// TrainingsTab
let trainFile = 'src/components/admin/tabs/TrainingsTab.tsx';
let trainContent = fs.readFileSync(trainFile, 'utf8');
trainContent = trainContent.replace(/bg-indigo-950\/60 text-indigo-300/g, 'bg-indigo-950/60 text-white');
fs.writeFileSync(trainFile, trainContent, 'utf8');

console.log('Fixed year colors');
