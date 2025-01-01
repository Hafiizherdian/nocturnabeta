import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSoal } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    console.log("Request body:", body); // Debugging

    const { prompt, jenis } = body;

    if (!prompt || !jenis) {
      return NextResponse.json(
        { error: "Prompt dan jenis soal diperlukan" },
        { status: 400 }
      );
    }

    // Generate soal menggunakan Gemini API
    const generatedSoal = await generateSoal(
      jenis === "pilihan_ganda"
        ? `Buat soal pilihan ganda tentang ${prompt}`
        : `Buat soal esai singkat tentang ${prompt}`
    );

    // Simpan soal ke database
    const soal = await prisma.soal.create({
      data: {
        pertanyaan: prompt,
        jenis,
        pilihan: jenis === "pilihan_ganda" ? ["A", "B", "C", "D"] : [], // Contoh opsi
        jawaban: generatedSoal || "",
      },
    });

    return NextResponse.json({ soal });
  } catch (error) {
    console.error("Error generating soal:", error);
    console.log("Request body:", await request.json());
    return NextResponse.json(
      { error: "Terjadi kesalahan saat generate soal" },
      { status: 500 }
    );
  }
}