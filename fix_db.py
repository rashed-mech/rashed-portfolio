import re
with open('src/server/db.ts', 'r') as f:
    content = f.read()

# I will find the mergeWithDefaults function and replace the duplicate
match = re.search(r'sectionConfig:\s*{[^}]*},\s*(.*?sectionConfig:\s*parsed\.sectionConfig \|\| DEFAULT_PORTFOLIO_DATA\.sectionConfig,)', content, flags=re.DOTALL)
if match:
    # Just remove the first hardcoded block inside mergeWithDefaults if it got placed there by mistake.
    # Actually let's just do a string replacement
    pass

