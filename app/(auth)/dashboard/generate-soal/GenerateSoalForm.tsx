"use client"; // Menandakan bahwa komponen ini adalah Client Component dalam Next.js.
              // Diperlukan karena komponen menggunakan hooks seperti `useState`.

import { useState } from "react"; // Mengimpor `useState` dari React untuk manajemen state.

// Komponen `GenerateSoalForm` untuk menampilkan form generate soal.
export default function GenerateSoalForm() {
  // State untuk menyimpan nilai input dan hasil generate soal.
  const [prompt, setPrompt] = useState(""); // State untuk menyimpan prompt.
  const [jenis, setJenis] = useState("pilihan_ganda"); // State untuk menyimpan jenis soal (default: pilihan ganda).
  const [result, setResult] = useState(""); // State untuk menyimpan hasil generate soal.

  // Fungsi untuk menangani proses generate soal.
  const handleGenerate = async () => {
    // Validasi: Pastikan prompt tidak kosong.
    if (!prompt.trim()) {
      alert("Prompt tidak boleh kosong!"); // Menampilkan alert jika prompt kosong.
      return;
    }

    try {
      // Mengirim request ke endpoint `/api/generate-soal` untuk generate soal.
      const response = await fetch("/api/generate-soal", {
        method: "POST", // Menggunakan metode POST.
        headers: { "Content-Type": "application/json" }, // Menetapkan header Content-Type.
        body: JSON.stringify({ prompt, jenis }), // Mengirim data prompt dan jenis soal dalam bentuk JSON.
      });

      // Jika response tidak OK, lempar error.
      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat generate soal.");
      }

      // Mengambil data hasil generate soal dari response.
      const data = await response.json();
      setResult(data.soal.jawaban); // Menyimpan hasil generate soal ke state `result`.
    } catch (error) {
      // Menangani error yang terjadi selama proses generate soal.
      console.error("Error:", error); // Mencatat error ke console.
      console.log("Payload:", { prompt, jenis }); // Debugging: Mencatat payload ke console.
      alert("Terjadi kesalahan saat generate soal."); // Menampilkan alert dengan pesan error.
    }
  };

  return (
    // Container untuk form generate soal.
    <div className="space-y-4">
      {/* Input untuk prompt */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} // Memperbarui state `prompt` saat input berubah.
        placeholder="Masukkan prompt..."
        className="w-full p-2 border rounded text-[#292929]"
      />

      {/* Dropdown untuk memilih jenis soal */}
      <select
        value={jenis}
        onChange={(e) => setJenis(e.target.value)} // Memperbarui state `jenis` saat pilihan berubah.
        className="w-full p-2 border rounded text-[#292929]"
      >
        <option value="pilihan_ganda">Pilihan Ganda</option>
        <option value="esai">Esai Singkat</option>
      </select>

      {/* Tombol untuk generate soal */}
      <button
        onClick={handleGenerate} // Memanggil fungsi `handleGenerate` saat tombol diklik.
        className="bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300"
      >
        Generate Soal
      </button>

      {/* Menampilkan hasil generate soal */}
      <div className="p-4 bg-white rounded text-[#292929]">{result}</div>
    </div>
  );
}