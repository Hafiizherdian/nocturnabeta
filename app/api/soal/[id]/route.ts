import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Props = {
  params: { id: string }
}

export async function GET(request: Request, { params }: Props) {
  try {
    const soal = await prisma.soal.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!soal) {
      return NextResponse.json({ error: "Soal tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(soal);
  } catch (error) {
    console.error("Error fetching soal:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data soal" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Props) {
  try {
    const body = await request.json();
    const { pertanyaan, jenis, pilihan, jawaban } = body;

    const updatedSoal = await prisma.soal.update({
      where: { id: parseInt(params.id) },
      data: { pertanyaan, jenis, pilihan, jawaban },
    });

    return NextResponse.json(updatedSoal);
  } catch (error) {
    console.error("Error updating soal:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan perubahan soal" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    await prisma.soal.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Soal berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting soal:", error);
    return NextResponse.json(
      { error: "Gagal menghapus soal" },
      { status: 500 }
    );
  }
}