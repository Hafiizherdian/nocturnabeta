"use client"; // Menandakan bahwa komponen ini adalah Client Component dalam Next.js.
              // Diperlukan karena komponen menggunakan hooks dan fungsi yang hanya tersedia di sisi client.

import { signIn } from "next-auth/react"; // Mengimpor fungsi `signIn` dari NextAuth untuk proses login.
import { useRouter } from "next/navigation"; // Mengimpor `useRouter` dari Next.js untuk navigasi programatik.

// Komponen `LoginForm` untuk menangani form login.
export default function LoginForm() {
  const router = useRouter(); // Menginisialisasi `useRouter` untuk navigasi.

  // Fungsi untuk menangani submit form.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah perilaku default form (reload halaman).

    // Mengambil data dari form menggunakan `FormData`.
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string; // Mengambil nilai input email.
    const password = formData.get("password") as string; // Mengambil nilai input password.

    // Melakukan proses login menggunakan NextAuth dengan provider "credentials".
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Menonaktifkan redirect otomatis untuk menangani hasil login secara manual.
    });

    console.log("Login result:", result); // Debugging: Mencatat hasil login ke console.

    // Jika login gagal, tampilkan pesan error.
    if (result?.error) {
      alert("Login gagal: " + result.error); // Menampilkan alert dengan pesan error.
    } else {
      // Jika login berhasil, redirect ke halaman dashboard.
      router.push("/dashboard");
    }
  };

  return (
    // Form login dengan event handler `onSubmit`.
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

      {/* Tombol submit untuk login */}
      <button
        type="submit"
        className="w-full bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300"
      >
        Login
      </button>
    </form>
  );
}