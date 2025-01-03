"use client"; // Menandakan bahwa komponen ini adalah Client Component dalam Next.js.
              // Ini diperlukan karena komponen menggunakan hooks seperti `useState` dan `useEffect`.

import { useEffect, useState } from "react"; // Mengimpor `useEffect` dan `useState` dari React.
                                            // `useState` digunakan untuk mengelola state, dan `useEffect` untuk menangani side effects.

import Link from "next/link"; // Mengimpor `Link` dari Next.js untuk navigasi client-side yang lebih efisien.

// Komponen utama `ManageSoalPage` untuk mengelola dan menampilkan daftar soal.
export default function ManageSoalPage() {
  const [soals, setSoals] = useState([]); // State `soals` untuk menyimpan data soal yang diambil dari API.

  // `useEffect` digunakan untuk mengambil data soal dari API saat komponen pertama kali di-render.
  useEffect(() => {
    fetch("/api/soal") // Mengirim request GET ke endpoint `/api/soal`.
      .then((res) => res.json()) // Mengubah response menjadi JSON.
      .then((data) => setSoals(data)); // Menyimpan data soal ke state `soals`.
  }, []); // Dependency array kosong berarti efek ini hanya dijalankan sekali saat komponen di-mount.

  return (
    <div className="p-4 bg-[#f0f0f0] min-h-screen">
      {/* Judul halaman */}
      <h1 className="text-2xl font-bold mb-4 text-[#292929]">Manage Soal</h1>

      {/* Daftar soal */}
      <ul className="space-y-2">
        {soals.map((soal: any) => ( // Looping melalui setiap soal dalam state `soals`.
          <li key={soal.id} className="p-2 bg-white rounded">
            {/* Link untuk navigasi ke halaman detail soal */}
            <Link
              href={`/manage-soal/${soal.id}`} // URL dinamis berdasarkan ID soal.
              className="text-[#62929e] hover:underline"
            >
              {soal.pertanyaan} {/* Menampilkan pertanyaan dari soal. */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}