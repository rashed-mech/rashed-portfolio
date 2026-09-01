import re
with open('src/components/admin/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace("icon: Award, Sparkles", "icon: Award")
with open('src/components/admin/AdminDashboard.tsx', 'w') as f:
    f.write(content)
