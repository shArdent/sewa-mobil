import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request) {
    try {
        const dataTransaksi = await prisma.transaksi.findMany({
            include: {
                mobil: true
            }
        });
        return NextResponse.json({ data: dataTransaksi, message: "success" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const formData = await request.json();
        const newTransaksi = await prisma.transaksi.create({ data: formData });
        return NextResponse.json({ data: newTransaksi, message: "success" });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
      const { id } = request.nextURL.searchParams.get("id");
      const result = await prisma.transaksi.delete({
        where: {
          id_transaksi: Number(id),
        },
      });
      return NextResponse.json({ data: result, message: "success" });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }