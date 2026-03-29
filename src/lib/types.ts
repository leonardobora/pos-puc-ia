export type Locale = "pt-BR" | "en";

export type Level = "foundation" | "intermediate" | "advanced";

export type MilestoneStatus = "todo" | "in-progress" | "done";

export type NotebookStatus = "planned" | "active" | "review" | "done";

export type NotebookTaskStatus = "todo" | "in-progress" | "done";

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
  status: MilestoneStatus;
  subjectId: string;
  referenceUrl?: string;
  notesPt: string;
  notesEn: string;
}

export interface CourseModule {
  id: string;
  titlePt: string;
  titleEn: string;
  startDate: string;
  endDate: string;
  cohort: string;
  professor: string;
}

export interface NotebookTask {
  id: string;
  notebookId: string;
  titlePt: string;
  titleEn: string;
  status: NotebookTaskStatus;
}

export interface StudyNotebook {
  id: string;
  moduleId: string;
  status: NotebookStatus;
  summaryPt: string;
  summaryEn: string;
  focusPt: string;
  focusEn: string;
  updatedAt: string;
  tasks: NotebookTask[];
}