import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  summary: z.string().optional().nullable(),
  content: z.string().optional(),
  coverImage: z.string().url().optional().nullable(),
  tags: z.array(z.string()).optional(),
  repoUrl: z.string().url().optional().nullable(),
  demoUrl: z.string().url().optional().nullable(),
  featured: z.boolean().optional()
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: project }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = updateProjectSchema.parse(body);

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(parsed.title !== undefined && { title: parsed.title }),
        ...(parsed.slug !== undefined && { slug: parsed.slug }),
        ...(parsed.summary !== undefined && { summary: parsed.summary }),
        ...(parsed.content !== undefined && { content: parsed.content }),
        ...(parsed.coverImage !== undefined && { coverImage: parsed.coverImage }),
        ...(parsed.tags !== undefined && { tags: parsed.tags }),
        ...(parsed.repoUrl !== undefined && { repoUrl: parsed.repoUrl }),
        ...(parsed.demoUrl !== undefined && { demoUrl: parsed.demoUrl }),
        ...(parsed.featured !== undefined && { featured: parsed.featured })
      }
    });

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: err.issues }, { status: 400 });
    }
    if (err instanceof Error && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true }, { status: 204 });
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
