import re
with open('src/components/admin/AdminDashboard.tsx', 'r') as f:
    content = f.read()

if "import { HeadingsTab }" not in content:
    content = content.replace("import { HighlightsTab } from './tabs/HighlightsTab';", "import { HighlightsTab } from './tabs/HighlightsTab';\nimport { HeadingsTab } from './tabs/HeadingsTab';")
    content = content.replace("import { Type", "import { Type, Sparkles") # Make sure Type is imported, wait it's not.
    
    if "Type," not in content:
        content = content.replace("import { ", "import { \n  Type,", 1)
        
    content = content.replace("{ id: 'highlights', label: 'Highlights & Metrics', icon: Sparkles },", "{ id: 'highlights', label: 'Highlights & Metrics', icon: Sparkles },\n    { id: 'headings', label: 'Section Headings', icon: Type },")

    new_tab = """        {activeTab === 'headings' && (
          <HeadingsTab
            data={data}
            onRefresh={onRefresh}
            showToast={showToast}
          />
        )}
"""
    content = content.replace("{activeTab === 'highlights' && (", new_tab + "        {activeTab === 'highlights' && (")
    with open('src/components/admin/AdminDashboard.tsx', 'w') as f:
        f.write(content)

