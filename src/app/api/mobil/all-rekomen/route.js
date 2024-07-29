import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const result = await prisma.$queryRaw`
    WITH RECURSIVE Skyline AS (
  SELECT 
    id_mobil, merk, no_polisi, warna, harga_sehari, status, tahun_keluar
  FROM 
    Mobil
  WHERE 
    status = 'Tersedia' AND
    NOT EXISTS (
      SELECT 1
      FROM Mobil AS M2
      WHERE 
        (M2.harga_sehari < Mobil.harga_sehari AND M2.tahun_keluar >= Mobil.tahun_keluar AND M2.status = 'tersedia') OR
        (M2.harga_sehari <= Mobil.harga_sehari AND M2.tahun_keluar > Mobil.tahun_keluar AND M2.status = 'tersedia')
    )
)

SELECT * FROM Skyline
ORDER BY harga_sehari ASC;
    `;

  return NextResponse.json({ data: result, message: "success" });
}
