import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    const result = await prisma.pembayaran.findUnique({
      where: {
        id_pembayaran: id,
      },
    });

    return NextResponse.json({ data: result, message: "success" });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Internal Server Error",
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const result = await prisma.pembayaran.update({
      where: {
        id_pembayaran: id,
      },
      include: {
        transaksi: true,
      },
      data: {
        jenis_pembayaran: body.jenis_pembayaran,
        no_rek: body.no_rek,
        tgl_pembayaran: body.tgl_pembayaran,
      },
    });
    return NextResponse.json({ data: result, message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const result = await prisma.pembayaran.delete({
      where: {
        id_pembayaran: id,
      },
    });
    return NextResponse.json({ data: result, message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
