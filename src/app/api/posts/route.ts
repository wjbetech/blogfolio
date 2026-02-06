import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string(),
  coverImage: z.string().url().optional().nullable(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional()
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const perPage = Math.min(Number(url.searchParams.get("perPage") ?? 10), 100);
    const skip = (Math.max(page, 1) - 1) * perPage;

    const posts = await prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
      skip,
      take: perPage
    });

    return NextResponse.json({ data: posts }, { status: 200 });
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
    const parsed = createPostSchema.parse(body);

    const created = await prisma.post.create({
      data: {
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt,
        content: parsed.content,
        coverImage: parsed.coverImage ?? null,
        tags: parsed.tags ?? [],
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
