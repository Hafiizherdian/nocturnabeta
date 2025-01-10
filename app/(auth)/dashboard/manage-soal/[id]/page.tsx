"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "tiptap-extension-font-size";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Table as TableIcon,
  Save,
  Trash2,
  Loader2,
  ArrowLeft,
  Image as ImageIcon,
  Check,
  X,
  Undo,
  Redo,
  Link as LinkIcon,
} from "lucide-react";

interface ToolbarProps {
  editor: any;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "30px"];

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      {/* File Menu Bar */}
      <div className="flex items-center px-4 py-2 border-b bg-gray-50">
        <button className="hover:bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
          File
        </button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
          Edit
        </button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
          View
        </button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
          Insert
        </button>
        <button className="hover:bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700">
          Format
        </button>
      </div>

      {/* Main Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 border-b">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-1.5 rounded hover:bg-gray-100"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-1.5 rounded hover:bg-gray-100"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Font Controls */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <select
            className="px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Heading Levels */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <select
            className="px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              const level = parseInt(e.target.value);
              if ([1, 2, 3, 4, 5, 6].includes(level)) {
                editor.chain().focus().toggleHeading({ level }).run();
              }
            }}
          >
            <option value="">Heading</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded hover:bg-gray-100 ${
              editor.isActive("bold") ? "bg-gray-100" : ""
            }`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded hover:bg-gray-100 ${
              editor.isActive("italic") ? "bg-gray-100" : ""
            }`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded hover:bg-gray-100 ${
              editor.isActive("underline") ? "bg-gray-100" : ""
            }`}
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Text Color */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-6 h-6 border rounded-md"
          />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="p-1.5 rounded hover:bg-gray-100"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="p-1.5 rounded hover:bg-gray-100"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="p-1.5 rounded hover:bg-gray-100"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 pr-2 border-r">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded hover:bg-gray-100 ${
              editor.isActive("bulletList") ? "bg-gray-100" : ""
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded hover:bg-gray-100 ${
              editor.isActive("orderedList") ? "bg-gray-100" : ""
            }`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        {/* Insert */}
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            className="p-1.5 rounded hover:bg-gray-100"
          >
            <TableIcon className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-100">
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const url = window.prompt("Enter the URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            className="p-1.5 rounded hover:bg-gray-100"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function WordLikeEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pertanyaan, setPertanyaan] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextStyle,
      Color,
      FontSize,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[calc(100vh-20rem)] mx-auto px-16 py-8 bg-white",
      },
    },
  });

  // Load soal data
  useEffect(() => {
    const loadSoal = async () => {
      try {
        const res = await fetch(`/api/soal/${params.id}`);
        if (!res.ok) throw new Error("Gagal memuat soal");
        const data = await res.json();
        setPertanyaan(data.pertanyaan);
        setContent(data.jawaban || "<p>Default content jika jawaban kosong</p>");
      } catch (error) {
        setError("Gagal memuat soal");
        console.error("Error loading soal:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) loadSoal();
  }, [params.id]);

  // Update editor content when `content` changes
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Handle Save
  const handleSave = async () => {
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
          jawaban: editor.getHTML(),
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan perubahan");
      setSuccessMessage("Perubahan berhasil disimpan");
      setTimeout(() => router.push("/dashboard/manage-soal"), 1500);
    } catch (error) {
      setError("Gagal menyimpan perubahan");
      console.error("Error saving soal:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/soal/${params.id}`, { method: "DELETE" });
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Actions Bar */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Kembali</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="px-4 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 font-medium flex items-center gap-2"
            disabled={isSaving || isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || isDeleting}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center gap-2 disabled:bg-blue-400"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {(error || successMessage) && (
        <div className="max-w-5xl mx-auto px-4 py-2">
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
      )}

      {/* Editor Container */}
      <div className="container mx-auto py-4">
        <div className="max-w-5xl mx-auto bg-white shadow-xl text-gray-900">
          <Toolbar editor={editor} />
          <div className="bg-gray-100 px-8 py-4">
            <div className="bg-white shadow-md rounded-sm">
              {/* Topic Input */}
              <div className="px-16 py-6 border-b text-gray-900">
                <input
                  type="text"
                  value={pertanyaan}
                  onChange={(e) => setPertanyaan(e.target.value)}
                  placeholder="Masukkan topik soal..."
                  className="w-full text-2xl font-semibold border-none focus:outline-none focus:ring-0 p-0"
                />
              </div>
              {/* Editor Content */}
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}