import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    const result = await prisma.mobil.findUnique({
      where: {
        id_mobil: id,
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
    const id = parseInt(params.id)
    const body = await request.json()
    const result = await prisma.mobil.update({
      where: {
        id_mobil: id
      },
      data: {
        merk: body.merk,
        no_polisi: body.no_polisi,
        warna: body.warna,
        tahun_keluar: body.tahun_keluar,
        harga_sehari: body.harga_sehari
      }
    })

    return NextResponse.json({ data: result, message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const result = await prisma.mobil.delete({
      where: {
        id_mobil: id,
      },
    });
    console.log(id);
    console.log(result);
    return NextResponse.json({ data: result, message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
