import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // Access params.id after it's available

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const soal = await prisma.soal.findUnique({
      where: { id: parseInt(id) },
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // Access params.id after it's available

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await request.json();
    const { pertanyaan, jenis, pilihan, jawaban } = body;

    const updatedSoal = await prisma.soal.update({
      where: { id: parseInt(id) },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; // Access params.id after it's available

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    await prisma.soal.delete({
      where: { id: parseInt(id) },
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