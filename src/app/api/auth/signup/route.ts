import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Make the first user or specific email an ADMIN
        const userCount = await prisma.user.count();
        const role = (userCount === 0 || email === "admin@ktown.com") ? "ADMIN" : "USER";

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role,
            },
        });

        return NextResponse.json({ message: "User created", role: user.role }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Signup failed" }, { status: 500 });
    }
}
