import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { createDefaultProgress, normalizeProgress } from "@/lib/progress/defaults";
import type { ProgressState } from "@/types/progress";

export const dynamic = "force-dynamic";

const dataDir = path.join(process.cwd(), "data");
const progressFile = path.join(dataDir, "progress.json");

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

async function writeServerProgress(progress: ProgressState) {
  await ensureDataDir();
  const normalized = normalizeProgress(progress);
  await writeFile(progressFile, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}

async function readServerProgress(): Promise<ProgressState> {
  await ensureDataDir();

  try {
    const raw = await readFile(progressFile, "utf8");
    return normalizeProgress(JSON.parse(raw) as Partial<ProgressState>);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      const empty = createDefaultProgress();
      await writeServerProgress(empty);
      return empty;
    }
    return createDefaultProgress();
  }
}

export async function GET() {
  return NextResponse.json(await readServerProgress());
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Partial<ProgressState>;
  return NextResponse.json(await writeServerProgress(normalizeProgress(body)));
}

export async function DELETE() {
  return NextResponse.json(await writeServerProgress(createDefaultProgress()));
}
