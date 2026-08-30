const fs = require('fs');
let file = 'src/components/HonorsAndActivitiesSection.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/\{\/\* References Section \*\/\}[\s\S]*?\{\w+\.length > 0 && \([\s\S]*?<\/div>\s*\)\s*\}\s*<\/div>\s*<\/section>/, `</div>\n    </section>`);

fs.writeFileSync(file, c);
