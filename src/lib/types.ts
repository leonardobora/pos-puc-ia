export type Locale = "pt-BR" | "en";

export type Level = "foundation" | "intermediate" | "advanced";

export interface RepositoryItem {
  id: string;
  fullName: string;
  url: string;
  language: string;
  stars: number;
  lastActivity: string;
  level: Level;
  tags: string[];
  whyPt: string;
  whyEn: string;
}

export interface Subject {
  id: string;
  namePt: string;
  nameEn: string;
  summaryPt: string;
  summaryEn: string;
  repositories: RepositoryItem[];
}

export interface RepoUpdate {
  id: string;
  repoFullName: string;
  repoUrl: string;
  updatedAt: string;
  summaryPt: string;
  summaryEn: string;
}

export interface Milestone {
  id: string;
  titlePt: string;
  titleEn: string;
  status: "todo" | "in-progress" | "done";
  subjectId: string;
  referenceUrl?: string;
  notesPt: string;
  notesEn: string;
}
