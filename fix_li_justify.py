import re
import glob

files = glob.glob('src/components/*.tsx')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    def li_replacer(match):
        classes = match.group(1)
        classes = re.sub(r'\b(text-left|text-center|text-right)\b', '', classes)
        if 'text-justify' not in classes:
            classes = classes.strip() + ' text-justify'
        classes = ' '.join(classes.split())
        return f'<li key={{idx}} className="{classes}"' # wait, the key might not be {idx}

    # Let's just do a simpler replace for <li className="..." and <li key={...} className="..."
    def li_class_replacer(match):
        prefix = match.group(1)
        classes = match.group(2)
        classes = re.sub(r'\b(text-left|text-center|text-right)\b', '', classes)
        if 'text-justify' not in classes:
            classes = classes.strip() + ' text-justify'
        classes = ' '.join(classes.split())
        return f'{prefix} className="{classes}"'

    content = re.sub(r'(<li[^>]*?)className="([^"]*)"', li_class_replacer, content)
    
    with open(filepath, 'w') as f:
        f.write(content)
