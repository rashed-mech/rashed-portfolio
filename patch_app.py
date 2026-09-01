import re
with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace("<CapabilitiesSection skillGroups={data.skillGroups} />", "<CapabilitiesSection skillGroups={data.skillGroups} config={data.sectionConfig?.capabilities} />")
content = content.replace("<ProjectsSection projects={data.projects} />", "<ProjectsSection projects={data.projects} config={data.sectionConfig?.projects} />")
content = content.replace("<ExperienceSection experience={data.experience} education={data.education} />", "<ExperienceSection experience={data.experience} education={data.education} config={data.sectionConfig?.experience} />")
content = content.replace("<PublicationsSection publications={data.publications} scholarUrl={data.profile.social.scholar} />", "<PublicationsSection publications={data.publications} scholarUrl={data.profile.social.scholar} config={data.sectionConfig?.publications} />")
content = content.replace("<TrainingSection trainings={data.trainings} certifications={data.certifications} />", "<TrainingSection trainings={data.trainings} certifications={data.certifications} config={data.sectionConfig?.trainings} />")
content = content.replace("<HonorsAndActivitiesSection \n           achievements={data.achievements}\n           affiliations={data.affiliations}\n           volunteerWork={data.volunteerWork}\n           references={data.references}\n         />", "<HonorsAndActivitiesSection \n           achievements={data.achievements}\n           affiliations={data.affiliations}\n           volunteerWork={data.volunteerWork}\n           references={data.references}\n           config={data.sectionConfig?.honors}\n         />")
# handle single line version if it exists
content = content.replace("<HonorsAndActivitiesSection achievements={data.achievements} affiliations={data.affiliations} volunteerWork={data.volunteerWork} references={data.references} />", "<HonorsAndActivitiesSection achievements={data.achievements} affiliations={data.affiliations} volunteerWork={data.volunteerWork} references={data.references} config={data.sectionConfig?.honors} />")

with open('src/App.tsx', 'w') as f:
    f.write(content)
