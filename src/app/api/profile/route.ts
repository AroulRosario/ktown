import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET current user profile + stats
export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id as string },
            include: {
                orders: {
                    include: { orderItems: { include: { product: true, food: true } } },
                    orderBy: { createdAt: "desc" },
                    take: 10,
                },
                karaokeBookings: {
                    include: { room: true },
                    orderBy: { date: "desc" },
                    take: 5,
                },
            },
        });

        if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

        const stats = {
            totalOrders: user.orders.length,
            karaokeHours: user.karaokeBookings.reduce((sum, b) => sum + b.duration, 0),
            repPoints: user.repPoints,
        };

        return NextResponse.json({ user, stats });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
