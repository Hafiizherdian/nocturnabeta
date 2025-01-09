"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Response status:", response.status);
      const text = await response.text();
      console.log("Response text:", text);
  
      if (response.ok) {
        router.push("/login");
      } else {
        try {
          const data = JSON.parse(text);
          alert("Registrasi gagal: " + data.error);
        } catch (error) {
          alert("Terjadi kesalahan pada server. Silakan coba lagi.");
        }
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            id="email"
            name="email"
            type="email"
            required
            className="block w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan email Anda"
          />
        </div>
      </div>

      {/* Password input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="block w-full pl-10 pr-10 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Register button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Daftar"}
      </button>

      {/* Social register */}
      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">
              Atau daftar dengan
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              className="h-4 w-4 mr-2"
              src="/api/placeholder/16/16"
              alt="Google"
            />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              className="h-4 w-4 mr-2"
              src="/api/placeholder/16/16"
              alt="Facebook"
            />
            Facebook
          </button>
        </div>
      </div>

      {/* Login link */}
      <p className="mt-4 text-center text-xs text-gray-600">
        Sudah punya akun?{" "}
        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Masuk sekarang
        </a>
      </p>
    </form>
  );
}