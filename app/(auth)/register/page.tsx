import RegisterForm from "./form"; // Mengimpor komponen `RegisterForm` dari file `form`.

// Komponen utama `RegisterPage` untuk menampilkan halaman registrasi.
export default function RegisterPage() {
  return (
    // Container utama dengan latar belakang abu-abu muda dan layout flex untuk pusatkan konten.
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
      {/* Container untuk form registrasi dengan latar belakang putih, padding, dan shadow. */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Judul halaman registrasi */}
        <h1 className="text-2xl font-bold mb-6 text-center text-[#292929]">Register</h1>

        {/* Menampilkan komponen `RegisterForm` untuk form registrasi. */}
        <RegisterForm />
      </div>
    </div>
  );
}