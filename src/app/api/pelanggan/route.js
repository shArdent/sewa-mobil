import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
    try {
        const result = await prisma.pelanggan.findMany();
        return NextResponse.json({ data: result, message: "success" });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.json();
        const newPelanggan = await prisma.pelanggan.create({ data: formData });
        return NextResponse.json({ data: newPelanggan, message: "success" });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

