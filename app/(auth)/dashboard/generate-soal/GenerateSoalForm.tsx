"use client";
import { useState } from "react";

export default function GenerateSoalForm() {
  const [prompt, setPrompt] = useState("");
  const [jenis, setJenis] = useState("pilihan_ganda");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Prompt tidak boleh kosong!");
      return;
    }

    try {
      const response = await fetch("/api/generate-soal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, jenis }), // Pastikan payload berupa object
      });

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat generate soal.");
      }

      const data = await response.json();
      setResult(data.soal.jawaban);
    } catch (error) {
      console.error("Error:", error);
      console.log("Payload:", { prompt, jenis });
      alert("Terjadi kesalahan saat generate soal.");
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Masukkan prompt..."
        className="w-full p-2 border rounded text-[#292929]"
      />
      <select
        value={jenis}
        onChange={(e) => setJenis(e.target.value)}
        className="w-full p-2 border rounded text-[#292929]"
      >
        <option value="pilihan_ganda">Pilihan Ganda</option>
        <option value="esai">Esai Singkat</option>
      </select>
      <button
        onClick={handleGenerate}
        className="bg-[#62929e] text-[#f0f0f0] p-2 rounded-lg hover:bg-[#4a6f7a] transition duration-300"
      >
        Generate Soal
      </button>
      <div className="p-4 bg-white rounded text-[#292929]">{result}</div>
    </div>
  );
}