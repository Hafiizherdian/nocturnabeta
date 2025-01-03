import Sidebar from "@/components/Sidebar"; // Mengimpor komponen `Sidebar` dari direktori components.

// Komponen `DashboardLayout` untuk mengatur tata letak halaman dashboard.
export default function DashboardLayout({
  children, // Prop `children` untuk menampilkan konten utama halaman.
}: {
  children: React.ReactNode; // Tipe prop `children` adalah React.ReactNode.
}) {
  return (
    // Container utama dengan flexbox untuk mengatur tata letak sidebar dan konten.
    <div className="flex">
      {/* Menampilkan komponen Sidebar */}
      <Sidebar />

      {/* Konten utama halaman */}
      <div className="flex-1 bg-[#f0f0f0] p-4">
        {children} {/* Menampilkan konten utama yang diterima melalui prop `children` */}
      </div>
    </div>
  );
}