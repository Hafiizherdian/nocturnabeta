import LoginForm from "./form"; // Mengimpor komponen `LoginForm` dari file `form`.

// Komponen utama `LoginPage` untuk menampilkan halaman login.
export default function LoginPage() {
  return (
    // Container utama dengan latar belakang abu-abu muda dan layout flex untuk pusatkan konten.
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
      {/* Container untuk form login dengan latar belakang putih, padding, dan shadow. */}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Judul halaman login */}
        <h1 className="text-2xl font-bold mb-6 text-center text-[#292929]">Login</h1>

        {/* Menampilkan komponen `LoginForm` untuk form login. */}
        <LoginForm />
      </div>
    </div>
  );
}