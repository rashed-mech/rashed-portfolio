const fs = require('fs');

let pub = fs.readFileSync('src/components/PublicationsSection.tsx', 'utf-8');
// look for `</div>\n\n      {/* BibTeX Modal */}`
pub = pub.replace("</div>\n\n      {/* BibTeX Modal */}", "</motion.div>\n\n      {/* BibTeX Modal */}");
pub = pub.replace("</div>\n      {/* BibTeX Modal */}", "</motion.div>\n      {/* BibTeX Modal */}");
fs.writeFileSync('src/components/PublicationsSection.tsx', pub);

let train = fs.readFileSync('src/components/TrainingSection.tsx', 'utf-8');
// The script replaced:
// content.replace("</div>\n      {/* Certificate Preview Modal", "</motion.div>\n      {/* Certificate Preview Modal");
// maybe it didn't match. Let's find exactly where the `<motion.div className="max-w-7xl mx-auto` is.
train = train.replace("</div>\n      {/* Certificate Preview Modal", "</motion.div>\n      {/* Certificate Preview Modal");
train = train.replace("</div>\n\n      {/* Certificate Preview Modal", "</motion.div>\n\n      {/* Certificate Preview Modal");
fs.writeFileSync('src/components/TrainingSection.tsx', train);
