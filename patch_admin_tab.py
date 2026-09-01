with open('src/components/admin/AdminDashboard.tsx', 'r') as f:
    content = f.read()

new_tab = """        {activeTab === 'highlights' && (
          <HighlightsTab
            data={data}
            onRefresh={onRefresh}
            showToast={showToast}
          />
        )}
"""

if "HighlightsTab data={data}" not in content and "<HighlightsTab" not in content:
    content = content.replace("{activeTab === 'timeline' &&", new_tab + "        {activeTab === 'timeline' &&")
    with open('src/components/admin/AdminDashboard.tsx', 'w') as f:
        f.write(content)
    print("Patched successfully!")
else:
    print("Already patched?")
