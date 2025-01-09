-- Langkah 1: Buat kolom baru dengan tipe JSON dan nilai default
ALTER TABLE "Soal" ADD COLUMN "jawaban_new" JSON NOT NULL DEFAULT '{}';

-- Langkah 2: Salin data dari kolom lama ke kolom baru
-- Pastikan data di kolom lama bisa di-convert ke JSON
UPDATE "Soal" SET "jawaban_new" = "jawaban"::json;

-- Langkah 3: Hapus kolom lama
ALTER TABLE "Soal" DROP COLUMN "jawaban";

-- Langkah 4: Ganti nama kolom baru menjadi "jawaban"
ALTER TABLE "Soal" RENAME COLUMN "jawaban_new" TO "jawaban";