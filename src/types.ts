export interface Profile {
  name: string;
  title: string;
  headline: string;
  bio: string;
  aboutText: string[];
  affiliation: string;
  department: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl?: string;
  logoUrl?: string;
  siteTitle?: string;
  cvUrl?: string;
  statusTag: string;
  stats: {
    citations: number;
    hIndex: number;
    publicationsCount: number;
    researchProjects: number;
  };
  social: {
    scholar?: string;
    researchgate?: string;
    github?: string;
    linkedin?: string;
    orcid?: string;
    twitter?: string;
    website?: string;
  };
}

export interface KeyFinding {
  label: string;
  value: string;
  unit: string;
  context: string;
  visual_type: 'gauge' | 'bar' | 'line' | 'stat_card' | 'comparison';
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  category: 'Journal' | 'Conference' | 'Preprint' | 'Book Chapter' | 'Workshop' | 'Under Review' | 'Submitted';
  doi?: string;
  link?: string;
  pdfUrl?: string;
  abstract: string;
  citations?: number;
  bibtex?: string;
  featured?: boolean;
  tags: string[];
  statusNote?: string;
  purpose?: string;
  key_findings?: KeyFinding[];
  methods_used?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  images?: string[];
  featured?: boolean;
  date?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  department?: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  current?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  department?: string;
  location?: string;
  year: string;
  result?: string;
  thesis?: string;
  coursework?: string;
  advisor?: string;
  description?: string;
}

export interface SkillItem {
  id?: string;
  name: string;
  level?: number;
  highlight?: boolean;
}

export interface SkillGroup {
  id: string;
  category: string;
  description?: string;
  skills: SkillItem[];
}

export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  year?: string;
  category?: string;
  description?: string;
}

export interface Affiliation {
  id: string;
  organization: string;
  role: string;
  membershipId?: string;
  period: string;
}

export interface VolunteerEngagement {
  id: string;
  title?: string;
  role?: string;
  organization?: string;
  description?: string;
  period?: string;
}

export type VolunteerExperience = VolunteerEngagement;

export interface CertificateModule {
  title: string;
  imageUrl?: string;
  images?: string[];
  credentialUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  modules?: CertificateModule[];
  imageUrl?: string;
  images?: string[];
  credentialUrl?: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  designation?: string;
  role?: string;
  department?: string;
  institution?: string;
  organization?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied?: boolean;
}

export interface AdminCredentials {
  username: string;
  passwordHashOrPlain: string;
  lastUpdated: string;
}

export interface Training {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  skillsAcquired?: string[];
  description?: string;
}


export interface CorePillar {
  id: string;
  icon: string;
  title: string;
  tag: string;
  description: string;
}

export interface CoreMetric {
  id: string;
  value: string;
  label: string;
  sub: string;
}


export interface SectionConfig {
  capabilities: { title: string; subtitle: string };
  projects: { title: string; subtitle: string };
  experience: { title: string; subtitle: string };
  publications: { title: string; subtitle: string };
  trainings: { title: string; subtitle: string };
  honors: { title: string; subtitle: string };
}

export interface PortfolioData {
  profile: Profile;
  sectionConfig?: SectionConfig;
  pillars?: CorePillar[];
  metrics?: CoreMetric[];
  publications: Publication[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  trainings?: Training[];
  certifications?: Certification[];
  achievements?: Achievement[];
  affiliations?: Affiliation[];
  volunteerWork?: VolunteerEngagement[];
  references?: Reference[];
  messages: Message[];
  adminConfig?: AdminCredentials;
}

