import { hash, compare } from "bcryptjs"; // Mengimpor fungsi `hash` dan `compare` dari bcryptjs untuk enkripsi dan verifikasi password.

// Fungsi untuk menghash password.
export async function hashPassword(password: string): Promise<string> {
  // Menggunakan fungsi `hash` dari bcryptjs untuk mengenkripsi password.
  // Parameter pertama adalah password yang akan di-hash.
  // Parameter kedua adalah salt round (12 dalam kasus ini), yang menentukan kompleksitas hashing.
  return await hash(password, 12);
}

// Fungsi untuk membandingkan password dengan hash yang tersimpan.
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // Menggunakan fungsi `compare` dari bcryptjs untuk membandingkan password dengan hash.
  // Parameter pertama adalah password yang dimasukkan oleh pengguna.
  // Parameter kedua adalah hash yang tersimpan di database.
  // Fungsi ini mengembalikan `true` jika password cocok, dan `false` jika tidak.
  return await compare(password, hashedPassword);
}