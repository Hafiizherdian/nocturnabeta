"use client"; // Menandakan bahwa komponen ini adalah Client Component dalam Next.js.
              // Diperlukan karena komponen menggunakan hooks seperti `useState`, `useEffect`, dan `useRouter`.

import { useRouter } from "next/navigation"; // Mengimpor `useRouter` dari Next.js untuk navigasi programatik.
import { useEffect, useState } from "react"; // Mengimpor `useEffect` dan `useState` dari React untuk manajemen state dan side effects.

// Komponen utama `EditSoalPage` untuk mengedit soal berdasarkan ID yang diberikan.
export default function EditSoalPage({ params }: { params: { id: string } }) {
  const router = useRouter(); // Menginisialisasi `useRouter` untuk navigasi.

  // State untuk menyimpan data soal yang akan diedit.
  const [pertanyaan, setPertanyaan] = useState(""); // State untuk pertanyaan.
  const [jenis, setJenis] = useState("pilihan_ganda"); // State untuk jenis soal (default: pilihan ganda).
  const [pilihan, setPilihan] = useState<string[]>([]); // State untuk pilihan jawaban (jika jenis soal adalah pilihan ganda).
  const [jawaban, setJawaban] = useState(""); // State untuk jawaban.

  // `useEffect` untuk mengambil data soal dari API berdasarkan ID saat komponen di-mount.
  useEffect(() => {
    fetch(`/api/soal/${params.id}`) // Mengirim request GET ke endpoint `/api/soal/{id}`.
      .then((res) => res.json()) // Mengubah response menjadi JSON.
      .then((data) => {
        // Mengisi state dengan data yang diterima dari API.
        setPertanyaan(data.pertanyaan);
        setJenis(data.jenis);
        setPilihan(data.pilihan || []); // Jika `pilihan` tidak ada, gunakan array kosong.
        setJawaban(data.jawaban);
      });
  }, [params.id]); // Dependency array dengan `params.id` memastikan efek dijalankan ulang jika ID berubah.

  // Fungsi untuk mengupdate soal.
  const handleUpdate = async () => {
    await fetch(`/api/soal/${params.id}`, {
      method: "PUT", // Menggunakan metode PUT untuk update.
      headers: { "Content-Type": "application/json" }, // Menetapkan header Content-Type.
      body: JSON.stringify({ pertanyaan, jenis, pilihan, jawaban }), // Mengirim data yang diperbarui dalam bentuk JSON.
    });
    router.push("/dashboard/manage-soal"); // Navigasi ke halaman manage soal setelah update.
  };

  // Fungsi untuk menghapus soal.
  const handleDelete = async () => {
    await fetch(`/api/soal/${params.id}`, {
      method: "DELETE", // Menggunakan metode DELETE untuk menghapus.
    });
    router.push("/dashboard/manage-soal"); // Navigasi ke halaman manage soal setelah penghapusan.
  };

  return (
    <div>
      {/* Judul halaman */}
      <h1 className="text-2xl font-bold mb-4 text-[#292929]">Edit Soal</h1>

      {/* Input untuk pertanyaan */}
      <textarea
        value={pertanyaan}
        onChange={(e) => setPertanyaan(e.target.value)} // Memperbarui state `pertanyaan` saat input berubah.
        className="w-full p-2 border rounded mb-4 text-[#292929]"
      />

      {/* Dropdown untuk memilih jenis soal */}
      <select
        value={jenis}
        onChange={(e) => setJenis(e.target.value)} // Memperbarui state `jenis` saat pilihan berubah.
        className="w-full p-2 border rounded mb-4 text-[#292929]"
      >
        <option value="pilihan_ganda">Pilihan Ganda</option>
        <option value="esai">Esai Singkat</option>
      </select>

      {/* Input untuk pilihan jawaban (jika jenis soal adalah pilihan ganda) */}
      {jenis === "pilihan_ganda" && (
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2 text-[#292929]">Pilihan Jawaban</h3>
          {pilihan.map((p, index) => (
            <input
              key={index}
              value={p}
              onChange={(e) => {
                const newPilihan = [...pilihan]; // Membuat salinan array `pilihan`.
                newPilihan[index] = e.target.value; // Memperbarui nilai pilihan yang sesuai.
                setPilihan(newPilihan); // Memperbarui state `pilihan`.
              }}
              className="w-full p-2 border rounded mb-2 text-[#292929]"
            />
          ))}
        </div>
      )}

      {/* Input untuk jawaban */}
      <textarea
        value={jawaban}
        onChange={(e) => setJawaban(e.target.value)} // Memperbarui state `jawaban` saat input berubah.
        placeholder="Jawaban"
        className="w-full p-2 border rounded mb-4 text-[#292929]"
      />

      {/* Tombol untuk mengupdate soal */}
      <button
        onClick={handleUpdate}
        className="bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300 mr-2"
      >
        Update Soal
      </button>

      {/* Tombol untuk menghapus soal */}
      <button
        onClick={handleDelete}
        className="bg-red-500 text-[#f0f0f0] p-2 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Delete Soal
      </button>
    </div>
  );
}