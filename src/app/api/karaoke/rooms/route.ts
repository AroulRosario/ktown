import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET all rooms
export async function GET() {
    try {
        const rooms = await prisma.karaokeRoom.findMany({ where: { active: true } });
        return NextResponse.json(rooms);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
