import re
with open('src/api.ts', 'r') as f:
    content = f.read()

if "updateSectionConfigAPI" not in content:
    api_method = """
export async function updateSectionConfigAPI(sectionConfig: any): Promise<void> {
  const res = await fetch('/api/admin/section-config', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ sectionConfig })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to update section config');
  }
}
"""
    content += api_method
    with open('src/api.ts', 'w') as f:
        f.write(content)
