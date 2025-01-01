"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditSoalPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [pertanyaan, setPertanyaan] = useState("");
  const [jenis, setJenis] = useState("pilihan_ganda");
  const [pilihan, setPilihan] = useState<string[]>([]);
  const [jawaban, setJawaban] = useState("");

  useEffect(() => {
    fetch(`/api/soal/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPertanyaan(data.pertanyaan);
        setJenis(data.jenis);
        setPilihan(data.pilihan || []);
        setJawaban(data.jawaban);
      });
  }, [params.id]);

  const handleUpdate = async () => {
    await fetch(`/api/soal/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pertanyaan, jenis, pilihan, jawaban }),
    });
    router.push("/dashboard/manage-soal");
  };

  const handleDelete = async () => {
    await fetch(`/api/soal/${params.id}`, {
      method: "DELETE",
    });
    router.push("/dashboard/manage-soal");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[#292929]">Edit Soal</h1>
      <textarea
        value={pertanyaan}
        onChange={(e) => setPertanyaan(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-[#292929]"
      />
      <select
        value={jenis}
        onChange={(e) => setJenis(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-[#292929]"
      >
        <option value="pilihan_ganda">Pilihan Ganda</option>
        <option value="esai">Esai Singkat</option>
      </select>
      {jenis === "pilihan_ganda" && (
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2 text-[#292929]">Pilihan Jawaban</h3>
          {pilihan.map((p, index) => (
            <input
              key={index}
              value={p}
              onChange={(e) => {
                const newPilihan = [...pilihan];
                newPilihan[index] = e.target.value;
                setPilihan(newPilihan);
              }}
              className="w-full p-2 border rounded mb-2 text-[#292929]"
            />
          ))}
        </div>
      )}
      <textarea
        value={jawaban}
        onChange={(e) => setJawaban(e.target.value)}
        placeholder="Jawaban"
        className="w-full p-2 border rounded mb-4 text-[#292929]"
      />
      <button
        onClick={handleUpdate}
        className="bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300 mr-2"
      >
        Update Soal
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-[#f0f0f0] p-2 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Delete Soal
      </button>
    </div>
  );
}