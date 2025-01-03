import Link from "next/link"; // Mengimpor komponen `Link` dari Next.js untuk navigasi client-side.

// Komponen utama `DashboardPage` untuk menampilkan dashboard dengan opsi generate dan manage soal.
export default function DashboardPage() {
  return (
    <>
      {/* Container utama dengan flexbox untuk mengatur tata letak */}
      <div className="flex justify-between">
        {/* Link untuk navigasi ke halaman generate soal */}
        <Link
          href="/dashboard/generate-soal" // URL tujuan: /dashboard/generate-soal
          className="relative block rounded-tr-3xl border border-gray-100"
        >
          {/* Konten dalam card generate soal */}
          <div className="p-4 text-center">
            <strong className="text-xl font-medium text-gray-900">Generate</strong>
            <p className="mt-2 text-pretty text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos.
            </p>
            {/* Tombol untuk generate soal */}
            <span
              className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
            >
              Generate Soal
            </span>
          </div>
        </Link>

        {/* Link untuk navigasi ke halaman manage soal */}
        <Link
          href="/dashboard/manage-soal" // URL tujuan: /dashboard/manage-soal
          className="relative block rounded-tr-3xl border border-gray-100"
        >
          {/* Konten dalam card manage soal */}
          <div className="p-4 text-center">
            <strong className="text-xl font-medium text-gray-900">Manage</strong>
            <p className="mt-2 text-pretty text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in eum vitae aliquid at sed dignissimos.
            </p>
            {/* Tombol untuk manage soal */}
            <span
              className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
            >
              Manage Soal
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}