import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan dengan lokasi file prisma client Anda

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    // Cari soal berdasarkan ID
    const soal = await prisma.soal.findUnique({
      where: { id: parseInt(id) },
    });

    if (!soal) {
      return NextResponse.json({ error: "Soal tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(soal, { status: 200 });
  } catch (error) {
    console.error("Error fetching soal:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data soal" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    // Parse body request
    const body = await request.json();
    const { pertanyaan, jenis, pilihan, jawaban } = body;

    // Update soal berdasarkan ID
    const updatedSoal = await prisma.soal.update({
      where: { id: parseInt(id) },
      data: { pertanyaan, jenis, pilihan, jawaban },
    });

    return NextResponse.json(updatedSoal, { status: 200 });
  } catch (error) {
    console.error("Error updating soal:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui soal" },
      { status: 500 }
    );
  }
}