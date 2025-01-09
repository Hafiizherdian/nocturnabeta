"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, List, Search, Loader2 } from "lucide-react";

// Definisikan tipe data Soal
type Soal = {
  id: number;
  pertanyaan: string;
  jenis: string;
  pilihan: string[];
  jawaban: string;
  createdAt: string;
  updatedAt: string;
};

export default function ManageSoalPage() {
  const [soals, setSoals] = useState<Soal[]>([]); // State untuk menyimpan daftar soal
  const [isLoading, setIsLoading] = useState(true); // State untuk menangani loading state
  const [error, setError] = useState<string | null>(null); // State untuk menangani error
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian

  // Fetch data soal dari API saat komponen pertama kali di-render
  useEffect(() => {
    fetch("/api/soal")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data soal");
        }
        return res.json();
      })
      .then((data) => {
        setSoals(data); // Set data soal ke state
        setIsLoading(false); // Matikan loading state
      })
      .catch((error) => {
        console.error("Error fetching soal:", error);
        setError("Gagal memuat data soal. Silakan coba lagi."); // Set pesan error
        setIsLoading(false); // Matikan loading state
      });
  }, []);

  // Filter soal berdasarkan query pencarian
  const filteredSoals = soals.filter((soal) =>
    soal.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bank Soal</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
              Kelola semua soal dalam satu tempat
            </p>
          </div>
          {/* Tombol Tambah Soal */}
          <Link
            href="/generate-soal"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tambah Soal
          </Link>
        </div>

        {/* Tampilkan pesan error jika ada */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Card untuk daftar soal */}
        <div className="bg-white rounded-lg shadow">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari soal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="space-y-4 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 bg-white rounded-lg shadow animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            // Daftar Soal
            <ul className="divide-y divide-gray-200">
              {filteredSoals.map((soal) => (
                <li key={soal.id} className="hover:bg-gray-50 transition duration-150">
                  {/* Link ke halaman edit soal */}
                  <Link href={`/dashboard/manage-soal/${soal.id}`} className="block p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <List className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-gray-900 font-medium line-clamp-2">
                            {soal.pertanyaan}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Jenis: {soal.jenis === "pilihan_ganda" ? "Pilihan Ganda" : "Esai Singkat"}
                          </p>
                        </div>
                      </div>
                      <span className="text-blue-600 text-sm">Edit</span>
                    </div>
                  </Link>
                </li>
              ))}
              {/* Tampilkan pesan jika tidak ada soal */}
              {filteredSoals.length === 0 && !isLoading && (
                <li className="py-8">
                  <div className="text-center text-gray-500">
                    <p>Tidak ada soal ditemukan</p>
                  </div>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}