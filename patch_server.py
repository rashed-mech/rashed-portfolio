import re
with open('src/server/db.ts', 'r') as f:
    content = f.read()

if "public updateSectionConfig" not in content:
    method = """
  public updateSectionConfig(sectionConfig: any) {
    this.data.sectionConfig = sectionConfig;
    this.sync();
    return this.data.sectionConfig;
  }
"""
    content = content.replace("  public updateAdminCredentials", method + "\n  public updateAdminCredentials")
    with open('src/server/db.ts', 'w') as f:
        f.write(content)

with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace("db.getData().sectionConfig = sectionConfig;\n    db.sync();", "db.updateSectionConfig(sectionConfig);")
with open('server.ts', 'w') as f:
    f.write(content)
