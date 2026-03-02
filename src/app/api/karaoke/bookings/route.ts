import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    try {
        const bookings = await prisma.karaokeBooking.findMany({
            where: { userId: session.user.id as string },
            include: { room: true },
            orderBy: { date: "desc" },
        });
        return NextResponse.json(bookings);
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { roomId, date, startTime, duration } = await req.json();
        const room = await prisma.karaokeRoom.findUnique({ where: { id: roomId } });
        if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });

        const booking = await prisma.karaokeBooking.create({
            data: {
                userId: session.user.id as string,
                roomId,
                date: new Date(date),
                startTime,
                duration: duration || 1,
                amount: room.price * (duration || 1),
            },
            include: { room: true },
        });
        return NextResponse.json(booking, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
