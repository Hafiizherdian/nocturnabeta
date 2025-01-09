import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSoal } from "@/lib/gemini";

export async function POST(request: Request) {
  let body;

  try {
    body = await request.json();
    console.log(`[${new Date().toISOString()}] Request body:`, body);

    // Validasi: Pastikan body ada dan berisi data yang diperlukan
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { prompt, jenis } = body;

    // Validasi: Pastikan prompt dan jenis ada
    if (!prompt || !jenis) {
      return NextResponse.json(
        { error: "Prompt dan jenis soal diperlukan" },
        { status: 400 }
      );
    }

    // Validasi: Pastikan jenis soal valid
    if (!["pilihan_ganda", "esai"].includes(jenis)) {
      return NextResponse.json(
        { error: "Jenis soal harus berupa 'pilihan_ganda' atau 'esai'" },
        { status: 400 }
      );
    }

    console.log("Prompt:", prompt);
    console.log("Jenis soal:", jenis);

    // Generate soal
    const generatedSoal = await generateSoal(
      jenis === "pilihan_ganda"
        ? `Buat soal pilihan ganda tentang ${prompt}`
        : `Buat soal esai singkat tentang ${prompt}`
    );

    // Validasi: Pastikan hasil generate valid
    if (!generatedSoal || typeof generatedSoal !== "string") {
      console.error("Generated soal is invalid:", generatedSoal);
      return NextResponse.json(
        { error: "Hasil generate soal tidak valid" },
        { status: 500 }
      );
    }

    console.log("Generated soal:", generatedSoal);

// Data untuk disimpan ke Prisma
const soalData = {
  pertanyaan: prompt,
  jenis,
  pilihan: jenis === "pilihan_ganda" ? ["A", "B", "C", "D"] : [],
  jawaban: generatedSoal, // Simpan sebagai string biasa
};

console.log("Data to be saved in Prisma:", soalData);

    // Validasi data
    if (!soalData || typeof soalData !== "object") {
      console.error("Invalid soalData:", soalData);
      return NextResponse.json(
        { error: "Data soal tidak valid" },
        { status: 400 }
      );
    }

    // Simpan ke database
    try {
      const soal = await prisma.soal.create({
        data: soalData,
      });
      console.log("Soal saved successfully:", soal);
      return NextResponse.json({ soal });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Gagal menyimpan soal ke database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in route:", error);

    let errorMessage = "Terjadi kesalahan saat generate soal";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}