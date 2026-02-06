import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const createProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().optional().nullable(),
  content: z.string(),
  coverImage: z.string().url().optional().nullable(),
  tags: z.array(z.string()).optional(),
  repoUrl: z.string().url().optional().nullable(),
  demoUrl: z.string().url().optional().nullable(),
  featured: z.boolean().optional()
});

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json({ data: projects }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createProjectSchema.parse(body);

    const created = await prisma.project.create({
      data: {
        title: parsed.title,
        slug: parsed.slug,
        summary: parsed.summary ?? null,
        content: parsed.content,
        coverImage: parsed.coverImage ?? null,
        tags: parsed.tags ?? [],
        repoUrl: parsed.repoUrl ?? null,
        demoUrl: parsed.demoUrl ?? null,
        featured: parsed.featured ?? false
      }
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: err.issues }, { status: 400 });
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
