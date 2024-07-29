import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
    try {
        const result = await prisma.pembayaran.findMany({
            include: {
                transaksi: true
            }
        });
        return NextResponse.json({ data: result, message: "success" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const newPembayaran = await prisma.pembayaran.create({ data: body });
        return NextResponse.json({ data: newPembayaran, message: "success" });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
