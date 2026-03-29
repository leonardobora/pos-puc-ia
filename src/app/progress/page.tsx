"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { t } from "@/lib/i18n";
import {
  CourseModule,
  Milestone,
  NotebookStatus,
  NotebookTaskStatus,
  StudyNotebook,
} from "@/lib/types";

function toDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

interface NotebookDraft {
  id: string;
  moduleId: string;
  status: NotebookStatus;
  summaryPt: string;
  summaryEn: string;
  focusPt: string;
  focusEn: string;
}

const NOTEBOOK_STATUS_ORDER: NotebookStatus[] = ["planned", "active", "review", "done"];
const TASK_STATUS_ORDER: NotebookTaskStatus[] = ["todo", "in-progress", "done"];

export default function ProgressPage() {
  const { locale } = useLocale();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [notebooks, setNotebooks] = useState<StudyNotebook[]>([]);
  const [adminSecret, setAdminSecret] = useState("");
  const [editingNotebookId, setEditingNotebookId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, NotebookDraft>>({});
  const [saveState, setSaveState] = useState<Record<string, string>>({});
  const [taskSavingId, setTaskSavingId] = useState<string | null>(null);

  async function loadAll() {
    const [progressRes, scheduleRes, notebookRes] = await Promise.all([
      fetch("/api/progress"),
      fetch("/api/schedule"),
      fetch("/api/notebook"),
    ]);

    const progressPayload = await progressRes.json();
    const schedulePayload = await scheduleRes.json();
    const notebookPayload = await notebookRes.json();

    setMilestones(progressPayload.milestones || []);
    setModules(schedulePayload.modules || []);
    setNotebooks(notebookPayload.notebooks || []);
  }

  useEffect(() => {
    loadAll().catch(() => {
      setMilestones([]);
      setModules([]);
      setNotebooks([]);
    });
  }, []);

  const statusLabel = useMemo(
    () => ({
      todo: t(locale, "statusTodo"),
      "in-progress": t(locale, "statusInProgress"),
      done: t(locale, "statusDone"),
    }),
    [locale],
  );

  const notebookStatusLabel = useMemo(
    () => ({
      planned: t(locale, "notebookStatusPlanned"),
      active: t(locale, "notebookStatusActive"),
      review: t(locale, "notebookStatusReview"),
      done: t(locale, "notebookStatusDone"),
    }),
    [locale],
  );

  const notebookStatusClass = (status: StudyNotebook["status"]) => {
    if (status === "done") return "bg-emerald-300/20 text-emerald-200";
    if (status === "review") return "bg-sky-300/20 text-sky-200";
    if (status === "active") return "bg-amber-300/20 text-amber-200";
    return "bg-slate-400/20 text-slate-200";
  };

  const taskStatusClass = (status: StudyNotebook["tasks"][number]["status"]) => {
    if (status === "done") return "border-emerald-400/40 bg-emerald-400/10";
    if (status === "in-progress") return "border-amber-400/40 bg-amber-400/10";
    return "border-slate-700 bg-slate-900/80";
  };

  const moduleCards = useMemo(() => {
    const notebookMap = new Map(notebooks.map((notebook) => [notebook.moduleId, notebook]));

    return modules.map((courseModule) => {
      const notebook = notebookMap.get(courseModule.id);
      const tasks = notebook?.tasks || [];
      const doneCount = tasks.filter((task) => task.status === "done").length;

      return {
        courseModule,
        notebook,
        tasks,
        doneCount,
      };
    });
  }, [modules, notebooks]);

  const overview = useMemo(() => {
    const tasks = notebooks.flatMap((notebook) => notebook.tasks);
    return {
      modulesTracked: notebooks.length,
      tasksOpen: tasks.filter((task) => task.status !== "done").length,
      tasksDone: tasks.filter((task) => task.status === "done").length,
    };
  }, [notebooks]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    [locale],
  );

  function getDraft(moduleId: string, notebook?: StudyNotebook): NotebookDraft {
    if (notebook) {
      return {
        id: notebook.id,
        moduleId,
        status: notebook.status,
        summaryPt: notebook.summaryPt,
        summaryEn: notebook.summaryEn,
        focusPt: notebook.focusPt,
        focusEn: notebook.focusEn,
      };
    }

    return {
      id: `nb-${moduleId}`,
      moduleId,
      status: "planned",
      summaryPt: "",
      summaryEn: "",
      focusPt: "",
      focusEn: "",
    };
  }

  function openEditor(moduleId: string, notebook?: StudyNotebook) {
    const draft = getDraft(moduleId, notebook);
    setDrafts((current) => ({ ...current, [draft.id]: draft }));
    setEditingNotebookId(draft.id);
    setSaveState((current) => ({ ...current, [draft.id]: "" }));
  }

  function cancelEditor() {
    setEditingNotebookId(null);
  }

  function updateDraft(id: string, patch: Partial<NotebookDraft>) {
    setDrafts((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...patch,
      },
    }));
  }

  async function saveNotebook(id: string) {
    const draft = drafts[id];
    if (!draft) return;

    setSaveState((current) => ({ ...current, [id]: "saving" }));

    try {
      const res = await fetch("/api/notebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify(draft),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || "Unable to save notebook");
      }

      const notebook = payload.notebook as StudyNotebook;
      setNotebooks((current) => {
        const index = current.findIndex((item) => item.id === notebook.id);
        if (index >= 0) {
          const next = [...current];
          next[index] = notebook;
          return next;
        }
        return [notebook, ...current];
      });

      setSaveState((current) => ({ ...current, [id]: "saved" }));
      setEditingNotebookId(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save notebook";
      setSaveState((current) => ({ ...current, [id]: `error:${message}` }));
    }
  }

  async function updateTask(taskId: string, status: NotebookTaskStatus) {
    setTaskSavingId(taskId);

    try {
      const res = await fetch("/api/notebook", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({ taskId, status }),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || "Unable to update task");
      }

      setNotebooks((current) =>
        current.map((notebook) => ({
          ...notebook,
          tasks: notebook.tasks.map((task) =>
            task.id === taskId ? { ...task, status: payload.task.status } : task,
          ),
        })),
      );
    } catch {
      // Keeps UX lightweight for now; errors are surfaced by save status at notebook level.
    } finally {
      setTaskSavingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
        <h1 className="font-serif text-3xl text-amber-300">{t(locale, "progressTitle")}</h1>
        <p className="mt-3 max-w-3xl text-slate-300">{t(locale, "progressIntro")}</p>

        <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
          <label className="block text-xs uppercase tracking-[0.14em] text-slate-400">
            {t(locale, "notebookAdminSecretLabel")}
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-300"
            type="password"
            value={adminSecret}
            placeholder={t(locale, "notebookAdminSecretPlaceholder")}
            onChange={(event) => setAdminSecret(event.target.value)}
          />
          <p className="mt-2 text-xs text-slate-400">{t(locale, "notebookAdminSecretHint")}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.14em] text-slate-400">{t(locale, "progressModulesTracked")}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{overview.modulesTracked}</p>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.14em] text-slate-400">{t(locale, "progressTasksOpen")}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{overview.tasksOpen}</p>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.14em] text-slate-400">{t(locale, "progressTasksDone")}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-100">{overview.tasksDone}</p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        {moduleCards.map(({ courseModule, notebook, tasks, doneCount }) => {
          const currentEditorId = notebook?.id || `nb-${courseModule.id}`;
          const isEditing = editingNotebookId === currentEditorId;
          const draft = drafts[currentEditorId] || getDraft(courseModule.id, notebook);
          const saveMessage = saveState[currentEditorId] || "";

          return (
            <article
              key={courseModule.id}
              className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl text-amber-300">
                    {locale === "pt-BR" ? courseModule.titlePt : courseModule.titleEn}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {courseModule.professor} · {dateFormatter.format(toDate(courseModule.startDate))} - {dateFormatter.format(toDate(courseModule.endDate))}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.13em] ${notebookStatusClass(
                      notebook?.status || "planned",
                    )}`}
                  >
                    {notebookStatusLabel[notebook?.status || "planned"]}
                  </span>
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-[0.13em] text-slate-300">
                    {tasks.length > 0 ? `${doneCount}/${tasks.length}` : "0/0"}
                  </span>
                  <button
                    className="rounded-full border border-amber-300/40 px-3 py-1 text-xs uppercase tracking-[0.13em] text-amber-200 hover:border-amber-300"
                    type="button"
                    onClick={() => openEditor(courseModule.id, notebook)}
                  >
                    {notebook ? t(locale, "notebookEdit") : t(locale, "notebookStart")}
                  </button>
                </div>
              </div>

              {isEditing ? (
                <div className="mt-5 space-y-4 rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                  <div>
                    <label className="text-xs uppercase tracking-[0.14em] text-slate-400">
                      {t(locale, "notebookStatus")}
                    </label>
                    <select
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
                      value={draft.status}
                      onChange={(event) =>
                        updateDraft(currentEditorId, {
                          status: event.target.value as NotebookStatus,
                        })
                      }
                    >
                      {NOTEBOOK_STATUS_ORDER.map((status) => (
                        <option key={status} value={status}>
                          {notebookStatusLabel[status]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div>
                      <label className="text-xs uppercase tracking-[0.14em] text-slate-400">{t(locale, "notebookSummaryPt")}</label>
                      <textarea
                        className="mt-2 h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                        value={draft.summaryPt}
                        onChange={(event) => updateDraft(currentEditorId, { summaryPt: event.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.14em] text-slate-400">{t(locale, "notebookSummaryEn")}</label>
                      <textarea
                        className="mt-2 h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                        value={draft.summaryEn}
                        onChange={(event) => updateDraft(currentEditorId, { summaryEn: event.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.14em] text-slate-400">{t(locale, "notebookFocusPt")}</label>
                      <textarea
                        className="mt-2 h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                        value={draft.focusPt}
                        onChange={(event) => updateDraft(currentEditorId, { focusPt: event.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.14em] text-slate-400">{t(locale, "notebookFocusEn")}</label>
                      <textarea
                        className="mt-2 h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                        value={draft.focusEn}
                        onChange={(event) => updateDraft(currentEditorId, { focusEn: event.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-200"
                      type="button"
                      onClick={() => saveNotebook(currentEditorId)}
                    >
                      {saveMessage === "saving" ? t(locale, "notebookSaving") : t(locale, "notebookSave")}
                    </button>
                    <button
                      className="rounded-xl border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-slate-400"
                      type="button"
                      onClick={cancelEditor}
                    >
                      {t(locale, "notebookCancel")}
                    </button>
                    {saveMessage === "saved" && (
                      <span className="text-sm text-emerald-300">{t(locale, "notebookSaved")}</span>
                    )}
                    {saveMessage.startsWith("error:") && (
                      <span className="text-sm text-rose-300">{saveMessage.slice(6)}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
                  <div className="space-y-4">
                    <section className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                      <h3 className="text-sm uppercase tracking-[0.14em] text-slate-400">{t(locale, "notebookSummary")}</h3>
                      <p className="mt-3 text-slate-200">
                        {notebook
                          ? locale === "pt-BR"
                            ? notebook.summaryPt
                            : notebook.summaryEn
                          : locale === "pt-BR"
                            ? "Caderno ainda não iniciado para este módulo."
                            : "Notebook not started for this module yet."}
                      </p>
                    </section>
                    <section className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                      <h3 className="text-sm uppercase tracking-[0.14em] text-slate-400">{t(locale, "notebookFocus")}</h3>
                      <p className="mt-3 text-slate-200">
                        {notebook
                          ? locale === "pt-BR"
                            ? notebook.focusPt
                            : notebook.focusEn
                          : locale === "pt-BR"
                            ? "Definir objetivo de estudo e primeiras tarefas deste módulo."
                            : "Define a study goal and first tasks for this module."}
                      </p>
                      {notebook && (
                        <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-500">
                          {t(locale, "notebookLastUpdate")}: {dateFormatter.format(new Date(notebook.updatedAt))}
                        </p>
                      )}
                    </section>
                  </div>

                  <section className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
                    <h3 className="text-sm uppercase tracking-[0.14em] text-slate-400">{t(locale, "notebookTasks")}</h3>
                    <div className="mt-4 space-y-3">
                      {tasks.length > 0 ? (
                        tasks.map((task) => (
                          <article
                            key={task.id}
                            className={`rounded-2xl border p-4 ${taskStatusClass(task.status)}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm text-slate-100">
                                {locale === "pt-BR" ? task.titlePt : task.titleEn}
                              </p>
                              <div className="flex items-center gap-2">
                                <select
                                  className="rounded-lg border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100"
                                  value={task.status}
                                  onChange={(event) =>
                                    updateTask(task.id, event.target.value as NotebookTaskStatus)
                                  }
                                >
                                  {TASK_STATUS_ORDER.map((status) => (
                                    <option key={status} value={status}>
                                      {statusLabel[status]}
                                    </option>
                                  ))}
                                </select>
                                {taskSavingId === task.id && (
                                  <span className="text-[11px] uppercase tracking-[0.13em] text-slate-400">
                                    {t(locale, "notebookSaving")}
                                  </span>
                                )}
                              </div>
                            </div>
                          </article>
                        ))
                      ) : (
                        <p className="text-slate-400">{t(locale, "notebookEmpty")}</p>
                      )}
                    </div>
                  </section>
                </div>
              )}
            </article>
          );
        })}
      </section>

      <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8">
        <h2 className="font-serif text-2xl text-amber-300">{t(locale, "progressMilestonesTitle")}</h2>
        <div className="mt-6 space-y-4">
          {milestones.map((milestone) => (
            <article
              key={milestone.id}
              className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-100">
                  {locale === "pt-BR" ? milestone.titlePt : milestone.titleEn}
                </h3>
                <span className="rounded-full bg-slate-400/20 px-3 py-1 text-xs uppercase tracking-[0.13em] text-slate-200">
                  {statusLabel[milestone.status]}
                </span>
              </div>
              <p className="mt-2 text-slate-300">
                {locale === "pt-BR" ? milestone.notesPt : milestone.notesEn}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
