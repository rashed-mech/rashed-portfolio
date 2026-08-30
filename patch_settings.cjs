const fs = require('fs');
let content = fs.readFileSync('src/components/admin/tabs/SettingsTab.tsx', 'utf8');

// Add Eye, EyeOff to lucide-react imports if not there
if (!content.includes('Eye,')) {
    content = content.replace("from 'lucide-react';", "Eye, EyeOff } from 'lucide-react';");
}

// Add state for showCurrentPassword and showNewPassword
content = content.replace("const [loading, setLoading] = useState(false);", "const [loading, setLoading] = useState(false);\n  const [showCurrentPassword, setShowCurrentPassword] = useState(false);\n  const [showNewPassword, setShowNewPassword] = useState(false);");

// Current password
content = content.replace('type="password"\n                value={currentPassword}', 'type={showCurrentPassword ? "text" : "password"}\n                value={currentPassword}');
const currentBtn = `
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
`;
content = content.replace('id="current-password-input"\n              />', 'id="current-password-input"\n              />' + currentBtn);

// New password
content = content.replace('type="password"\n                  value={newPassword}', 'type={showNewPassword ? "text" : "password"}\n                  value={newPassword}');
const newBtn = `
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
`;
content = content.replace('id="new-password-input"\n                />', 'id="new-password-input"\n                />' + newBtn);

fs.writeFileSync('src/components/admin/tabs/SettingsTab.tsx', content);
