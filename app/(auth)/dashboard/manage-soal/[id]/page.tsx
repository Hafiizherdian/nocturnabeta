"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, ArrowLeft, Loader2, Check, X } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

type Soal = {
  id: number;
  pertanyaan: string;
  jenis: string;
  pilihan: string[];
  jawaban: string; // Jawaban dalam format string HTML
  createdAt: string;
  updatedAt: string;
};

// Tiptap Toolbar Component
const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
      >
        Ordered List
      </button>
      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className="p-2 rounded hover:bg-gray-100"
      >
        Insert Table
      </button>
    </div>
  );
};

export default function EditSoalPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pertanyaan, setPertanyaan] = useState("");
  const [jenis, setJenis] = useState("pilihan_ganda");
  const [pilihan, setPilihan] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [initialContent, setInitialContent] = useState("");


  // Tiptap Editor
  // Initialize editor with empty content first
  const editor = useEditor({
    extensions: [StarterKit, Heading, Image, Table, TableRow, TableCell, TableHeader],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  // Load soal data
  useEffect(() => {
    if (!params.id) {
      setError("ID soal tidak valid");
      setIsLoading(false);
      return;
    }
    loadSoal();
  }, [params.id]);

  // Update editor content when initialContent changes
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  const loadSoal = async () => {
    try {
      const res = await fetch(`/api/soal/${params.id}`);
      if (!res.ok) throw new Error("Soal tidak ditemukan");
      const data: Soal = await res.json();

      setPertanyaan(data.pertanyaan);
      setJenis(data.jenis);
      setPilihan(data.pilihan || []);
      setInitialContent(data.jawaban);
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

    if (!pertanyaan.trim() || !editor?.getHTML()) {
      setError("Pertanyaan dan soal lengkap tidak boleh kosong");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/soal/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pertanyaan,
          jenis,
          pilihan,
          jawaban: editor.getHTML(),
        }),
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

            {/* Soal Lengkap with Tiptap */}
            <div className="space-y-2">
              <label className="block text-base font-semibold text-gray-900">
                Soal Lengkap
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden text-gray-900">
                <Toolbar editor={editor} />
                <EditorContent editor={editor} />
              </div>
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

function setInitialContent(jawaban: string) {
  throw new Error("Function not implemented.");
}
