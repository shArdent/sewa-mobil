import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    const result = await prisma.pelanggan.findUnique({
      where: {
        id_pelanggan: id,
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
    const result = await prisma.pelanggan.update({
      where: {
        id_pelanggan: id
      },
      data: {
        no_ktp: body.no_ktp,
        nama_lengkap: body.nama_lengkap,
        alamat_pelanggan: body.alamat_pelanggan,
        no_telepon: body.no_telepon,
      }
    })
    return NextResponse.json({ data: result, message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(request, {params}) {
    try {
      const id = parseInt(params.id);
      const result = await prisma.pelanggan.delete({
        where: {
          id_pelanggan: id,
        },
      });
      return NextResponse.json({ data: result, message: "success" });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }