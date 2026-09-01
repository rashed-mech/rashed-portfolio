import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Replace max-w-3xl
content = content.replace(
    'className="mt-6 space-y-4 text-sm sm:text-base text-black leading-relaxed max-w-3xl mx-auto lg:mx-0 text-justify"',
    'className="mt-6 space-y-4 text-sm sm:text-base text-black leading-relaxed w-full text-justify"'
)

# Replace mb-16 on the flex container to mb-8
content = content.replace(
    '<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start mb-16">',
    '<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start mb-8">'
)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
