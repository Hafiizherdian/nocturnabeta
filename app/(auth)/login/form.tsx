"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Login result:", result); // Debugging

    if (result?.error) {
      alert("Login gagal: " + result.error);
    } else {
      router.push("/dashboard"); // Redirect ke dashboard setelah login berhasil
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <button
        type="submit"
        className="w-full bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300"
      >
        Login
      </button>
    </form>
  );
}