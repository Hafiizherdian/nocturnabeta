import { z } from "zod"; // Mengimpor library Zod untuk validasi schema.

// Skema validasi untuk form soal
export const SoalSchema = z.object({
  pertanyaan: z.string().min(1, "Pertanyaan tidak boleh kosong"), // Validasi: Pertanyaan harus berupa string dan tidak boleh kosong.
  jenis: z.enum(["pilihan_ganda", "esai"]), // Validasi: Jenis soal harus berupa "pilihan_ganda" atau "esai".
  pilihan: z.array(z.string().min(1, "Pilihan tidak boleh kosong")).optional(), // Validasi: Pilihan harus berupa array string (opsional) dan tidak boleh kosong.
  jawaban: z.string().min(1, "Jawaban tidak boleh kosong"), // Validasi: Jawaban harus berupa string dan tidak boleh kosong.
});

// Skema validasi untuk form login/register
export const AuthSchema = z.object({
  email: z.string().email("Email tidak valid"), // Validasi: Email harus berupa string dan format email yang valid.
  password: z.string().min(6, "Password minimal 6 karakter"), // Validasi: Password harus berupa string dan minimal 6 karakter.
});

// Type untuk form soal
export type SoalFormValues = z.infer<typeof SoalSchema>; // Menggunakan `z.infer` untuk menghasilkan tipe TypeScript dari `SoalSchema`.

// Type untuk form login/register
export type AuthFormValues = z.infer<typeof AuthSchema>; // Menggunakan `z.infer` untuk menghasilkan tipe TypeScript dari `AuthSchema`.