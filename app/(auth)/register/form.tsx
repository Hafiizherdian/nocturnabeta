"use client"; // Menandakan bahwa komponen ini adalah Client Component dalam Next.js.
              // Diperlukan karena komponen menggunakan hooks seperti `useRouter`.

import { useRouter } from "next/navigation"; // Mengimpor `useRouter` dari Next.js untuk navigasi programatik.

// Komponen `RegisterForm` untuk menangani form registrasi.
export default function RegisterForm() {
  const router = useRouter(); // Menginisialisasi `useRouter` untuk navigasi.

  // Fungsi untuk menangani submit form.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah perilaku default form (reload halaman).

    // Mengambil data dari form menggunakan `FormData`.
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string; // Mengambil nilai input email.
    const password = formData.get("password") as string; // Mengambil nilai input password.

    // Mengirim data registrasi ke endpoint `/api/register`.
    const response = await fetch("/api/register", {
      method: "POST", // Menggunakan metode POST.
      headers: { "Content-Type": "application/json" }, // Menetapkan header Content-Type.
      body: JSON.stringify({ email, password }), // Mengirim data dalam bentuk JSON.
    });

    // Jika registrasi berhasil, redirect ke halaman login.
    if (response.ok) {
      router.push("/login"); // Navigasi ke halaman login.
    } else {
      // Jika registrasi gagal, tampilkan pesan error.
      const data = await response.json();
      alert("Registrasi gagal: " + data.error); // Menampilkan alert dengan pesan error.
    }
  };

  return (
    // Form registrasi dengan event handler `onSubmit`.
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Input untuk email */}
      <div>
        <label className="block text-sm font-medium mb-1 text-[#292929]">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded text-[#292929]"
        />
      </div>

      {/* Input untuk password */}
      <div>
        <label className="block text-sm font-medium mb-1 text-[#292929]">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded text-[#292929]"
        />
      </div>

      {/* Tombol submit untuk registrasi */}
      <button
        type="submit"
        className="w-full bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300"
      >
        Register
      </button>
    </form>
  );
}