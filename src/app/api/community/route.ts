import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const posts = await prisma.communityPost.findMany({
            include: {
                user: { select: { name: true, image: true, id: true } },
                comments: true,
            },
            orderBy: { createdAt: "desc" },
            take: 20,
        });
        return NextResponse.json(posts);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId, content, image } = await req.json();
        if (!userId || !content) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        const post = await prisma.communityPost.create({
            data: { userId, content, image },
            include: { user: { select: { name: true, image: true, id: true } } },
        });
        return NextResponse.json(post, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
