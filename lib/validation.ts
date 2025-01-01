import { z } from "zod";

// Skema validasi untuk form soal
export const SoalSchema = z.object({
  pertanyaan: z.string().min(1, "Pertanyaan tidak boleh kosong"),
  jenis: z.enum(["pilihan_ganda", "esai"]),
  pilihan: z.array(z.string().min(1, "Pilihan tidak boleh kosong")).optional(),
  jawaban: z.string().min(1, "Jawaban tidak boleh kosong"),
});

// Skema validasi untuk form login/register
export const AuthSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

// Type untuk form soal
export type SoalFormValues = z.infer<typeof SoalSchema>;

// Type untuk form login/register
export type AuthFormValues = z.infer<typeof AuthSchema>;