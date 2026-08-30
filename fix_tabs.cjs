const fs = require('fs');
let content = fs.readFileSync('src/components/admin/tabs/TrainingsTab.tsx', 'utf8');

// I will just use regex to clean up the extra `</div>`s at the end of the `Draggable`
content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/Draggable>/g, "</div></div>)}</Draggable>");
fs.writeFileSync('src/components/admin/tabs/TrainingsTab.tsx', content);

let timeline = fs.readFileSync('src/components/admin/tabs/TimelineTab.tsx', 'utf8');
timeline = timeline.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/Draggable>/g, "</div></div>)}</Draggable>");
fs.writeFileSync('src/components/admin/tabs/TimelineTab.tsx', timeline);
