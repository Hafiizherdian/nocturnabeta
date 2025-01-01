import { hash, compare } from "bcryptjs";

// Fungsi untuk menghash password
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

// Fungsi untuk membandingkan password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}