const fs = require('fs');
let content = fs.readFileSync('src/api.ts', 'utf8');

const types = [
  { name: 'Trainings', url: 'trainings', type: 'Training' },
  { name: 'Experiences', url: 'experience', type: 'Experience' },
  { name: 'Educations', url: 'education', type: 'Education' },
  { name: 'Projects', url: 'projects', type: 'Project' }
];

for (const t of types) {
  if (!content.includes(`reorder${t.name}API`)) {
    const fn = `
export async function reorder${t.name}API(orderedIds: string[]): Promise<${t.type}[]> {
  const res = await authFetch(\`\${API_BASE}/admin/${t.url}/reorder\`, {
    method: 'PUT',
    body: JSON.stringify({ orderedIds })
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Failed to reorder');
  return json.data;
}
`;
    content += fn;
  }
}

fs.writeFileSync('src/api.ts', content);
