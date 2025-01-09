"use client";

import { useState } from "react";
import { FileText, BookOpen, Loader2, Send, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";

export default function GenerateSoalForm() {
  const [prompt, setPrompt] = useState("");
  const [jenis, setJenis] = useState("pilihan_ganda");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Prompt tidak boleh kosong!");
      return;
    }

    if (prompt.trim().length < 10) {
      setError("Prompt harus memiliki setidaknya 10 karakter.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null); // Reset hasil sebelum generate baru

    try {
      const response = await fetch("/api/generate-soal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, jenis }),
      });

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat generate soal.");
      }

      const data = await response.json();
      setResult(data.soal); // Set result to the entire soal object
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan saat generate soal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setResult(null);
    setError("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Generator Soal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Prompt */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Prompt Soal
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Masukkan deskripsi soal yang ingin di-generate..."
            maxLength={500}
            className="w-full min-h-[120px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-gray-800 placeholder-gray-400 bg-gray-50"
          />
        </div>

        {/* Jenis Soal */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">
            Jenis Soal
          </label>
          <div className="relative">
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="w-full p-3 border rounded-lg appearance-none bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 text-gray-800"
            >
              <option value="pilihan_ganda">Pilihan Ganda</option>
              <option value="esai">Esai Singkat</option>
            </select>
            <FileText className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Tombol Generate */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sedang memproses...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Generate Soal
            </>
          )}
        </button>

        {/* Tombol Reset */}
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Reset
        </button>

        {/* Tampilkan Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Tampilkan Hasil Generate */}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-medium text-gray-800 mb-2">Hasil Generate:</h3>
            <div className="text-gray-600 whitespace-pre-wrap">
              <p><strong>Pertanyaan:</strong> {result.pertanyaan}</p>
              {result.jenis === "pilihan_ganda" && (
                <>
                  <p><strong>Pilihan:</strong></p>
                  <ul className="list-disc list-inside">
                    {result.pilihan.map((pilihan: string, idx: number) => (
                      <li key={idx}>{pilihan}</li>
                    ))}
                  </ul>
                </>
              )}
              <p><strong>Jawaban:</strong> {JSON.stringify(result.jawaban, null, 2)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}