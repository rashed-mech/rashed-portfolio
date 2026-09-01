import re
import glob

files = glob.glob('src/components/*.tsx')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Find all <p className="..."> and add text-justify
    def p_replacer(match):
        classes = match.group(1)
        # Remove existing alignment
        classes = re.sub(r'\b(text-left|text-center|text-right)\b', '', classes)
        # Add text-justify if not present
        if 'text-justify' not in classes:
            classes = classes.strip() + ' text-justify'
        # Normalize spaces
        classes = ' '.join(classes.split())
        return f'<p className="{classes}"'

    content = re.sub(r'<p className="([^"]*)"', p_replacer, content)

    # We should also do this for description blocks that might use <div> or <span>, but <p> covers most text.
    # Let's see if there are any specific <div>s we should target. Let's do <p> first.
    
    with open(filepath, 'w') as f:
        f.write(content)
