import glob
import re

files = glob.glob('src/**/*.tsx', recursive=True)
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Matches .map((...) => ( <Tag attr="value">
    # or .map(item => ( <Tag
    # or .map(() => <Tag
    
    # Simple search for .map( and then the first opening tag
    parts = content.split('.map(')
    for part in parts[1:]:
        # Find the first '<' followed by an alpha character
        match = re.search(r'=>\s*\(\s*<([a-zA-Z0-9_]+)([^>]*)>', part)
        if match:
            tag = match.group(1)
            attrs = match.group(2)
            if 'key=' not in attrs and tag not in ['>']:
                print(f"{file}: Missing key on <{tag}> in map: {attrs}")
        else:
            match_no_paren = re.search(r'=>\s*<([a-zA-Z0-9_]+)([^>]*)>', part)
            if match_no_paren:
                tag = match_no_paren.group(1)
                attrs = match_no_paren.group(2)
                if 'key=' not in attrs and tag not in ['>']:
                    print(f"{file}: Missing key on <{tag}> in map: {attrs}")
