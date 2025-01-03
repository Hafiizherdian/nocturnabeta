import { NextResponse } from "next/server"; // Mengimpor `NextResponse` dari Next.js untuk membuat response HTTP.
import prisma from "@/lib/prisma"; // Mengimpor instance Prisma untuk berinteraksi dengan database.
import { hash } from "bcryptjs"; // Mengimpor fungsi `hash` dari bcryptjs untuk mengenkripsi password.

// Fungsi POST untuk menangani registrasi pengguna baru.
export async function POST(request: Request) {
  try {
    // Mengambil data email dan password dari body request.
    const { email, password } = await request.json();

    // Mengecek apakah email sudah terdaftar di database.
    const existingUser = await prisma.user.findUnique({
      where: { email }, // Mencari user berdasarkan email.
    });

    // Jika email sudah terdaftar, kembalikan response error.
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" }, // Pesan error.
        { status: 400 } // Status HTTP 400 (Bad Request).
      );
    }

    // Mengenkripsi password menggunakan bcryptjs dengan salt round 12.
    const hashedPassword = await hash(password, 12);

    // Membuat user baru di database.
    const user = await prisma.user.create({
      data: {
        email, // Email pengguna.
        password: hashedPassword, // Password yang sudah di-hash.
      },
    });

    // Mengembalikan data user yang baru dibuat dalam bentuk JSON.
    return NextResponse.json({ user });
  } catch (error) {
    // Menangani error yang terjadi selama proses registrasi.
    console.error("Error during registration:", error); // Mencatat error ke console.

    // Mengembalikan response error dengan status 500 (Internal Server Error).
    return NextResponse.json(
      { error: "Terjadi kesalahan saat registrasi" }, // Pesan error.
      { status: 500 }
    );
  }
}