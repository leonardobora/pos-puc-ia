import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { SUBJECTS } from "@/lib/data/seed";

interface RepoSnapshot {
  repoFullName: string;
  repoUrl: string;
  updatedAt: string;
  stars: number;
}

async function fetchRepoSnapshot(
  fullName: string,
  token?: string,
): Promise<RepoSnapshot> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "postgrad-companion-sync",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`https://api.github.com/repos/${fullName}`, {
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${fullName}: ${response.status}`);
  }

  const payload = await response.json();

  return {
    repoFullName: payload.full_name as string,
    repoUrl: payload.html_url as string,
    updatedAt: payload.pushed_at as string,
    stars: payload.stargazers_count as number,
  };
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const repositories = SUBJECTS.flatMap((subject) => subject.repositories);

  const snapshots = await Promise.allSettled(
    repositories.map((repo) => fetchRepoSnapshot(repo.fullName, githubToken)),
  );

  const successful = snapshots
    .filter(
      (item): item is PromiseFulfilledResult<RepoSnapshot> =>
        item.status === "fulfilled",
    )
    .map((item) => item.value);

  const failed = snapshots
    .filter((item): item is PromiseRejectedResult => item.status === "rejected")
    .map((item) => String(item.reason));

  const supabase = getSupabaseAdminClient();

  if (supabase && successful.length > 0) {
    await supabase.from("repo_updates").upsert(
      successful.map((item) => ({
        id: `${item.repoFullName}-${item.updatedAt}`,
        repo_full_name: item.repoFullName,
        repo_url: item.repoUrl,
        updated_at: item.updatedAt,
        summary_pt: `Sync automático: atividade detectada em ${item.repoFullName}.`,
        summary_en: `Automated sync: activity detected in ${item.repoFullName}.`,
      })),
      { onConflict: "id" },
    );
  }

  return NextResponse.json({
    scanned: repositories.length,
    successful: successful.length,
    failed,
  });
}
