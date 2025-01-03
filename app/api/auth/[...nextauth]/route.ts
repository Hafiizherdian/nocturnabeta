import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Import konfigurasi dari lib/authOptions.ts

// Handler untuk NextAuth.js
const handler = NextAuth(authOptions);

// Export handler sebagai GET dan POST
export { handler as GET, handler as POST };