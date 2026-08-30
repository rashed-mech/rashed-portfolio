const fs = require('fs');
let content = fs.readFileSync('src/components/HonorsAndActivitiesSection.tsx', 'utf8');

// The references section starts from `{references && references.length > 0 && (` to the closing `)}`
// I can just replace `{references && references.length > 0 && (` with `{false && (` to hide it completely.
content = content.replace('{references && references.length > 0 && (', '{false && (');
fs.writeFileSync('src/components/HonorsAndActivitiesSection.tsx', content);
