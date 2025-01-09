import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Handler untuk GET request (mengambil semua soal)
export async function GET() {
  try {
    // Ambil semua soal dari database menggunakan Prisma
    const soals = await prisma.soal.findMany();

    // Kembalikan data soal sebagai respons JSON
    return NextResponse.json(soals);
  } catch (error) {
    // Tangani error jika terjadi kesalahan
    console.error("Error fetching soal:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data soal" },
      { status: 500 }
    );
  }
}

// Handler untuk POST request (membuat soal baru)
export async function POST(request: Request) {
  try {
    // Parse body request menjadi JSON
    const body = await request.json();
    const { pertanyaan, jenis, pilihan, jawaban } = body;

    // Validasi data yang diterima
    if (!pertanyaan || !jenis || !jawaban) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Buat soal baru di database menggunakan Prisma
    const soal = await prisma.soal.create({
      data: {
        pertanyaan,
        jenis,
        pilihan: jenis === "pilihan_ganda" ? pilihan : [], // Jika jenis bukan pilihan_ganda, pilihan diisi array kosong
        jawaban,
      },
    });

    // Kembalikan data soal yang baru dibuat sebagai respons JSON
    return NextResponse.json(soal, { status: 201 });
  } catch (error) {
    // Tangani error jika terjadi kesalahan
    console.error("Error creating soal:", error);
    return NextResponse.json(
      { error: "Gagal membuat soal" },
      { status: 500 }
    );
  }
}