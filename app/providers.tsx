"use client"; // Menandakan bahwa komponen ini adalah Client Component dalam Next.js. 
              // Ini diperlukan jika komponen menggunakan hooks atau fungsi yang hanya tersedia di sisi client.

import { SessionProvider } from "next-auth/react"; // Mengimpor SessionProvider dari next-auth/react.
                                                   // SessionProvider digunakan untuk mengelola session pengguna dalam aplikasi Next.js.

// Mendefinisikan komponen Providers yang menerima prop `children`.
// `children` adalah komponen atau elemen React yang akan dibungkus oleh SessionProvider.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider> 
      {children} {/* Membungkus `children` dengan SessionProvider agar semua komponen di dalamnya memiliki akses ke session. */}
    </SessionProvider>
  );
}