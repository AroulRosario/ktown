import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    try {
        const food = await prisma.foodItem.findMany({
            where: { active: true, ...(category ? { category } : {}) },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(food);
    } catch {
        return NextResponse.json({ error: "Failed to fetch food items" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const item = await prisma.foodItem.create({ data: body });
        return NextResponse.json(item, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create food item" }, { status: 500 });
    }
}
