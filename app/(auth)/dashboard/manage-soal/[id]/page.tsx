"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, ArrowLeft, Loader2, Check, X } from "lucide-react";

type Soal = {
  id: number;
  pertanyaan: string;
  jenis: string;
  pilihan: string[];
  jawaban: any; // Menggunakan tipe any karena jawaban berisi JSON atau string
  createdAt: string;
  updatedAt: string;
};

export default function EditSoalPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pertanyaan, setPertanyaan] = useState("");
  const [jenis, setJenis] = useState("pilihan_ganda");
  const [pilihan, setPilihan] = useState<string[]>([]);
  const [jawaban, setJawaban] = useState<any>({}); // State untuk menyimpan JSON atau string jawaban
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load soal data
  useEffect(() => {
    loadSoal();
  }, [params.id]);

  const loadSoal = async () => {
    try {
      const res = await fetch(`/api/soal/${params.id}`);
      if (!res.ok) throw new Error("Soal tidak ditemukan");
      const data: Soal = await res.json();
      setPertanyaan(data.pertanyaan);
      setJenis(data.jenis);
      setPilihan(data.pilihan || []);
      setJawaban(data.jawaban); // Set jawaban sebagai JSON atau string
    } catch (error) {
      setError("Gagal mengambil data soal");
      console.error("Error fetching soal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle update soal
  const handleUpdate = async () => {
    setError("");
    setSuccessMessage("");

    if (!pertanyaan.trim() || !jawaban) {
      setError("Pertanyaan dan jawaban tidak boleh kosong");
      return;
    }

    // Validasi jawaban
    let parsedJawaban;
    if (typeof jawaban === "string") {
      try {
        parsedJawaban = JSON.parse(jawaban); // Coba parse jika jawaban adalah string JSON
      } catch (error) {
        setError("Format jawaban tidak valid. Harap masukkan JSON yang valid.");
        return;
      }
    } else {
      parsedJawaban = jawaban; // Jika jawaban sudah berupa objek, gunakan langsung
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/soal/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pertanyaan, jenis, pilihan, jawaban: parsedJawaban }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan perubahan");

      setSuccessMessage("Perubahan berhasil disimpan");
      setTimeout(() => router.push("/dashboard/manage-soal"), 1500);
    } catch (error) {
      setError("Gagal menyimpan perubahan");
      console.error("Error updating soal:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle delete soal
  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/soal/${params.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus soal");

      setSuccessMessage("Soal berhasil dihapus");
      setTimeout(() => router.push("/dashboard/manage-soal"), 1500);
    } catch (error) {
      setError("Gagal menghapus soal");
      console.error("Error deleting soal:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-gray-900 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Kembali</span>
          </button>

          {/* Status Messages */}
          {error && (
            <div className="flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-lg">
              <X className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
          {successMessage && (
            <div className="flex items-center bg-green-50 text-green-600 px-4 py-2 rounded-lg">
              <Check className="w-5 h-5 mr-2" />
              {successMessage}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900">Edit Soal</h1>
          </div>

          <div className="p-6 space-y-6">
            {/* Pertanyaan */}
            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-900">
                Topik Soal
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                value={pertanyaan}
                onChange={(e) => setPertanyaan(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[120px] text-gray-900"
                placeholder="Masukkan topik soal..."
              />
            </div>

            {/* Jawaban (Soal Lengkap) */}
            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-900">
                Soal Lengkap 
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                value={typeof jawaban === "string" ? jawaban : JSON.stringify(jawaban, null, 2)}
                onChange={(e) => {
                  try {
                    const parsedJawaban = JSON.parse(e.target.value);
                    setJawaban(parsedJawaban);
                    setError("");
                  } catch (error) {
                    setJawaban(e.target.value); // Simpan sebagai string jika tidak valid JSON
                    setError("Format JSON tidak valid");
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[300px] text-gray-900 font-mono"
                placeholder="Masukkan soal lengkap dalam format JSON..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 font-medium"
              disabled={isSaving || isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5 mr-2" />
              )}
              {isDeleting ? "Menghapus..." : "Hapus Soal"}
            </button>
            <button
              onClick={handleUpdate}
              disabled={isSaving || isDeleting}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:bg-blue-400"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}