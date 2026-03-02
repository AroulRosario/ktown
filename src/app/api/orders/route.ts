import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const orders = await prisma.order.findMany({
            where: { userId: session.user.id as string },
            include: { orderItems: { include: { product: true, food: true } } },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(orders);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { items, address, notes } = await req.json();
        const totalAmount = items.reduce((t: number, i: any) => t + i.price * i.quantity, 0);

        const order = await prisma.order.create({
            data: {
                userId: session.user.id as string,
                totalAmount,
                address,
                notes,
                orderItems: {
                    create: items.map((i: any) => ({
                        productId: i.productId || null,
                        foodId: i.foodId || null,
                        quantity: i.quantity,
                        price: i.price,
                    })),
                },
            },
            include: { orderItems: true },
        });
        return NextResponse.json(order, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
