import RegisterForm from "./form"; // Mengimpor komponen `RegisterForm` dari file `form`.

// Komponen utama `RegisterPage` untuk menampilkan halaman registrasi.
export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="p-6">
            {/* Compact header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-3">
                <span className="text-white text-lg font-bold">A</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                Buat Akun Baru
              </h1>
              <p className="text-sm text-gray-600">
                Daftar untuk memulai
              </p>
            </div>

            <RegisterForm />

            {/* Compact footer */}
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>
                Butuh bantuan?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Hubungi support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}