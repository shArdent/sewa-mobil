import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { json } from "@/libs/formatter";

export async function GET() {
  try {
    const result = await prisma.pengembalian.findMany({
      include: {
        transaksi: true,
      },
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
    const newPengembalian = await prisma.pengembalian.create({ data: body });
    return NextResponse.json({ data: newPengembalian, message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
