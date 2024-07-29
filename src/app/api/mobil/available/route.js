import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const result = await prisma.mobil.findMany({where : {status : "Tersedia"}});
    return NextResponse.json({ data: result, message: "success" });
}