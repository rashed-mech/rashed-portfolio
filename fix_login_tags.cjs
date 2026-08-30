const fs = require('fs');
let code = fs.readFileSync('src/components/admin/AdminLogin.tsx', 'utf8');

// The end of the file is currently:
//        </form>
//        </div>
//
//      </div>
//    </div>
//  );
// };

// We want to replace it with just closing the card and the page.
code = code.replace(/<\/form>[\s\S]*?\};\s*$/m, `</form>\n      </div>\n    </div>\n  );\n};\n`);
fs.writeFileSync('src/components/admin/AdminLogin.tsx', code);
console.log('Fixed tags');
