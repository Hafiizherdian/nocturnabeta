import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4">
          <span className="text-gray-800 font-medium whitespace-nowrap">Lorem, ipsum dolor</span>
          <span className="h-px flex-1 bg-gray-300"></span>
        </div>
      </div>
    </div>
  );
}