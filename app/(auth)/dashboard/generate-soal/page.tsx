import { BookOpen } from "lucide-react";
import GenerateSoalForm from "./GenerateSoalForm";

export default function GenerateSoalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Generator Soal Otomatis
            </h1>
          </div>
          <p className="mt-2 text-gray-600 max-w-3xl">
            Buat soal ujian dengan mudah menggunakan AI. Masukkan deskripsi atau topik yang Anda inginkan, 
            dan sistem akan menghasilkan soal sesuai dengan kebutuhan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Form Section */}
          <div className="w-full">
            <GenerateSoalForm />
          </div>
        </div>

        {/* Optional: You can add a tips or help section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tips Membuat Soal yang Baik:
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 mr-3"></span>
              <span>Berikan konteks yang jelas tentang topik atau materi yang ingin dibuat soalnya</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 mr-3"></span>
              <span>Tentukan tingkat kesulitan yang diinginkan (mudah, sedang, atau sulit)</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 mr-3"></span>
              <span>Sebutkan jenis keterampilan yang ingin diuji (pemahaman konsep, analisis, atau aplikasi)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}