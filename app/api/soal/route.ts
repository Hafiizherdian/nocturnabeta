import { NextResponse } from "next/server"; // Mengimpor `NextResponse` dari Next.js untuk membuat response HTTP.
import prisma from "@/lib/prisma"; // Mengimpor instance Prisma untuk berinteraksi dengan database.

// Fungsi GET untuk mengambil semua data soal dari database.
export async function GET() {
  // Menggunakan Prisma untuk mengambil semua data soal dari tabel `soal`.
  const soals = await prisma.soal.findMany();

  // Mengembalikan data soal dalam bentuk JSON menggunakan `NextResponse`.
  return NextResponse.json(soals);
}