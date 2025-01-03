import GenerateSoalForm from "./GenerateSoalForm"; // Mengimpor komponen `GenerateSoalForm` dari file `GenerateSoalForm`.

// Komponen utama `GenerateSoalPage` untuk menampilkan halaman generate soal.
export default function GenerateSoalPage() {
  return (
    // Container utama dengan latar belakang abu-abu muda dan tinggi minimum sesuai layar.
    <div className="p-4 bg-[#f0f0f0] min-h-screen">
      {/* Judul halaman generate soal */}
      <h1 className="text-2xl font-bold mb-4 text-[#292929]">Generate Soal</h1>

      {/* Menampilkan komponen `GenerateSoalForm` untuk form generate soal. */}
      <GenerateSoalForm />
    </div>
  );
}