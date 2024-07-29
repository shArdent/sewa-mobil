import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw`
        WITH RECURSIVE Skyline AS (
          SELECT 
            id_mobil, merk, no_polisi, warna, harga_sehari, status, tahun_keluar
          FROM 
            Mobil
          WHERE 
            NOT EXISTS (
              SELECT 1
              FROM Mobil AS M2
              WHERE (M2.harga_sehari < Mobil.harga_sehari AND M2.tahun_keluar >= Mobil.tahun_keluar) OR
                    (M2.harga_sehari <= Mobil.harga_sehari AND M2.tahun_keluar > Mobil.tahun_keluar)
            )
        )
        SELECT * FROM Skyline;
      `;
    return NextResponse.json({ data: result, message: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
