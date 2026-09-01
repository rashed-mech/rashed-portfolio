with open('src/api.ts', 'r') as f:
    content = f.read()

old_func = """export async function updateSectionConfigAPI(sectionConfig: any): Promise<void> {
  const res = await fetch('/api/admin/section-config', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ sectionConfig })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update section config');
  }
}"""

new_func = """export async function updateSectionConfigAPI(sectionConfig: any): Promise<void> {
  const res = await authFetch(`${API_BASE}/admin/section-config`, {
    method: 'POST',
    body: JSON.stringify({ sectionConfig })
  });
  
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch (e) {
    throw new Error(`Server returned invalid response: ${text.substring(0, 50)}`);
  }
  
  if (!res.ok || (json && json.success === false)) {
    throw new Error(json.message || json.error || 'Failed to update section config');
  }
}"""

if old_func in content:
    content = content.replace(old_func, new_func)
else:
    print("Could not find the function to replace")

with open('src/api.ts', 'w') as f:
    f.write(content)
