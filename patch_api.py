with open('src/api.ts', 'r') as f:
    content = f.read()

new_apis = """
// Admin Overview API
export async function updatePillarsAPI(pillars: any[]): Promise<any[]> {
  const res = await authFetch(`${API_BASE}/admin/pillars`, {
    method: 'PUT',
    body: JSON.stringify({ pillars })
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Failed to update pillars');
  return json.data;
}

export async function updateMetricsAPI(metrics: any[]): Promise<any[]> {
  const res = await authFetch(`${API_BASE}/admin/metrics`, {
    method: 'PUT',
    body: JSON.stringify({ metrics })
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Failed to update metrics');
  return json.data;
}
"""

if "updatePillarsAPI" not in content:
    content = content + new_apis

with open('src/api.ts', 'w') as f:
    f.write(content)
