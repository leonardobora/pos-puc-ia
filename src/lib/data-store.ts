import {
  COURSE_MODULES,
  MILESTONES,
  NOTEBOOKS,
  SUBJECTS,
  UPDATES,
} from "@/lib/data/seed";
import {
  getSupabaseAdminClient,
  getSupabaseWriteClient,
} from "@/lib/supabase-admin";
import {
  CourseModule,
  Milestone,
  NotebookStatus,
  NotebookTask,
  NotebookTaskStatus,
  RepoUpdate,
  StudyNotebook,
  Subject,
} from "@/lib/types";

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

interface CourseModuleRow {
  id: string;
  title_pt: string;
  title_en: string;
  start_date: string;
  end_date: string;
  cohort: string;
  professor: string;
  credits: number;
  class_hours: number;
  clock_hours: number;
  status: "a-cursar" | "concluido";
}

interface NotebookTaskRow {
  id: string;
  notebook_id: string;
  title_pt: string;
  title_en: string;
  status: NotebookTaskStatus;
}

interface NotebookRow {
  id: string;
  module_id: string;
  status: NotebookStatus;
  summary_pt: string;
  summary_en: string;
  focus_pt: string;
  focus_en: string;
  updated_at: string;
  notebook_tasks: NotebookTaskRow[] | null;
}

interface UpdateStudyNotebookInput {
  id: string;
  moduleId?: string;
  status?: NotebookStatus;
  summaryPt?: string;
  summaryEn?: string;
  focusPt?: string;
  focusEn?: string;
}

interface UpdateNotebookTaskInput {
  taskId: string;
  status: NotebookTaskStatus;
}

function mapNotebookRow(item: NotebookRow): StudyNotebook {
  return {
    id: item.id,
    moduleId: item.module_id,
    status: item.status,
    summaryPt: item.summary_pt,
    summaryEn: item.summary_en,
    focusPt: item.focus_pt,
    focusEn: item.focus_en,
    updatedAt: item.updated_at,
    tasks: (item.notebook_tasks || []).map((task) => ({
      id: task.id,
      notebookId: task.notebook_id,
      titlePt: task.title_pt,
      titleEn: task.title_en,
      status: task.status,
    })),
  };
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

export async function getCourseModules(): Promise<CourseModule[]> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return COURSE_MODULES;
  }

  const { data, error } = await supabase
    .from("course_modules")
    .select(
      "id,title_pt,title_en,start_date,end_date,cohort,professor,credits,class_hours,clock_hours,status",
    )
    .order("start_date", { ascending: true });

  if (error || !data) {
    return COURSE_MODULES;
  }

  return (data as CourseModuleRow[]).map((item) => ({
    id: item.id,
    titlePt: item.title_pt,
    titleEn: item.title_en,
    startDate: item.start_date,
    endDate: item.end_date,
    cohort: item.cohort,
    professor: item.professor,
    credits: item.credits ?? 0,
    classHours: item.class_hours ?? 0,
    clockHours: item.clock_hours ?? 0,
    status: item.status ?? "a-cursar",
  }));
}

export async function getStudyNotebooks(): Promise<StudyNotebook[]> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NOTEBOOKS;
  }

  const { data, error } = await supabase
    .from("study_notebooks")
    .select(
      "id,module_id,status,summary_pt,summary_en,focus_pt,focus_en,updated_at,notebook_tasks(id,notebook_id,title_pt,title_en,status)",
    )
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return NOTEBOOKS;
  }

  return (data as NotebookRow[]).map(mapNotebookRow);
}

export async function updateStudyNotebook(
  input: UpdateStudyNotebookInput,
): Promise<StudyNotebook> {
  const supabase = getSupabaseWriteClient();
  if (!supabase) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for notebook updates");
  }

  const updatePayload: Record<string, string> = {};
  if (input.status !== undefined) updatePayload.status = input.status;
  if (input.summaryPt !== undefined) updatePayload.summary_pt = input.summaryPt;
  if (input.summaryEn !== undefined) updatePayload.summary_en = input.summaryEn;
  if (input.focusPt !== undefined) updatePayload.focus_pt = input.focusPt;
  if (input.focusEn !== undefined) updatePayload.focus_en = input.focusEn;

  const hasUpdatableField =
    input.status !== undefined ||
    input.summaryPt !== undefined ||
    input.summaryEn !== undefined ||
    input.focusPt !== undefined ||
    input.focusEn !== undefined;
  if (!hasUpdatableField) {
    throw new Error("At least one notebook field must be provided");
  }

  updatePayload.updated_at = new Date().toISOString();

  const { data: existingData, error: existingError } = await supabase
    .from("study_notebooks")
    .select("id,module_id")
    .eq("id", input.id)
    .limit(1);

  if (existingError) {
    throw new Error(existingError.message);
  }

  const existing = existingData && existingData.length > 0;
  let updateError: Error | null = null;

  if (existing) {
    const result = await supabase
      .from("study_notebooks")
      .update(updatePayload)
      .eq("id", input.id);
    updateError = result.error;
  } else {
    const moduleId = input.moduleId;
    if (!moduleId) {
      throw new Error("moduleId is required when creating a notebook");
    }

    const result = await supabase.from("study_notebooks").insert({
      id: input.id,
      module_id: moduleId,
      status: updatePayload.status ?? "planned",
      summary_pt: updatePayload.summary_pt ?? "",
      summary_en: updatePayload.summary_en ?? "",
      focus_pt: updatePayload.focus_pt ?? "",
      focus_en: updatePayload.focus_en ?? "",
      updated_at: updatePayload.updated_at,
    });
    updateError = result.error;
  }

  if (updateError) {
    throw new Error(updateError.message);
  }

  const { data, error: readError } = await supabase
    .from("study_notebooks")
    .select(
      "id,module_id,status,summary_pt,summary_en,focus_pt,focus_en,updated_at,notebook_tasks(id,notebook_id,title_pt,title_en,status)",
    )
    .eq("id", input.id)
    .limit(1);

  if (readError || !data || data.length === 0) {
    throw new Error(readError?.message || "Notebook not found after update");
  }

  return mapNotebookRow(data[0] as NotebookRow);
}

export async function updateNotebookTaskStatus(
  input: UpdateNotebookTaskInput,
): Promise<NotebookTask> {
  const supabase = getSupabaseWriteClient();
  if (!supabase) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for task updates");
  }

  const { error: updateError } = await supabase
    .from("notebook_tasks")
    .update({ status: input.status })
    .eq("id", input.taskId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  const { data, error: readError } = await supabase
    .from("notebook_tasks")
    .select("id,notebook_id,title_pt,title_en,status")
    .eq("id", input.taskId)
    .limit(1);

  if (readError || !data || data.length === 0) {
    throw new Error(readError?.message || "Notebook task not found after update");
  }

  const item = data[0] as NotebookTaskRow;
  return {
    id: item.id,
    notebookId: item.notebook_id,
    titlePt: item.title_pt,
    titleEn: item.title_en,
    status: item.status,
  };
}
