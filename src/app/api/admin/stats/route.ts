import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Admin-only: get full stats + all orders
export async function GET() {
    const session = await auth();
    // @ts-ignore
    if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const [orders, users, products, foodItems, bookings] = await Promise.all([
            prisma.order.findMany({
                include: { user: { select: { name: true, email: true } }, orderItems: { include: { product: true, food: true } } },
                orderBy: { createdAt: "desc" },
                take: 50,
            }),
            prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
            prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
            prisma.foodItem.findMany({ orderBy: { createdAt: "desc" } }),
            prisma.karaokeBooking.findMany({
                include: { user: { select: { name: true } }, room: true },
                orderBy: { date: "desc" },
                take: 20,
            }),
        ]);

        const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const activeOrders = orders.filter((o) => ["PENDING", "COOKING", "OUT_FOR_DELIVERY"].includes(o.status));

        return NextResponse.json({ orders, users, products, foodItems, bookings, revenue, activeOrders });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
