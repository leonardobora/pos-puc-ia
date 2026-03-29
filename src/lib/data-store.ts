import { MILESTONES, SUBJECTS, UPDATES } from "@/lib/data/seed";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { Milestone, RepoUpdate, Subject } from "@/lib/types";

interface RepositoryRow {
  id: string;
  full_name: string;
  url: string;
  language: string;
  stars: number;
  last_activity: string;
  level: "foundation" | "intermediate" | "advanced";
  tags: string[] | null;
  why_pt: string;
  why_en: string;
}

interface SubjectRow {
  id: string;
  name_pt: string;
  name_en: string;
  summary_pt: string;
  summary_en: string;
  repositories: RepositoryRow[] | null;
}

interface UpdateRow {
  id: string;
  repo_full_name: string;
  repo_url: string;
  updated_at: string;
  summary_pt: string;
  summary_en: string;
}

interface MilestoneRow {
  id: string;
  title_pt: string;
  title_en: string;
  status: "todo" | "in-progress" | "done";
  subject_id: string;
  reference_url: string | null;
  notes_pt: string;
  notes_en: string;
}

export async function getSubjects(): Promise<Subject[]> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return SUBJECTS;
  }

  const { data, error } = await supabase
    .from("subjects")
    .select("id,name_pt,name_en,summary_pt,summary_en,repositories(*)")
    .order("name_pt", { ascending: true });

  if (error || !data) {
    return SUBJECTS;
  }

  return (data as SubjectRow[]).map((item) => ({
    id: item.id,
    namePt: item.name_pt,
    nameEn: item.name_en,
    summaryPt: item.summary_pt,
    summaryEn: item.summary_en,
    repositories: (item.repositories || []).map((repo) => ({
      id: repo.id,
      fullName: repo.full_name,
      url: repo.url,
      language: repo.language,
      stars: repo.stars,
      lastActivity: repo.last_activity,
      level: repo.level,
      tags: repo.tags || [],
      whyPt: repo.why_pt,
      whyEn: repo.why_en,
    })),
  }));
}

export async function getUpdates(): Promise<RepoUpdate[]> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return UPDATES;
  }

  const { data, error } = await supabase
    .from("repo_updates")
    .select("id,repo_full_name,repo_url,updated_at,summary_pt,summary_en")
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error || !data) {
    return UPDATES;
  }

  return (data as UpdateRow[]).map((item) => ({
    id: item.id,
    repoFullName: item.repo_full_name,
    repoUrl: item.repo_url,
    updatedAt: item.updated_at,
    summaryPt: item.summary_pt,
    summaryEn: item.summary_en,
  }));
}

export async function getMilestones(): Promise<Milestone[]> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return MILESTONES;
  }

  const { data, error } = await supabase
    .from("milestones")
    .select("id,title_pt,title_en,status,subject_id,reference_url,notes_pt,notes_en")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return MILESTONES;
  }

  return (data as MilestoneRow[]).map((item) => ({
    id: item.id,
    titlePt: item.title_pt,
    titleEn: item.title_en,
    status: item.status,
    subjectId: item.subject_id,
    referenceUrl: item.reference_url || undefined,
    notesPt: item.notes_pt,
    notesEn: item.notes_en,
  }));
}
