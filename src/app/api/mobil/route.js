import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request) {
  try {
    const formData = await request.json();
    const newMobil = await prisma.mobil.create({ data: formData });
    return NextResponse.json({ data: newMobil, message: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await prisma.mobil.findMany();
    return NextResponse.json({ data: result, message: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}


