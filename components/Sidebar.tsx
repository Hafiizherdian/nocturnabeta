import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-[#62929e] text-[#f0f0f0] w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/dashboard/generate-soal"
            className="block p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300"
          >
            Generate Soal
          </Link>
        </li>
        <li>
          <Link
            href="/manage-soal"
            className="block p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300"
          >
            Manage Soal
          </Link>
        </li>
      </ul>
    </div>
  );
}