import { NextResponse } from "next/server";
import {
  getStudyNotebooks,
  updateNotebookTaskStatus,
  updateStudyNotebook,
} from "@/lib/data-store";
import { NotebookStatus, NotebookTaskStatus } from "@/lib/types";

const NOTEBOOK_STATUSES: NotebookStatus[] = ["planned", "active", "review", "done"];
const TASK_STATUSES: NotebookTaskStatus[] = ["todo", "in-progress", "done"];

function isWriteAuthorized(request: Request) {
  const expectedSecret = process.env.NOTEBOOK_ADMIN_SECRET ?? process.env.CRON_SECRET;
  if (!expectedSecret) {
    return false;
  }

  const providedSecret = request.headers.get("x-admin-secret");
  return providedSecret === expectedSecret;
}

export async function GET() {
  const notebooks = await getStudyNotebooks();
  return NextResponse.json({ notebooks });
}

export async function POST(request: Request) {
  if (!isWriteAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      moduleId?: string;
      status?: NotebookStatus;
      summaryPt?: string;
      summaryEn?: string;
      focusPt?: string;
      focusEn?: string;
    };

    const notebookId = body.id || (body.moduleId ? `nb-${body.moduleId}` : undefined);

    if (!notebookId) {
      return NextResponse.json(
        { error: "id or moduleId is required" },
        { status: 400 },
      );
    }

    if (body.status && !NOTEBOOK_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "invalid notebook status" }, { status: 400 });
    }

    const notebook = await updateStudyNotebook({
      id: notebookId,
      moduleId: body.moduleId,
      status: body.status,
      summaryPt: body.summaryPt,
      summaryEn: body.summaryEn,
      focusPt: body.focusPt,
      focusEn: body.focusEn,
    });

    return NextResponse.json({ notebook });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  if (!isWriteAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      taskId?: string;
      status?: NotebookTaskStatus;
    };

    if (!body.taskId || !body.status) {
      return NextResponse.json(
        { error: "taskId and status are required" },
        { status: 400 },
      );
    }

    if (!TASK_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "invalid task status" }, { status: 400 });
    }

    const task = await updateNotebookTaskStatus({
      taskId: body.taskId,
      status: body.status,
    });

    return NextResponse.json({ task });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}