export interface ContactInfo {
  email: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  from: string;
  to: string;
  bullets: string[];
  emoji?: string;
  logo?: string;
}

export interface Project {
  name: string;
  tech: string[];
  description: string;
  github?: string;
  live?: string;
}

export interface Education {
  school: string;
  degree: string;
  from: string;
  to: string;
  logo?: string;
  emoji?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  contact: ContactInfo;
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
  education: Education[];
  certifications: string[];
}

