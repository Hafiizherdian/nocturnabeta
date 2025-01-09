"use client"

import Sidebar from "@/components/Sidebar"; // Mengimpor komponen `Sidebar` dari direktori components.
import { useState } from "react"; // Mengimpor `useState` untuk mengelola state sidebar di mobile.

// Komponen `DashboardLayout` untuk mengatur tata letak halaman dashboard.
export default function DashboardLayout({
  children, // Prop `children` untuk menampilkan konten utama halaman.
}: {
  children: React.ReactNode; // Tipe prop `children` adalah React.ReactNode.
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk mengontrol tampilan sidebar di mobile.

  // Fungsi untuk menutup sidebar di mobile
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    // Container utama dengan flexbox untuk mengatur tata letak sidebar dan konten.
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={closeSidebar} /> {/* Menambahkan prop `onClose` */}
      </div>

      {/* Overlay untuk mobile (hanya muncul saat sidebar terbuka) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidebar} // Menutup sidebar saat overlay diklik
        ></div>
      )}

      {/* Konten utama halaman */}
      <div className="flex-1 bg-[#f0f0f0] p-4 lg:ml-64">
        {/* Toggle Button untuk Sidebar di Mobile */}
        <button
          className="mb-4 rounded-lg bg-indigo-600 p-2 text-white lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Menampilkan konten utama yang diterima melalui prop `children` */}
        {children}
      </div>
    </div>
  );
}