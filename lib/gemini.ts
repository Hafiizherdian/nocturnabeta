import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateSoal(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Konfigurasi generasi
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    // Mulai chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Riwayat chat (opsional)
    });

    // Kirim pesan ke model
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating soal:", error);
    console.log("Prompt:", prompt);
    throw new Error("Gagal generate soal");
  }
}