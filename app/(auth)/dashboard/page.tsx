import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-4 bg-[#f0f0f0] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#292929]">Dashboard</h1>
      <div className="space-y-4">
        <Link
          href="/dashboard/generate-soal"
          className="block bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg text-center hover:bg-[#4a6f7a] transition duration-300"
        >
          Generate Soal
        </Link>
        <Link
          href="/manage-soal"
          className="block bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg text-center hover:bg-[#4a6f7a] transition duration-300"
        >
          Manage Soal
        </Link>
      </div>
    </div>
  );
}