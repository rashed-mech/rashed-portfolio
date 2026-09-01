import re

def add_config(file, pattern, replacement):
    with open(file, 'r') as f:
        content = f.read()
    if "config," not in content and "config\n" not in content and "{ config }" not in content and "config } = " not in content and " config " not in content:
        content = content.replace(pattern, replacement)
        with open(file, 'w') as f:
            f.write(content)


add_config('src/components/TrainingSection.tsx', 
"""export const TrainingSection: React.FC<TrainingSectionProps> = ({ 
  trainings = [],
  certifications = []
}) => {""",
"""export const TrainingSection: React.FC<TrainingSectionProps> = ({ 
  trainings = [],
  certifications = [],
  config
}) => {""")

add_config('src/components/HonorsAndActivitiesSection.tsx',
"""export const HonorsAndActivitiesSection: React.FC<HonorsAndActivitiesSectionProps> = ({
  achievements = [],
  affiliations = [],
  volunteerWork = [],
  references = []
}) => {""",
"""export const HonorsAndActivitiesSection: React.FC<HonorsAndActivitiesSectionProps> = ({
  achievements = [],
  affiliations = [],
  volunteerWork = [],
  references = [],
  config
}) => {""")

add_config('src/components/ExperienceSection.tsx',
"""export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  education
}) => {""",
"""export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  education,
  config
}) => {""")

