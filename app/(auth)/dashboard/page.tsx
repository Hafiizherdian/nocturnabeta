import Link from "next/link"; // Mengimpor komponen `Link` dari Next.js untuk navigasi client-side.
import { FilePlus, FileEdit } from "lucide-react"; // Mengimpor ikon dari Lucide React

// Komponen utama `DashboardPage` untuk menampilkan dashboard dengan opsi generate dan manage soal.
export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Judul Halaman */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Dashboard Soal
        </h1>

        {/* Container untuk Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card untuk Generate Soal */}
          <Link
            href="/dashboard/generate-soal"
            className="group relative block rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 md:p-8 text-center">
              {/* Ikon */}
              <div className="flex justify-center">
                <FilePlus className="w-12 h-12 md:w-16 md:h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />
              </div>
              {/* Judul Card */}
              <strong className="mt-4 md:mt-6 text-xl md:text-2xl font-semibold text-gray-900 block">
                Generate Soal
              </strong>
              {/* Deskripsi */}
              <p className="mt-2 md:mt-4 text-sm md:text-base text-gray-600">
                Buat soal baru dengan mudah menggunakan fitur generate soal. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              {/* Tombol */}
              <span className="mt-4 md:mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-2 md:px-8 md:py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors duration-300">
                Generate Soal
              </span>
            </div>
          </Link>

          {/* Card untuk Manage Soal */}
          <Link
            href="/dashboard/manage-soal"
            className="group relative block rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 md:p-8 text-center">
              {/* Ikon */}
              <div className="flex justify-center">
                <FileEdit className="w-12 h-12 md:w-16 md:h-16 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300" />
              </div>
              {/* Judul Card */}
              <strong className="mt-4 md:mt-6 text-xl md:text-2xl font-semibold text-gray-900 block">
                Manage Soal
              </strong>
              {/* Deskripsi */}
              <p className="mt-2 md:mt-4 text-sm md:text-base text-gray-600">
                Kelola soal yang sudah dibuat dengan fitur manage soal. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              {/* Tombol */}
              <span className="mt-4 md:mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-2 md:px-8 md:py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors duration-300">
                Manage Soal
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}