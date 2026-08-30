const fs = require('fs');

const generateCVContent = `import * as pdfMakeModule from 'pdfmake/build/pdfmake';
import * as pdfFontsModule from 'pdfmake/build/vfs_fonts';
import { PortfolioData } from '../types';
import { vfsTinos } from '../fonts/vfs_tinos';

const pdfMake: any = pdfMakeModule && (pdfMakeModule as any).default ? (pdfMakeModule as any).default : pdfMakeModule;
const pdfFonts: any = pdfFontsModule && (pdfFontsModule as any).default ? (pdfFontsModule as any).default : pdfFontsModule;

// Merge our custom fonts into the virtual file system
pdfMake.vfs = {
  ...(pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs),
  ...vfsTinos
};

pdfMake.fonts = {
  Times: {
    normal: 'Tinos-Regular.ttf',
    bold: 'Tinos-Bold.ttf',
    italics: 'Tinos-Italic.ttf',
    bolditalics: 'Tinos-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
};

const createSectionHeader = (title: string) => {
  return [
    { text: title, style: 'sectionHeader' },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 495, y2: 0, lineWidth: 0.5 }], margin: [0, 2, 0, 8] }
  ];
};

export const downloadCV = (data: PortfolioData) => {
  const { profile } = data;
  
  let overviewText = profile.bio || '';
  let researchInterestsText = '';
  
  if (profile.aboutText && profile.aboutText.length > 0) {
    if (profile.aboutText.length > 1) {
      overviewText = profile.aboutText[0];
      researchInterestsText = profile.aboutText[1];
    } else {
      overviewText = profile.aboutText[0];
    }
  }

  const docDefinition: any = {
    defaultStyle: {
      font: 'Times',
      fontSize: 11,
      lineHeight: 1.15
    },
    pageMargins: [50, 40, 50, 40],
    content: [
      { text: profile.name, style: 'header', alignment: 'left', margin: [0, 0, 0, 2] },
      { text: \`Address: \${profile.location}\`, alignment: 'left', margin: [0, 0, 0, 1] },
      { text: [{ text: 'Email: ' }, { text: profile.email, color: 'blue', decoration: 'underline', link: \`mailto:\${profile.email}\` }], alignment: 'left', margin: [0, 0, 0, 1] },
      (profile.social?.linkedin ? { text: [{ text: 'LinkedIn: ' }, { text: profile.social.linkedin.replace(/^https?:\\/\\//, ''), color: 'blue', decoration: 'underline', link: profile.social.linkedin }], alignment: 'left', margin: [0, 0, 0, 1] } : null),
      { text: \`Mobile: \${profile.phone || ''}\`, alignment: 'left', margin: [0, 0, 0, 1] },
      { text: '', margin: [0, 0, 0, 8] },
      
      ...createSectionHeader('Overview'),
      { text: overviewText, margin: [0, 0, 0, 10], alignment: 'justify' },
      
      ...(data.education && data.education.length > 0 ? createSectionHeader('Education') : []),
      ...(data.education || []).map(edu => ([
        {
          columns: [
            { text: [ { text: '• ', bold: true }, { text: edu.institution, bold: true } ] },
            { text: edu.location || 'Dinajpur, Bangladesh', alignment: 'right' }
          ],
          margin: [0, 0, 0, 1]
        },
        {
          columns: [
            { text: \`\${edu.degree}\${edu.result ? \`; CGPA: \${edu.result}\` : ''}\`, italics: true },
            { text: edu.year, alignment: 'right', italics: true }
          ],
          margin: [10, 0, 0, 2]
        },
        edu.thesis ? { text: [ { text: '◦ Dissertation: ', bold: true, fontSize: 10 }, { text: edu.thesis, fontSize: 10 } ], margin: [15, 0, 0, 1], alignment: 'justify' } : null,
        edu.advisor ? { text: [ { text: '◦ Supervisor: ', bold: true, fontSize: 10 }, { text: edu.advisor, fontSize: 10 } ], margin: [15, 0, 0, 1] } : null,
        edu.coursework ? { text: [ { text: '◦ Relevant Coursework: ', bold: true, fontSize: 10 }, { text: edu.coursework, fontSize: 10 } ], margin: [15, 0, 0, 2] } : null,
        edu.description ? { text: [ { text: '◦ Synopsis: ', bold: true, fontSize: 10 }, { text: edu.description, fontSize: 10 } ], margin: [15, 0, 0, 4], alignment: 'justify' } : null
      ])).flat().filter(Boolean),

      ...(data.experience && data.experience.length > 0 ? createSectionHeader('Experience') : []),
      ...(data.experience || []).map(exp => ([
        {
          columns: [
            { text: [ { text: '• ', bold: true }, { text: exp.organization, bold: true } ] },
            { text: exp.period, alignment: 'right', italics: true }
          ],
          margin: [0, 0, 0, 1]
        },
        {
          columns: [
            { text: \`\${exp.role}\${exp.location ? \` (\${exp.location})\` : ''}\`, italics: true },
            { text: '', alignment: 'right' }
          ],
          margin: [10, 0, 0, 2]
        },
        exp.description ? { text: [ { text: '◦ ' }, { text: exp.description, fontSize: 10 } ], margin: [15, 0, 0, 1], alignment: 'justify' } : null,
        ...(exp.highlights || []).map(h => {
          const match = h.match(/^([^:]+:)(.*)$/);
          if (match) {
            return { text: [ { text: '◦ ' }, { text: match[1], bold: true, fontSize: 10 }, { text: match[2], fontSize: 10 } ], margin: [15, 0, 0, 1], alignment: 'justify' };
          }
          return { text: [ { text: '◦ ' }, { text: h, fontSize: 10 } ], margin: [15, 0, 0, 1], alignment: 'justify' };
        })
      ])).flat().filter(Boolean),
      
      ...(researchInterestsText ? createSectionHeader('Research Interests') : []),
      ...(researchInterestsText ? [{ text: researchInterestsText, margin: [0, 0, 0, 10], alignment: 'justify' }] : []),
      
      ...(data.skillGroups && data.skillGroups.length > 0 ? createSectionHeader('Skills Summary') : []),
      ...(data.skillGroups || []).map(group => {
          return { 
            columns: [
              { text: [ { text: '• ', bold: true }, { text: \`\${group.category}:\`, bold: true } ], width: 180 },
              { text: group.skills.map(s => s.name).join(', ') }
            ],
            margin: [0, 0, 0, 2]
          };
      }),
      { text: '', margin: [0, 0, 0, 6] },

      ...(data.publications && data.publications.length > 0 ? createSectionHeader('Journal Publications/Under Peer-Review') : []),
      ...(data.publications || []).map(pub => {
          const pubParts = [
            { text: '• ', bold: true },
            { text: \`\${pub.authors}, "\${pub.title}," \${pub.venue}, \${pub.year}. \` }
          ];
          if (pub.doi) {
            const url = pub.url || \`https://doi.org/\${pub.doi}\`;
            pubParts.push({ text: \`doi: \n\`, link: url } as any);
            pubParts.push({ text: url, color: 'blue', decoration: 'underline', link: url } as any);
          }
          return { text: pubParts, margin: [0, 0, 0, 4], alignment: 'justify' };
      }),
      { text: '', margin: [0, 0, 0, 6] },

      ...(data.projects && data.projects.length > 0 ? createSectionHeader('Undergraduate Projects') : []),
      ...(data.projects || []).map(proj => {
          return { text: [ { text: '• ', bold: true }, { text: \`\${proj.title}: \`, bold: true }, proj.description, proj.date ? \` (\${proj.date})\` : '' ], margin: [0, 0, 0, 4], alignment: 'justify' };
      }),
      { text: '', margin: [0, 0, 0, 6] },

      ...(data.achievements && data.achievements.length > 0 ? createSectionHeader('Achievements and Awards') : []),
      ...(data.achievements || []).map(ach => {
          return { text: [ { text: '• ', bold: true }, \`\${ach.title}\${ach.category ? ', ' + ach.category : ''}\${ach.year ? ' - ' + ach.year : ''}\` ], margin: [0, 0, 0, 4], alignment: 'justify' };
      }),
      { text: '', margin: [0, 0, 0, 6] },

      ...(data.certifications && data.certifications.length > 0 ? createSectionHeader('Certifications') : []),
      ...(data.certifications || []).map(cert => {
          const titleText = cert.credentialUrl 
            ? { text: cert.title, color: 'blue', decoration: 'underline', link: cert.credentialUrl }
            : { text: cert.title };
            
          const mainLine = { 
            text: [
              { text: '• ', bold: true },
              cert.year ? \`(\${cert.year}) \` : '',
              titleText
            ], 
            margin: [0, 0, 0, 4] 
          };
          return mainLine;
      }),
      { text: '', margin: [0, 0, 0, 6] },

      ...(data.affiliations && data.affiliations.length > 0 ? createSectionHeader('Relevant Affiliations') : []),
      ...(data.affiliations || []).map(aff => {
          return { text: [ { text: '• ', bold: true }, { text: \`\${aff.organization}: \`, bold: true }, aff.role, aff.period ? \` (\${aff.period})\` : '' ], margin: [0, 0, 0, 4], alignment: 'justify' };
      }),
      { text: '', margin: [0, 0, 0, 6] },

      ...(data.volunteerWork && data.volunteerWork.length > 0 ? createSectionHeader('Volunteer Experience') : []),
      ...(data.volunteerWork || []).map(vol => ([
        {
          columns: [
            { text: [ { text: '• ', bold: true }, { text: vol.title || vol.role, bold: true, italics: true }, { text: vol.organization ? \`, \${vol.organization}\` : '', bold: true, italics: true } ] }
          ],
          margin: [0, 0, 0, 1]
        },
        {
          columns: [
            { text: vol.description || '', italics: true },
            { text: vol.period || '', alignment: 'right', italics: true }
          ],
          margin: [10, 0, 0, 4]
        }
      ])).flat().filter(Boolean),
      { text: '', margin: [0, 0, 0, 6] },

      ...(data.trainings && data.trainings.length > 0 ? createSectionHeader('Professional and Skill Trainings') : []),
      ...(data.trainings || []).map(tr => {
          return { text: [ { text: '• ', bold: true }, { text: \`\${tr.title}: \`, bold: true }, tr.description || tr.issuer, tr.year ? \` (\${tr.year})\` : '' ], margin: [0, 0, 0, 4], alignment: 'justify' };
      }),
      { text: '', margin: [0, 0, 0, 6] },

      ...(data.references && data.references.length > 0 ? createSectionHeader('References') : []),
      data.references && data.references.length > 0 ? {
        columns: data.references.map(ref => {
          return [
            { text: ref.name, bold: true, margin: [0, 0, 0, 1] },
            ref.designation || ref.role ? { text: ref.designation || ref.role } : null,
            ref.department || ref.institution ? { text: \`\${ref.department || ''}\${ref.department && ref.institution ? ', ' : ''}\${ref.institution || ''}\` } : null,
            ref.email ? { text: [{ text: 'Email: ' }, { text: ref.email, color: 'blue', decoration: 'underline', link: \`mailto:\${ref.email}\` }] } : null,
            ref.phone ? { text: \`Mobile: \${ref.phone}\` } : null
          ].filter(Boolean);
        }),
        columnGap: 20,
        margin: [0, 0, 0, 0]
      } : null
    ].filter(Boolean),
    styles: {
      header: {
        fontSize: 16,
        bold: true
      },
      sectionHeader: {
        fontSize: 12,
        bold: true,
        margin: [0, 10, 0, 0]
      }
    }
  };

  try {
    pdfMake.createPdf(docDefinition).download(\`\${profile.name.replace(/\\s+/g, '_')}_CV.pdf\`);
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Error generating PDF. Please check the console.');
  }
};
`;

fs.writeFileSync('src/utils/generateCV.ts', generateCVContent);
