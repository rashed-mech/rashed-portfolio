import re
with open('src/components/TrainingSection.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'export const TrainingSection: React\.FC<TrainingSectionProps> = \(\{\s*trainings = \[\],\s*certifications = \[\]\s*\}\) => \{', 
                 'export const TrainingSection: React.FC<TrainingSectionProps> = ({ trainings = [], certifications = [], config }) => {', content)

with open('src/components/TrainingSection.tsx', 'w') as f:
    f.write(content)
