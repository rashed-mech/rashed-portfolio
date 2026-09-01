with open('src/server/db.ts', 'r') as f:
    content = f.read()

new_methods = """
  public updatePillars(pillars: any[]) {
    this.data.pillars = pillars;
    this.sync();
    return this.data.pillars;
  }

  public updateMetrics(metrics: any[]) {
    this.data.metrics = metrics;
    this.sync();
    return this.data.metrics;
  }
"""

if "updatePillars" not in content:
    content = content.replace("  public updateSkillGroups", new_methods + "  public updateSkillGroups")

with open('src/server/db.ts', 'w') as f:
    f.write(content)
