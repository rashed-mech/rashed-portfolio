const fs = require('fs');
let file = 'src/components/ContactSection.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/<\/AnimatePresence>[\s\S]*?<\/section>/, `</AnimatePresence>
      </div>
    </section>`);

fs.writeFileSync(file, c);
