const fs = require('fs');

let content = fs.readFileSync('src/components/admin/AdminLogin.tsx', 'utf8');

// Add Eye icon to imports
content = content.replace("from 'lucide-react';", "Eye, EyeOff } from 'lucide-react';");

// Add state for showPassword
content = content.replace("const [password, setPassword] = useState('');", "const [password, setPassword] = useState('');\n  const [showPassword, setShowPassword] = useState(false);");

// Replace type="password" with type={showPassword ? 'text' : 'password'}
content = content.replace('type="password"', 'type={showPassword ? "text" : "password"}');

// Add the eye button inside the relative container
const buttonHtml = `
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
`;
content = content.replace('id="admin-password-input"\n              />', 'id="admin-password-input"\n              />' + buttonHtml);

fs.writeFileSync('src/components/admin/AdminLogin.tsx', content);
