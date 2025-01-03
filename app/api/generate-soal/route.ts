import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSoal } from "@/lib/gemini";

export async function POST(request: Request) {
  let body;

  try {
    body = await request.json();
    console.log("Request body:", body);

    // Validasi: Pastikan body ada dan berisi data yang diperlukan
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { prompt, jenis } = body;

    if (!prompt || !jenis) {
      return NextResponse.json(
        { error: "Prompt dan jenis soal diperlukan" },
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

    if (!generatedSoal) {
      return NextResponse.json(
        { error: "Gagal menghasilkan soal" },
        { status: 500 }
      );
    }

    console.log("Generated soal:", generatedSoal);

    // Data untuk disimpan ke Prisma
    const soalData = {
      pertanyaan: prompt,
      jenis,
      pilihan: jenis === "pilihan_ganda" ? ["A", "B", "C", "D"] : [],
      jawaban: generatedSoal || "",
    };

    console.log("Data to be saved in Prisma:", soalData);

    // Validasi data
    if (!soalData.pertanyaan || !soalData.jenis || !soalData.jawaban) {
      return NextResponse.json(
        { error: "Data soal tidak valid" },
        { status: 400 }
      );
    }

    // Simpan ke database
    const soal = await prisma.soal.create({
      data: soalData,
    });

    return NextResponse.json({ soal });
  } catch (error) {
    console.error("Error in route:", String(error)); // Gunakan String(error) untuk memastikan error tercetak

    if (body) {
      console.log("Request body:", body);
    } else {
      console.log("Request body is null or undefined");
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan saat generate soal" },
      { status: 500 }
    );
  }
}