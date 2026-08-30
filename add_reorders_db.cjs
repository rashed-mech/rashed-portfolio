const fs = require('fs');
let content = fs.readFileSync('src/server/db.ts', 'utf8');

const types = [
  { name: 'Trainings', field: 'trainings', type: 'Training' },
  { name: 'Experiences', field: 'experience', type: 'Experience' },
  { name: 'Educations', field: 'education', type: 'Education' },
  { name: 'Projects', field: 'projects', type: 'Project' }
];

for (const t of types) {
  if (!content.includes(`reorder${t.name}`)) {
    const fn = `
  public reorder${t.name}(orderedIds: string[]): ${t.type}[] {
    if (!this.data.${t.field}) return [];
    
    const newOrder: ${t.type}[] = [];
    const currentMap = new Map(this.data.${t.field}.map(item => [item.id, item]));
    
    for (const id of orderedIds) {
      if (currentMap.has(id)) {
        newOrder.push(currentMap.get(id)!);
        currentMap.delete(id);
      }
    }
    
    // Add any remaining items not in orderedIds at the end
    for (const item of currentMap.values()) {
      newOrder.push(item);
    }
    
    this.data.${t.field} = newOrder;
    this.saveData();
    return this.data.${t.field};
  }
`;
    // Insert before the last closing brace. Actually, I can insert it right before the last closing brace of PortfolioDatabase class.
    // Or just after reorderCertifications.
    const reorderCert = "public reorderCertifications(orderedIds: string[]): Certification[] {";
    if (content.includes(reorderCert)) {
      content = content.replace(reorderCert, fn + '\n  ' + reorderCert);
    }
  }
}

fs.writeFileSync('src/server/db.ts', content);
