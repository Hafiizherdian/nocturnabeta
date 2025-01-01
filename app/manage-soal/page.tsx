"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManageSoalPage() {
  const [soals, setSoals] = useState([]);

  useEffect(() => {
    fetch("/api/soal")
      .then((res) => res.json())
      .then((data) => setSoals(data));
  }, []);

  return (
    <div className="p-4 bg-[#f0f0f0] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[#292929]">Manage Soal</h1>
      <ul className="space-y-2">
        {soals.map((soal: any) => (
          <li key={soal.id} className="p-2 bg-white rounded">
            <Link
              href={`/manage-soal/${soal.id}`}
              className="text-[#62929e] hover:underline"
            >
              {soal.pertanyaan}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}