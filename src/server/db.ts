import { Pool } from 'pg';
import { 
  PortfolioData, 
  Publication, 
  Project, 
  Experience, 
  Education, 
  SkillGroup, 
  Training, 
  Certification,
  Achievement,
  Affiliation,
  VolunteerEngagement,
  Reference,
  Message 
} from '../types';

// --- Postgres connection (Neon) ---
// Prefer the pooled connection string (more resilient to idle disconnects),
// fall back to the direct one if that's all that's set.
const connectionString = process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set. Database operations will fail until it is configured.');
}

let pool: any;
if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
} else {
  console.warn('[AI Studio] DB not connected — mock active');
  pool = { 
    query: async () => ({ rows: [] }), 
    connect: async () => ({ query: async () => ({ rows: [] }), release: () => {} }) 
  };
}

const ROW_ID = 1;

const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Techno-Economic and Environmental Optimization of Advanced Hybrid Renewable Energy Systems with Green Hydrogen Production for Off-Grid Coastal Community Electrification in Bangladesh',
    authors: 'R. Islam, M. R. Ahmed, and S. I. Sayem',
    venue: 'Energy Conversion and Management: X, p. 102179',
    year: 2026,
    category: 'Journal',
    doi: '10.1016/j.ecmx.2026.102179',
    link: 'https://doi.org/10.1016/j.ecmx.2026.102179',
    abstract: 'Techno-economic and environmental optimization of an advanced hybrid renewable energy system with green hydrogen production designed for off-grid coastal community electrification in Bangladesh.',
    featured: true,
    tags: ['Hybrid Renewable Energy', 'Green Hydrogen', 'HOMER Pro', 'Off-Grid Electrification', 'Coastal Bangladesh'],
    bibtex: `@article{islam2026techno,\n  title={Techno-Economic and Environmental Optimization of Advanced Hybrid Renewable Energy Systems with Green Hydrogen Production for Off-Grid Coastal Community Electrification in Bangladesh},\n  author={Islam, R. and Ahmed, M. R. and Sayem, S. I.},\n  journal={Energy Conversion and Management: X},\n  pages={102179},\n  year={2026},\n  publisher={Elsevier},\n  doi={10.1016/j.ecmx.2026.102179}\n}`
  },
  {
    id: 'pub-2',
    title: 'Techno-economic investigation of a solar Photovoltaic (PV) energy model using PVsyst, Homer, RETscreen: a case study in Bangladesh',
    authors: 'S. M. S. M. Saumik, N. Rahman, M. A. Al Noman, R. Islam, and M. R. Ahmed',
    venue: 'Discover Electronics, vol. 2, no. 1, p. 81',
    year: 2025,
    category: 'Journal',
    doi: '10.1007/s44291-025-00119-1',
    link: 'https://doi.org/10.1007/s44291-025-00119-1',
    abstract: 'Comparative techno-economic investigation and energy yield assessment of a solar Photovoltaic (PV) system utilizing PVsyst, HOMER, and RETscreen software models for Bangladesh climate conditions.',
    featured: true,
    tags: ['Solar PV', 'PVsyst', 'HOMER', 'RETScreen', 'Techno-Economic Analysis'],
    bibtex: `@article{saumik2025techno,\n  title={Techno-economic investigation of a solar Photovoltaic (PV) energy model using PVsyst, Homer, RETscreen: a case study in Bangladesh},\n  author={Saumik, S. M. S. M. and Rahman, N. and Al Noman, M. A. and Islam, R. and Ahmed, M. R.},\n  journal={Discover Electronics},\n  volume={2},\n  number={1},\n  pages={81},\n  year={2025},\n  publisher={Springer Nature},\n  doi={10.1007/s44291-025-00119-1}\n}`
  },
  {
    id: 'pub-3',
    title: 'Performance and Emission Analysis of Hydrogen and Conventional Fuels in PFI SI Engines Using CONVERGE 3.0',
    authors: 'R. Islam, S. M. Asiqur Rahman, M. Rajin Islam, M. Rakibul Islam, M. R. Ahmed, and M. R. I. Sarker',
    venue: 'Next Energy, vol. 9, p. 100404',
    year: 2025,
    category: 'Journal',
    doi: '10.1016/j.nxener.2025.100404',
    link: 'https://doi.org/10.1016/j.nxener.2025.100404',
    abstract: 'Comprehensive 3D CFD combustion simulation, thermal efficiency assessment, and emission characterization comparing pure hydrogen against conventional fuels in port fuel injection spark ignition engines using CONVERGE 3.0.',
    featured: true,
    tags: ['Hydrogen Fuel', 'CONVERGE 3.0', 'PFI SI Engine', 'Combustion Modeling', 'Emissions Reduction'],
    bibtex: `@article{islam2025performance,\n  title={Performance and Emission Analysis of Hydrogen and Conventional Fuels in PFI SI Engines Using CONVERGE 3.0},\n  author={Islam, R. and Rahman, S. M. Asiqur and Islam, M. Rajin and Islam, M. Rakibul and Ahmed, M. R. and Sarker, M. R. I.},\n  journal={Next Energy},\n  volume={9},\n  pages={100404},\n  year={2025},\n  publisher={Elsevier},\n  doi={10.1016/j.nxener.2025.100404}\n}`
  },
  {
    id: 'pub-4',
    title: 'Computational Thermo-Hydraulic Performance Evaluation of a Shell and Tube Heat Exchanger Using Concave Triangular Ribs',
    authors: 'Rashedul Islam et al.',
    venue: 'Under Review',
    year: 2025,
    category: 'Under Review',
    abstract: 'Numerical investigation of fluid flow dynamics, heat transfer enhancement, and friction factor penalties in a shell and tube heat exchanger equipped with concave triangular turbulator ribs.',
    featured: false,
    tags: ['Heat Exchanger', 'Thermo-Hydraulic', 'ANSYS Fluent', 'CFD Simulation', 'Heat Transfer Enhancement'],
    statusNote: 'Under Review'
  },
  {
    id: 'pub-5',
    title: 'Exact Perron-Frobenius Orbits and Quantitative Convergence to Equilibrium for the Fully Chaotic Logistic Map',
    authors: 'Rashedul Islam et al.',
    venue: 'Under Review',
    year: 2025,
    category: 'Under Review',
    abstract: 'Analytical and numerical study establishing exact Perron-Frobenius transfer operator orbits and quantitative convergence rates towards invariant equilibrium measures in fully chaotic logistic map dynamics.',
    featured: false,
    tags: ['Dynamical Systems', 'Perron-Frobenius', 'Chaotic Logistic Map', 'Equilibrium Convergence', 'Mathematical Modeling'],
    statusNote: 'Under Review'
  },
  {
    id: 'pub-6',
    title: 'Comparative Molecular Dynamics Study of Mechanical, Thermal, and Fracture Behavior in Ti, Si, and Ti-Si-Doped Monolayer Graphene',
    authors: 'Rashedul Islam et al.',
    venue: 'Submitted',
    year: 2025,
    category: 'Submitted',
    abstract: 'Atomistic molecular dynamics simulation investigating stress-strain relationships, thermal conductivity variations, and crack propagation fracture mechanics in pristine and doped monolayer graphene.',
    featured: false,
    tags: ['Molecular Dynamics', 'Monolayer Graphene', 'Material Science', 'Fracture Mechanics', 'Thermal Behavior'],
    statusNote: 'Submitted'
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Electro-Mechanical Wheel Chair',
    category: 'Undergraduate Project',
    description: 'The goal of this project is to design and build an affordable solution to the mobility issues faced by those with physical limitations.',
    fullDescription: 'Utilized SolidWorks for designing CAD models Pro to render images and animations.',
    technologies: ['SolidWorks', 'CAD Modeling', 'Kinematic Analysis', 'Rendering & Animation'],
    featured: true,
    date: '2022'
  },
  {
    id: 'proj-2',
    title: 'Five speed Gear Box Mechanism with High rpm, high gear ratio and Fuel efficiency',
    category: 'Undergraduate Project',
    description: 'Used in coaxial input and output, more accuracy, high torque and high gear (6:1) ratio.',
    fullDescription: 'Designed for improved power transmission efficiency, optimized gear mesh ratios, and fuel economy.',
    technologies: ['Mechanical Design', 'Gear Ratio Optimization (6:1)', 'Coaxial Transmission', 'CAD'],
    featured: true,
    date: '2020'
  }
];

const INITIAL_EXPERIENCE: Experience[] = [
  {
    id: 'exp-1',
    role: 'Mechanical Engineering Intern',
    organization: 'Placid Bangladesh (Intern)',
    location: 'Dhaka, Bangladesh',
    period: 'Jan 2025 – May 2025',
    description: 'Mechanical systems assessment, product optimization, and maintenance operations.',
    highlights: [
      'Assessed mechanical systems and completed product optimization resulting in reduced material waste and improved operational efficiency.',
      'Participated in structured training sessions on technical operations, maintenance procedures, and quality standards.',
      'Gained practical exposure to maintenance scheduling, equipment inspection, and corrective action follow-up in a field environment.'
    ],
    current: false
  },
  {
    id: 'exp-2',
    role: 'Assistant Teacher',
    organization: 'Advance Coaching Center',
    location: 'Dinajpur, Bangladesh',
    period: 'Oct 2022 – Dec 2023',
    description: 'Delivered technical instruction and coaching for diverse student groups.',
    highlights: [
      'Delivered technical instruction and adapted training approaches to diverse learner needs- building foundational capacity-building and coaching skills applicable to field technician training.'
    ],
    current: false
  }
];

const INITIAL_EDUCATION: Education[] = [
  {
    id: 'edu-1',
    degree: 'B.Sc. in Mechanical Engineering',
    institution: 'Hajee Mohammad Danesh Science & Technology University (HSTU)',
    location: 'Dinajpur, Bangladesh',
    year: 'Jan 2019 – Dec 2022',
    result: 'CGPA: 3.363 / 4.00',
    thesis: 'Investigate the Performance of Hydrogen Fuel and Compare with Conventional Fuels in Port Fuel Injection SI Engine using CONVERGE CFD. (One Q1 Journal was Published- Next Energy, 2025)',
    coursework: 'Power Plant Engineering, Thermodynamics, Fluid Mechanics, Electrical Machines, Engineering Design, Heat Transfer, Renewable Energy Systems.'
  }
];

const INITIAL_SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'sg-1',
    category: 'Energy Modelling & Analysis',
    description: 'Hybrid system optimization, LCOE/NPC/LCOH analysis, load assessment, LCA',
    skills: [
      { name: 'HOMER Pro', highlight: true },
      { name: 'PVsyst', highlight: true },
      { name: 'RETscreen', highlight: true },
      { name: 'Hybrid System Optimization', highlight: true },
      { name: 'LCOE / NPC / LCOH Analysis', highlight: true },
      { name: 'Load Assessment & LCA', highlight: false }
    ]
  },
  {
    id: 'sg-2',
    category: 'Energy Systems',
    description: 'Solar PV, wind, biogas generator, electrolyzer, backup power, off-grid system design',
    skills: [
      { name: 'Solar PV', highlight: true },
      { name: 'Wind Energy', highlight: true },
      { name: 'Biogas Generator', highlight: true },
      { name: 'Electrolyzer & Green H2', highlight: true },
      { name: 'Backup Power', highlight: false },
      { name: 'Off-Grid System Design', highlight: true }
    ]
  },
  {
    id: 'sg-3',
    category: 'Electrical & Maintenance',
    description: 'Electrical installation assessment, preventive & corrective maintenance, generator performance monitoring, safety compliance',
    skills: [
      { name: 'Electrical Installation Assessment', highlight: true },
      { name: 'Preventive & Corrective Maintenance', highlight: true },
      { name: 'Generator Performance Monitoring', highlight: true },
      { name: 'Safety Compliance', highlight: false }
    ]
  },
  {
    id: 'sg-4',
    category: 'Technical Documentation & Capacity Building',
    description: 'Energy performance reports, system diagrams, maintenance records, feasibility studies, power assessments & coaching',
    skills: [
      { name: 'Energy Performance Reports', highlight: true },
      { name: 'System Diagrams', highlight: true },
      { name: 'Maintenance Records & Feasibility Studies', highlight: false },
      { name: 'Power Assessments', highlight: true },
      { name: 'Staff Training & Technician Coaching', highlight: true },
      { name: 'Hands-on Field Instruction', highlight: true }
    ]
  },
  {
    id: 'sg-5',
    category: 'CFD, Simulation & CAD Tools',
    description: 'CONVERGE CFD, ANSYS Fluent, COMSOL Multiphysics, SolidWorks (CSWE), AutoCAD, Solid Edge',
    skills: [
      { name: 'CONVERGE CFD', highlight: true },
      { name: 'ANSYS Fluent', highlight: true },
      { name: 'COMSOL Multiphysics', highlight: false },
      { name: 'SolidWorks (CSWE)', highlight: true },
      { name: 'AutoCAD', highlight: false },
      { name: 'Solid Edge', highlight: false }
    ]
  },
  {
    id: 'sg-6',
    category: 'Programming & Soft Skills',
    description: 'Python, MATLAB, Field logistics coordination, stakeholder communication, team leadership, project management',
    skills: [
      { name: 'Python', highlight: true },
      { name: 'MATLAB', highlight: true },
      { name: 'Field Logistics Coordination', highlight: true },
      { name: 'Stakeholder Communication', highlight: false },
      { name: 'Team Leadership & Project Management', highlight: true }
    ]
  }
];

const INITIAL_TRAININGS: Training[] = [
  {
    id: 'tr-1',
    title: '28 days of Mechanical Workshop',
    issuer: 'Technical Institute of Chemical Industries, Bangladesh (TICI)',
    year: '2023',
    description: 'Participated in scheduled training sessions on numerous methods of mechanical workshop, working procedure, and visited power plants including the Ashulia Gas Powerplant, Narsingdi; Bangladesh.'
  },
  {
    id: 'tr-2',
    title: '2 days training and workshop visit on Production Process of Machineries in Saidpur Railway Workshop',
    issuer: 'Saidpur Railway Workshop / Ansys Experts',
    year: '2019',
    description: 'Participated in all scheduled training sessions and lab works conducted by Ansys experts, gaining hands-on experience with workshop projects focused on turbulence and combustion in Ansys Fluent and CFX.'
  },
  {
    id: 'tr-3',
    title: "Field visit: Wind Turbine Power Plant, Cox's Bazar",
    issuer: "Cox's Bazar Wind Power Project",
    year: '2024',
    description: 'Operational energy data collection for off-grid hybrid energy research.'
  }
];

const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Energy Production Distribution & Safety',
    issuer: 'University of Buffalo and Stony Brook University, USA',
    year: '2026',
    modules: [
      { title: 'Natural Gas' },
      { title: 'Energy: The Enterprise' },
      { title: 'Electric Power System' },
      { title: 'Safety in the Utility Industry' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1589330694653-0618cb3e7e3e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cert-2',
    title: 'Renewable Energy Technology Fundamentals',
    issuer: 'University of Colorado Boulder, USA',
    year: '2026'
  },
  {
    id: 'cert-3',
    title: 'Materials Science for Advanced Technological Applications',
    issuer: 'Arizona State University, USA',
    year: '2026',
    modules: [
      { title: 'Phase Diagrams' },
      { title: 'Hardening, Polymers, Properties' },
      { title: 'Electrical Properties and Semiconductors' },
      { title: 'Ceramics and Composites' }
    ]
  },
  {
    id: 'cert-4',
    title: 'SolidWorks Certified Additive Manufacturing Associate, Certified CAD Professional, Certified Sheet Metal Professional',
    issuer: 'SolidWorks (Online)',
    year: '2020'
  },
  {
    id: 'cert-5',
    title: 'Certified on Physics Olympiad in Divisional Region',
    issuer: 'Bangladesh Physics Olympiad',
    year: '2017'
  },
  {
    id: 'cert-6',
    title: 'Workshop on Python PL',
    issuer: 'Technical Training',
    year: '2021'
  },
  {
    id: 'cert-7',
    title: 'Six Sigma Yellow Belt',
    issuer: 'Quality Certification',
    year: '2025'
  }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Bronze Medalist, Divisional Physics Olympiad',
    organization: 'Bangladesh Physics Olympiad',
    date: 'August, 2016'
  },
  {
    id: 'ach-2',
    title: 'Bronze Medalist, Regional Mathematical Olympiad',
    organization: 'Bangladesh Mathematical Olympiad',
    date: 'January, 2017'
  }
];

const INITIAL_AFFILIATIONS: Affiliation[] = [
  {
    id: 'aff-1',
    organization: "Cox’s Bazar Youth Development Society (CYDS)",
    role: 'Executive Member',
    period: '2024 - 2025'
  },
  {
    id: 'aff-2',
    organization: 'Institution of Mechanical Engineers (IMechE)',
    role: 'Affiliated Member',
    membershipId: '80778687',
    period: '2019 - 2024'
  },
  {
    id: 'aff-3',
    organization: 'American Society of Mechanical Engineers (ASME)',
    role: 'Student Member',
    membershipId: '103515864',
    period: '2019 - 2024'
  }
];

const INITIAL_VOLUNTEER: VolunteerEngagement[] = [
  {
    id: 'vol-1',
    title: 'Robo-riot Contest Event Organizer, Deceleration - A National Mechanical Festival',
    description: 'Organized and conducted two segments of the national inter-university mechanical festival at HSTU',
    period: '2022 – 2023'
  },
  {
    id: 'vol-2',
    title: 'Autodesk Ambassador Hub',
    description: 'Shared news about Autodesk products, events, and completed challenges on social media platforms',
    period: '2019 – 2021'
  },
  {
    id: 'vol-3',
    title: "Adjunct Teacher, Cox's Bazar Govt. High School",
    description: 'Conducted weekly classes for junior categories',
    period: '2017 – 2018'
  }
];

const INITIAL_REFERENCES: Reference[] = [
  {
    id: 'ref-1',
    name: 'Md. Rasel Ahmed',
    role: 'Lecturer',
    department: 'Department of Mechanical Engineering',
    organization: 'Rajshahi University of Engineering & Technology (RUET)',
    email: 'rasel@me.ruet.ac.bd',
    phone: '+880 1776 976 345',
    website: 'https://www.ruet.ac.bd/teachers/rasel.me'
  },
  {
    id: 'ref-2',
    name: 'KH. Nazmul Ahshan',
    role: 'Chairman and Assistant Professor',
    department: 'Department of Mechanical Engineering',
    organization: 'Hajee Mohammad Danesh Science & Technology University (HSTU)',
    email: 'nazmul.me@hstu.ac.bd',
    phone: '+880 1884 598 886',
    website: 'https://hstu.ac.bd/teacher/nazmul'
  }
];

const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'RASHEDUL ISLAM',
    title: 'Mechanical Engineer & Energy Researcher',
    headline: 'Renewable Energy Systems • Hybrid Energy Modelling • Off-Grid Infrastructure',
    bio: 'Mechanical engineer and energy researcher with expertise in renewable energy systems, hybrid energy modelling (HOMER Pro, PVsyst, RETscreen), and field-based energy analysis. Experienced in electrical system assessment, solar PV integration, generator performance monitoring, and energy efficiency optimization. Proven ability to design, validate, and document energy systems for off-grid and resource-constrained environments. Published researcher with hands-on fieldwork in remote energy infrastructure in coastal Bangladesh. Seeking to apply technical energy expertise in support of MSF humanitarian operations in Bangladesh.',
    aboutText: [
      'Mechanical engineer and energy researcher with expertise in renewable energy systems, hybrid energy modelling (HOMER Pro, PVsyst, RETscreen), and field-based energy analysis.',
      'Experienced in electrical system assessment, solar PV integration, generator performance monitoring, and energy efficiency optimization. Proven ability to design, validate, and document energy systems for off-grid and resource-constrained environments.',
      'Published researcher with hands-on fieldwork in remote energy infrastructure in coastal Bangladesh. Seeking to apply technical energy expertise in support of MSF humanitarian operations in Bangladesh.'
    ],
    affiliation: 'Hajee Mohammad Danesh Science & Technology University (HSTU)',
    department: 'Department of Mechanical Engineering',
    email: 'rashed.me.82@gmail.com',
    phone: '(+880) 1855 362 882',
    location: "Cox's Bazar Sadar, 4700, Bangladesh",
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    siteTitle: 'Rashedul Islam — Mechanical Engineer — Energy Systems',
    cvUrl: '#',
    statusTag: 'Seeking to apply technical energy expertise in support of MSF humanitarian operations in Bangladesh',
    stats: {
      citations: 15,
      hIndex: 2,
      publicationsCount: 6,
      researchProjects: 2
    },
    social: {
      linkedin: 'https://linkedin.com/in/rashedown'
    }
  },
  publications: INITIAL_PUBLICATIONS,
  projects: INITIAL_PROJECTS,
  experience: INITIAL_EXPERIENCE,
  education: INITIAL_EDUCATION,
  skillGroups: INITIAL_SKILL_GROUPS,
  trainings: INITIAL_TRAININGS,
  certifications: INITIAL_CERTIFICATIONS,
  achievements: INITIAL_ACHIEVEMENTS,
  affiliations: INITIAL_AFFILIATIONS,
  volunteerWork: INITIAL_VOLUNTEER,
  references: INITIAL_REFERENCES,
  messages: [],
  adminConfig: {
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHashOrPlain: process.env.ADMIN_PASSWORD || 'adminpassword123',
    lastUpdated: new Date().toISOString()
  }
};

export class PortfolioDatabase {
  private data: PortfolioData;
  private ready: Promise<void>;

  constructor() {
    // Start with defaults in memory immediately so the app never crashes
    // on a cold require(); the real data (if any) replaces this once
    // the Postgres load below finishes.
    this.data = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    this.ready = this.loadData();
  }

  // server.ts awaits this once at startup, before accepting requests,
  // so the very first request already sees real data instead of defaults.
  public async waitUntilReady(): Promise<void> {
    return this.ready;
  }

  private async ensureTable() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_data (
        id INTEGER PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  }

  private mergeWithDefaults(parsed: PortfolioData): PortfolioData {
    return {
      ...DEFAULT_PORTFOLIO_DATA,
      ...parsed,
      profile: {
        ...DEFAULT_PORTFOLIO_DATA.profile,
        ...(parsed.profile || {}),
        stats: {
          ...DEFAULT_PORTFOLIO_DATA.profile.stats,
          ...(parsed.profile?.stats || {})
        },
        social: {
          ...DEFAULT_PORTFOLIO_DATA.profile.social,
          ...(parsed.profile?.social || {})
        }
      },
      publications: Array.isArray(parsed.publications) ? parsed.publications : DEFAULT_PORTFOLIO_DATA.publications,
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_PORTFOLIO_DATA.projects,
      experience: Array.isArray(parsed.experience) ? parsed.experience : DEFAULT_PORTFOLIO_DATA.experience,
      education: Array.isArray(parsed.education) ? parsed.education : DEFAULT_PORTFOLIO_DATA.education,
      skillGroups: Array.isArray(parsed.skillGroups) ? parsed.skillGroups : DEFAULT_PORTFOLIO_DATA.skillGroups,
      trainings: Array.isArray(parsed.trainings) ? parsed.trainings : DEFAULT_PORTFOLIO_DATA.trainings,
      certifications: Array.isArray(parsed.certifications) ? parsed.certifications : DEFAULT_PORTFOLIO_DATA.certifications,
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : DEFAULT_PORTFOLIO_DATA.achievements,
      affiliations: Array.isArray(parsed.affiliations) ? parsed.affiliations : DEFAULT_PORTFOLIO_DATA.affiliations,
      volunteerWork: Array.isArray(parsed.volunteerWork) ? parsed.volunteerWork : DEFAULT_PORTFOLIO_DATA.volunteerWork,
      references: Array.isArray(parsed.references) ? parsed.references : DEFAULT_PORTFOLIO_DATA.references,
      messages: Array.isArray(parsed.messages) ? parsed.messages : DEFAULT_PORTFOLIO_DATA.messages,
      adminConfig: parsed.adminConfig || DEFAULT_PORTFOLIO_DATA.adminConfig
    };
  }

  private async loadData(): Promise<void> {
    try {
      await this.ensureTable();
      const result = await pool.query('SELECT data FROM portfolio_data WHERE id = $1', [ROW_ID]);
      if (result.rows.length > 0) {
        const parsed = result.rows[0].data as PortfolioData;
        this.data = this.mergeWithDefaults(parsed);
      } else {
        // First ever boot against this database: seed it with the defaults.
        await pool.query(
          'INSERT INTO portfolio_data (id, data) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
          [ROW_ID, JSON.stringify(this.data)]
        );
      }
    } catch (err) {
      console.error('Error loading portfolio database from Postgres (using in-memory defaults instead):', err);
    }
  }

  private sync() {
    // In-memory `this.data` is already updated by the caller before this runs,
    // so every public method below still returns synchronously exactly as before.
    // The write to Postgres happens in the background; a failure here is logged
    // but does not block or fail the caller's request.
    pool
      .query('UPDATE portfolio_data SET data = $1, updated_at = NOW() WHERE id = $2', [JSON.stringify(this.data), ROW_ID])
      .catch(err => console.error('Failed to persist database to Postgres:', err));
  }

  public getFullData(): PortfolioData {
    return this.data;
  }

  public getPublicData(): Omit<PortfolioData, 'messages' | 'adminConfig'> {
    const { messages, adminConfig, ...publicData } = this.data;
    return publicData;
  }

  public updateProfile(updatedProfile: Partial<PortfolioData['profile']>): PortfolioData['profile'] {
    this.data.profile = {
      ...this.data.profile,
      ...updatedProfile,
      stats: {
        ...this.data.profile.stats,
        ...(updatedProfile.stats || {})
      },
      social: {
        ...this.data.profile.social,
        ...(updatedProfile.social || {})
      }
    };
    this.sync();
    return this.data.profile;
  }

  public getAdminConfig() {
    return this.data.adminConfig || DEFAULT_PORTFOLIO_DATA.adminConfig!;
  }

  public verifyAdmin(username: string, passwordAttempt: string): boolean {
    const config = this.getAdminConfig();
    return config.username === username && config.passwordHashOrPlain === passwordAttempt;
  }

  public updateAdminCredentials(username: string, passwordHashOrPlain: string) {
    this.data.adminConfig = {
      username,
      passwordHashOrPlain,
      lastUpdated: new Date().toISOString()
    };
    this.sync();
    return true;
  }

  // --- Publications Operations ---
  public getPublications(): Publication[] {
    return this.data.publications;
  }

  public addPublication(pub: Omit<Publication, 'id'>): Publication {
    const newPub: Publication = {
      ...pub,
      id: `pub-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    this.data.publications.unshift(newPub);
    this.sync();
    return newPub;
  }

  public updatePublication(id: string, updatedPub: Partial<Publication>): Publication | null {
    const idx = this.data.publications.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.publications[idx] = {
      ...this.data.publications[idx],
      ...updatedPub,
      id
    };
    this.sync();
    return this.data.publications[idx];
  }

  public deletePublication(id: string): boolean {
    const beforeLen = this.data.publications.length;
    this.data.publications = this.data.publications.filter(p => p.id !== id);
    const deleted = this.data.publications.length < beforeLen;
    if (deleted) this.sync();
    return deleted;
  }

  public bulkImportPublications(
    newPubs: Array<Omit<Publication, 'id'> & { id?: string }>,
    options: { updateExisting?: boolean } = { updateExisting: true }
  ): { addedCount: number; updatedCount: number; publications: Publication[] } {
    let addedCount = 0;
    let updatedCount = 0;

    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

    for (const item of newPubs) {
      if (!item.title || !item.title.trim()) continue;

      const normTitle = normalize(item.title);
      const cleanDoi = (item.doi || '').trim().toLowerCase();

      // Find existing match
      const existingIdx = this.data.publications.findIndex(p => {
        if (cleanDoi && p.doi && p.doi.trim().toLowerCase() === cleanDoi) {
          return true;
        }
        if (normalize(p.title) === normTitle) {
          return true;
        }
        return false;
      });

      if (existingIdx !== -1) {
        if (options.updateExisting) {
          const existing = this.data.publications[existingIdx];
          this.data.publications[existingIdx] = {
            ...existing,
            ...item,
            id: existing.id,
            // Keep existing tags / featured status if not specified
            featured: item.featured ?? existing.featured,
            tags: (item.tags && item.tags.length > 0) ? item.tags : existing.tags,
            citations: item.citations !== undefined ? item.citations : existing.citations,
            doi: item.doi || existing.doi,
            link: item.link || existing.link,
            pdfUrl: item.pdfUrl || existing.pdfUrl,
            abstract: item.abstract || existing.abstract,
            bibtex: item.bibtex || existing.bibtex
          };
          updatedCount++;
        }
      } else {
        // Insert new publication
        const newPub: Publication = {
          title: item.title,
          authors: item.authors || 'Unknown Authors',
          venue: item.venue || 'Academic Publication',
          year: item.year || new Date().getFullYear(),
          category: item.category || 'Journal',
          doi: item.doi || '',
          link: item.link || '',
          pdfUrl: item.pdfUrl || '',
          abstract: item.abstract || '',
          citations: item.citations || 0,
          featured: !!item.featured,
          tags: item.tags || [],
          bibtex: item.bibtex || '',
          statusNote: item.statusNote || '',
          id: item.id || `pub-${Date.now()}-${Math.floor(Math.random() * 10000)}`
        };
        this.data.publications.unshift(newPub);
        addedCount++;
      }
    }

    this.sync();
    return {
      addedCount,
      updatedCount,
      publications: this.data.publications
    };
  }

  // --- Projects Operations ---
  public addProject(proj: Omit<Project, 'id'>): Project {
    const newProj: Project = {
      ...proj,
      id: `proj-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    this.data.projects.unshift(newProj);
    this.sync();
    return newProj;
  }

  public updateProject(id: string, updatedProj: Partial<Project>): Project | null {
    const idx = this.data.projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.projects[idx] = {
      ...this.data.projects[idx],
      ...updatedProj,
      id
    };
    this.sync();
    return this.data.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const beforeLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    const deleted = this.data.projects.length < beforeLen;
    if (deleted) this.sync();
    return deleted;
  }

  // --- Experience Operations ---
  public addExperience(exp: Omit<Experience, 'id'>): Experience {
    const newExp: Experience = {
      ...exp,
      id: `exp-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    this.data.experience.unshift(newExp);
    this.sync();
    return newExp;
  }

  public updateExperience(id: string, updatedExp: Partial<Experience>): Experience | null {
    const idx = this.data.experience.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.data.experience[idx] = {
      ...this.data.experience[idx],
      ...updatedExp,
      id
    };
    this.sync();
    return this.data.experience[idx];
  }

  public deleteExperience(id: string): boolean {
    const beforeLen = this.data.experience.length;
    this.data.experience = this.data.experience.filter(e => e.id !== id);
    const deleted = this.data.experience.length < beforeLen;
    if (deleted) this.sync();
    return deleted;
  }

  // --- Education Operations ---
  public addEducation(edu: Omit<Education, 'id'>): Education {
    const newEdu: Education = {
      ...edu,
      id: `edu-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    this.data.education.unshift(newEdu);
    this.sync();
    return newEdu;
  }

  public updateEducation(id: string, updatedEdu: Partial<Education>): Education | null {
    const idx = this.data.education.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.data.education[idx] = {
      ...this.data.education[idx],
      ...updatedEdu,
      id
    };
    this.sync();
    return this.data.education[idx];
  }

  public deleteEducation(id: string): boolean {
    const beforeLen = this.data.education.length;
    this.data.education = this.data.education.filter(e => e.id !== id);
    const deleted = this.data.education.length < beforeLen;
    if (deleted) this.sync();
    return deleted;
  }

  // --- Trainings Operations ---
  public getTrainings(): Training[] {
    return this.data.trainings || [];
  }

    public addCertification(cert: Omit<Certification, 'id'>): Certification {
    const newCert: Certification = {
      ...cert,
      id: `cert-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    if (!this.data.certifications) this.data.certifications = [];
    this.data.certifications.unshift(newCert);
    this.sync();
    return newCert;
  }

  
  public reorderTrainings(orderedIds: string[]): Training[] {
    if (!this.data.trainings) return [];
    
    const newOrder: Training[] = [];
    const currentMap = new Map(this.data.trainings.map(item => [item.id, item]));
    
    for (const id of orderedIds) {
      if (currentMap.has(id)) {
        newOrder.push(currentMap.get(id)!);
        currentMap.delete(id);
      }
    }
    
    // Add any remaining items not in orderedIds at the end
    for (const item of currentMap.values()) {
      newOrder.push(item);
    }
    
    this.data.trainings = newOrder;
    this.sync();
    return this.data.trainings;
  }

  
  public reorderExperiences(orderedIds: string[]): Experience[] {
    if (!this.data.experience) return [];
    
    const newOrder: Experience[] = [];
    const currentMap = new Map(this.data.experience.map(item => [item.id, item]));
    
    for (const id of orderedIds) {
      if (currentMap.has(id)) {
        newOrder.push(currentMap.get(id)!);
        currentMap.delete(id);
      }
    }
    
    // Add any remaining items not in orderedIds at the end
    for (const item of currentMap.values()) {
      newOrder.push(item);
    }
    
    this.data.experience = newOrder;
    this.sync();
    return this.data.experience;
  }

  
  public reorderEducations(orderedIds: string[]): Education[] {
    if (!this.data.education) return [];
    
    const newOrder: Education[] = [];
    const currentMap = new Map(this.data.education.map(item => [item.id, item]));
    
    for (const id of orderedIds) {
      if (currentMap.has(id)) {
        newOrder.push(currentMap.get(id)!);
        currentMap.delete(id);
      }
    }
    
    // Add any remaining items not in orderedIds at the end
    for (const item of currentMap.values()) {
      newOrder.push(item);
    }
    
    this.data.education = newOrder;
    this.sync();
    return this.data.education;
  }

  
  public reorderProjects(orderedIds: string[]): Project[] {
    if (!this.data.projects) return [];
    
    const newOrder: Project[] = [];
    const currentMap = new Map(this.data.projects.map(item => [item.id, item]));
    
    for (const id of orderedIds) {
      if (currentMap.has(id)) {
        newOrder.push(currentMap.get(id)!);
        currentMap.delete(id);
      }
    }
    
    // Add any remaining items not in orderedIds at the end
    for (const item of currentMap.values()) {
      newOrder.push(item);
    }
    
    this.data.projects = newOrder;
    this.sync();
    return this.data.projects;
  }

  public reorderCertifications(orderedIds: string[]): Certification[] {
    if (!this.data.certifications) return [];
    
    const newOrder: Certification[] = [];
    const currentMap = new Map(this.data.certifications.map(c => [c.id, c]));
    
    for (const id of orderedIds) {
      if (currentMap.has(id)) {
        newOrder.push(currentMap.get(id)!);
        currentMap.delete(id);
      }
    }
    
    for (const [_, cert] of currentMap) {
      newOrder.push(cert);
    }
    
    this.data.certifications = newOrder;
    this.sync();
    return this.data.certifications;
  }

  public updateCertification(id: string, certUpdates: Partial<Certification>): Certification | null {
    if (!this.data.certifications) return null;
    const idx = this.data.certifications.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.data.certifications[idx] = { ...this.data.certifications[idx], ...certUpdates };
    this.sync();
    return this.data.certifications[idx];
  }

  public deleteCertification(id: string): boolean {
    if (!this.data.certifications) return false;
    const beforeLen = this.data.certifications.length;
    this.data.certifications = this.data.certifications.filter(c => c.id !== id);
    const deleted = this.data.certifications.length < beforeLen;
    if (deleted) this.sync();
    return deleted;
  }

  public addTraining(training: Omit<Training, 'id'>): Training {
    const newTr: Training = {
      ...training,
      id: `tr-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    if (!this.data.trainings) this.data.trainings = [];
    this.data.trainings.unshift(newTr);
    this.sync();
    return newTr;
  }

  public updateTraining(id: string, updatedTr: Partial<Training>): Training | null {
    if (!this.data.trainings) this.data.trainings = [];
    const idx = this.data.trainings.findIndex(t => t.id === id);
    if (idx === -1) return null;
    this.data.trainings[idx] = {
      ...this.data.trainings[idx],
      ...updatedTr,
      id
    };
    this.sync();
    return this.data.trainings[idx];
  }

  public deleteTraining(id: string): boolean {
    if (!this.data.trainings) return false;
    const beforeLen = this.data.trainings.length;
    this.data.trainings = this.data.trainings.filter(t => t.id !== id);
    const deleted = this.data.trainings.length < beforeLen;
    if (deleted) this.sync();
    return deleted;
  }

  // --- Skills Operations ---
  public updateSkillGroups(groups: SkillGroup[]): SkillGroup[] {
    this.data.skillGroups = groups.map((g, idx) => ({
      ...g,
      id: g.id || `sg-${idx + 1}-${Date.now()}`,
      skills: Array.isArray(g.skills) ? g.skills : []
    }));
    this.sync();
    return this.data.skillGroups;
  }

  // --- Messages Operations ---
  public getMessages(): Message[] {
    return this.data.messages;
  }

  public addMessage(msg: { name: string; email: string; subject: string; message: string }): Message {
    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: msg.name.trim(),
      email: msg.email.trim(),
      subject: msg.subject.trim() || 'General Inquiry',
      message: msg.message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
      replied: false
    };
    this.data.messages.unshift(newMsg);
    this.sync();
    return newMsg;
  }

  public toggleMessageRead(id: string): Message | null {
    const idx = this.data.messages.findIndex(m => m.id === id);
    if (idx === -1) return null;
    this.data.messages[idx].read = !this.data.messages[idx].read;
    this.sync();
    return this.data.messages[idx];
  }

  public deleteMessage(id: string): boolean {
    const beforeLen = this.data.messages.length;
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    const deleted = this.data.messages.length < beforeLen;
    if (deleted) this.sync();
    return deleted;
  }

  // --- Full DB Operations ---
  public resetToDefault(): PortfolioData {
    this.data = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    this.sync();
    return this.data;
  }

  // --- Honors & Activities Operations ---
  public updateReferences(references: Reference[]): Reference[] {
    this.data.references = references.map((r, idx) => ({ ...r, id: r.id || `ref-${Date.now()}-${idx}` }));
    this.sync();
    return this.data.references;
  }

  public updateVolunteerWork(volunteerWork: VolunteerEngagement[]): VolunteerEngagement[] {
    this.data.volunteerWork = volunteerWork.map((v, idx) => ({ ...v, id: v.id || `vol-${Date.now()}-${idx}` }));
    this.sync();
    return this.data.volunteerWork;
  }

  public updateAchievements(achievements: Achievement[]): Achievement[] {
    this.data.achievements = achievements.map((a, idx) => ({ ...a, id: a.id || `ach-${Date.now()}-${idx}` }));
    this.sync();
    return this.data.achievements;
  }

  public updateAffiliations(affiliations: Affiliation[]): Affiliation[] {
    this.data.affiliations = affiliations.map((a, idx) => ({ ...a, id: a.id || `aff-${Date.now()}-${idx}` }));
    this.sync();
    return this.data.affiliations;
  }

  public importDatabase(importedData: any): boolean {
    if (!importedData || typeof importedData !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    if (!importedData.profile || !Array.isArray(importedData.publications)) {
      throw new Error('Missing essential profile or publications array');
    }
    this.data = {
      ...DEFAULT_PORTFOLIO_DATA,
      ...importedData,
      adminConfig: this.data.adminConfig
    };
    this.sync();
    return true;
  }
}

export const db = new PortfolioDatabase();
