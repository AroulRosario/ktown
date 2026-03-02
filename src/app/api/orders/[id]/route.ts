import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { status } = await req.json();
        const order = await prisma.order.update({ where: { id }, data: { status } });
        return NextResponse.json(order);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: { orderItems: { include: { product: true, food: true } } },
        });
        if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(order);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
