with open('src/components/OverviewSection.tsx', 'r') as f:
    lines = f.readlines()
target = "".join(lines[47:113])
print(repr(target))
