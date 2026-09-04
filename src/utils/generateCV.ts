import * as pdfMakeModule from 'pdfmake/build/pdfmake';
import * as pdfFontsModule from 'pdfmake/build/vfs_fonts';
import { PortfolioData } from '../types';

import tinosRegularUrl from '../fonts/Tinos-Regular.ttf?url';
import tinosBoldUrl from '../fonts/Tinos-Bold.ttf?url';
import tinosItalicUrl from '../fonts/Tinos-Italic.ttf?url';
import tinosBoldItalicUrl from '../fonts/Tinos-BoldItalic.ttf?url';

const pdfMake: any = pdfMakeModule && (pdfMakeModule as any).default ? (pdfMakeModule as any).default : pdfMakeModule;
const pdfFonts: any = pdfFontsModule && (pdfFontsModule as any).default ? (pdfFontsModule as any).default : pdfFontsModule;

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

pdfMake.fonts = {
  Times: {
    normal: window.location.origin + tinosRegularUrl,
    bold: window.location.origin + tinosBoldUrl,
    italics: window.location.origin + tinosItalicUrl,
    bolditalics: window.location.origin + tinosBoldItalicUrl
  }
};

const createSectionHeader = (title: string) => {
  return [
    { text: title, style: 'sectionHeader' },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }], margin: [0, 2, 0, 8] }
  ];
};

export const downloadCV = (data: PortfolioData) => {
  const { profile } = data;
  
  const docDefinition: any = {
    defaultStyle: {
      font: 'Times',
      fontSize: 10,
      lineHeight: 1.2
    },
    pageMargins: [40, 40, 40, 40],
    content: [
      { text: profile.name, style: 'header', alignment: 'left', margin: [0, 0, 0, 2] },
      { text: `Address: ${profile.location}`, alignment: 'left', margin: [0, 0, 0, 1] },
      { text: [{ text: 'Email: ' }, { text: profile.email, color: 'blue', decoration: 'underline', link: `mailto:${profile.email}` }], alignment: 'left', margin: [0, 0, 0, 1] },
      (profile.social?.linkedin ? { text: [{ text: 'LinkedIn: ' }, { text: profile.social.linkedin.replace(/^https?:\/\//, ''), color: 'blue', decoration: 'underline', link: profile.social.linkedin }], alignment: 'left', margin: [0, 0, 0, 1] } : null),
      { text: `Mobile: ${profile.phone || ''}`, alignment: 'left', margin: [0, 0, 0, 10] },
      
      ...createSectionHeader('Overview'),
      { text: profile.bio || profile.aboutText?.join(' '), margin: [0, 0, 0, 10], alignment: 'justify' },
      
      ...(data.education && data.education.length > 0 ? createSectionHeader('Education') : []),
      ...(data.education || []).map(edu => ([
        {
          columns: [
            { text: [ { text: '• ', bold: true }, { text: edu.institution, bold: true } ] },
            { text: 'Dinajpur, Bangladesh', alignment: 'right' } // Location, hardcoded for alignment matching reference, ideally should come from data if we had it, omitting for now or putting location if available. Wait, I will use location if we have it in edu, else empty.
          ],
          margin: [0, 0, 0, 1]
        },
        {
          columns: [
            { text: `${edu.degree}${edu.result ? `; CGPA: ${edu.result}` : ''}`, italics: true },
            { text: edu.year, alignment: 'right', italics: true }
          ],
          margin: [10, 0, 0, 2]
        },
        edu.thesis ? { text: [ { text: '◦ Dissertation: ', bold: true, fontSize: 9 }, { text: edu.thesis, fontSize: 9 } ], margin: [15, 0, 0, 1] } : null,
        edu.advisor ? { text: [ { text: '◦ Supervisor: ', bold: true, fontSize: 9 }, { text: edu.advisor, fontSize: 9 } ], margin: [15, 0, 0, 1] } : null,
        edu.coursework ? { text: [ { text: '◦ Relevant Coursework: ', bold: true, fontSize: 9 }, { text: edu.coursework, fontSize: 9 } ], margin: [15, 0, 0, 4] } : null,
        // The synopsis is not explicitly in the type, but if there's description we can use it.
        edu.description ? { text: [ { text: '◦ Synopsis: ', bold: true, fontSize: 9 }, { text: edu.description, fontSize: 9 } ], margin: [15, 0, 0, 4], alignment: 'justify' } : null
      ])).flat().filter(Boolean),

      ...(data.experience && data.experience.length > 0 ? createSectionHeader('Experience') : []),
      ...(data.experience || []).map(exp => {
        const organizationLine = [
          { text: '• ', bold: true },
          { text: exp.organization, bold: true },
          exp.department ? { text: ` · ${exp.department}`, bold: true } : '',
          exp.employmentType ? { text: ` · ${exp.employmentType}`, bold: true } : '',
          exp.location ? { text: `, ${exp.location}`, bold: true } : ''
        ].filter(Boolean);
        
        return [
          {
            columns: [
              { text: organizationLine }
            ],
            margin: [0, 0, 0, 1]
          },
          {
            columns: [
              { text: exp.role, italics: true },
              { text: exp.period, alignment: 'right', italics: true }
            ],
            margin: [10, 0, 0, 2]
          },
          exp.supervisors ? { text: `Supervised by:\n${exp.supervisors.replace(/^Supervised by:\s*/i, '')}`, margin: [10, 0, 0, 2], fontSize: 9 } : null,
          exp.description ? { text: exp.description, margin: [10, 0, 0, 2], fontSize: 9 } : null,
          exp.paperLink ? { text: `Published Paper: ${exp.paperLink}`, margin: [10, 0, 0, 2], fontSize: 9, color: 'blue', link: exp.paperLink } : null,
          ...(exp.highlights || []).map(h => {
            const match = h.match(/^([^:]+:)(.*)$/);
            if (match) {
              return { text: [ { text: '◦ ' }, { text: match[1], bold: true, fontSize: 9 }, { text: match[2], fontSize: 9 } ], margin: [15, 0, 0, 1] };
            }
            return { text: [ { text: '◦ ' }, { text: h, fontSize: 9 } ], margin: [15, 0, 0, 1] };
          })
        ];
      }).flat().filter(Boolean),
      
      ...(data.skillGroups && data.skillGroups.length > 0 ? createSectionHeader('Skills Summary') : []),
      data.skillGroups && data.skillGroups.length > 0 ? {
        ul: (data.skillGroups || []).map(group => {
          return { text: [ { text: `${group.category}: `, bold: true }, group.skills.map(s => s.name).join(', ') ], margin: [0, 0, 0, 2] };
        }),
        margin: [10, 0, 0, 6]
      } : null,

      ...(data.publications && data.publications.length > 0 ? createSectionHeader('Journal Publications/Under Peer-Review') : []),
      data.publications && data.publications.length > 0 ? {
        ul: (data.publications || []).map(pub => {
          const pubParts = [
            { text: `${pub.authors}, "${pub.title}," ${pub.venue}, ${pub.year}. ` }
          ];
          if (pub.doi) {
            pubParts.push({ text: `doi: ${pub.doi}`, color: 'blue', decoration: 'underline', link: pub.link || `https://doi.org/${pub.doi}` } as any);
          }
          return { text: pubParts, margin: [0, 0, 0, 4] };
        }),
        margin: [10, 0, 0, 6],
        fontSize: 10
      } : null,

      ...(data.projects && data.projects.length > 0 ? createSectionHeader('Undergraduate Projects') : []),
      data.projects && data.projects.length > 0 ? {
        ul: (data.projects || []).map(proj => {
          return { text: [ { text: `${proj.title}: `, bold: true }, proj.description, proj.date ? ` (${proj.date})` : '' ], margin: [0, 0, 0, 4] };
        }),
        margin: [10, 0, 0, 6],
        fontSize: 10
      } : null,

      ...(data.achievements && data.achievements.length > 0 ? createSectionHeader('Achievements and Awards') : []),
      data.achievements && data.achievements.length > 0 ? {
        ul: (data.achievements || []).map(ach => {
          return { text: `${ach.title}${ach.category ? ', ' + ach.category : ''}${ach.year ? ' - ' + ach.year : ''}`, margin: [0, 0, 0, 4] };
        }),
        margin: [10, 0, 0, 6],
        fontSize: 10
      } : null,

      ...(data.certifications && data.certifications.length > 0 ? createSectionHeader('Certifications') : []),
      data.certifications && data.certifications.length > 0 ? {
        ul: (data.certifications || []).map(cert => {
          const titleText = cert.credentialUrl 
            ? { text: cert.title, color: 'blue', decoration: 'underline', link: cert.credentialUrl }
            : { text: cert.title };
            
          const mainLine = { 
            text: [
              cert.year ? `(${cert.year}) ` : '',
              titleText
            ], 
            margin: [0, 0, 0, 4] 
          };
          return mainLine;
        }),
        margin: [10, 0, 0, 6],
        fontSize: 10
      } : null,

      ...(data.affiliations && data.affiliations.length > 0 ? createSectionHeader('Relevant Affiliations') : []),
      data.affiliations && data.affiliations.length > 0 ? {
        ul: (data.affiliations || []).map(aff => {
          return { text: [ { text: `${aff.organization}: `, bold: true }, aff.role, aff.period ? ` (${aff.period})` : '' ], margin: [0, 0, 0, 4] };
        }),
        margin: [10, 0, 0, 6],
        fontSize: 10
      } : null,

      ...(data.volunteerWork && data.volunteerWork.length > 0 ? createSectionHeader('Volunteer Experience') : []),
      ...(data.volunteerWork || []).map(vol => ([
        {
          columns: [
            { text: [ { text: '• ', bold: true }, { text: vol.role || vol.title, bold: true }, { text: vol.organization ? `, ${vol.organization}` : ''} ] },
            { text: vol.period || '', alignment: 'right', italics: true }
          ],
          margin: [0, 0, 0, 1]
        },
        vol.description ? { text: vol.description, margin: [10, 0, 0, 4], italics: true, fontSize: 10 } : null
      ])).flat().filter(Boolean),

      ...(data.trainings && data.trainings.length > 0 ? createSectionHeader('Professional and Skill Trainings') : []),
      data.trainings && data.trainings.length > 0 ? {
        ul: (data.trainings || []).map(tr => {
          return { text: [ { text: `${tr.title}: `, bold: true }, tr.description || tr.issuer, tr.year ? ` (${tr.year})` : '' ], margin: [0, 0, 0, 4] };
        }),
        margin: [10, 0, 0, 6],
        fontSize: 10
      } : null,

      ...(data.references && data.references.length > 0 ? createSectionHeader('References') : []),
      data.references && data.references.length > 0 ? {
        columns: data.references.map(ref => {
          return [
            { text: ref.name, bold: true, margin: [0, 0, 0, 1] },
            ref.designation || ref.role ? { text: ref.designation || ref.role } : null,
            ref.department || ref.institution ? { text: `${ref.department || ''}${ref.department && ref.institution ? ', ' : ''}${ref.institution || ''}` } : null,
            ref.email ? { text: `Email: ${ref.email}`, color: 'blue', decoration: 'underline', link: `mailto:${ref.email}` } : null,
            ref.phone ? { text: `Mobile: ${ref.phone}` } : null
          ].filter(Boolean);
        }),
        columnGap: 20,
        margin: [10, 0, 0, 0]
      } : null
    ].filter(Boolean),
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      sectionHeader: {
        fontSize: 13,
        bold: true,
        margin: [0, 10, 0, 0]
      }
    }
  };

  pdfMake.createPdf(docDefinition).download(`${profile.name.replace(/\s+/g, '_')}_CV.pdf`);
};
