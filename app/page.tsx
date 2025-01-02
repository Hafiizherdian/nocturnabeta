import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroSection />
      <span className="flex px-8 py-8 items-center">
  <span className="text-[#292929] pr-6">Lorem, ipsum dolor</span>
  <span className="h-px flex-1 bg-black"></span>
</span>
    </div>
  );
}