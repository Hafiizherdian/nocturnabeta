import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateSoal(prompt: string) {
  try {
    // Validasi API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    console.log("Prompt sent to Gemini:", prompt);

    const result = await chatSession.sendMessage(prompt);
    console.log("Result from Gemini:", result);

    // Validasi respons
    if (!result || !result.response || !result.response.text()) {
      throw new Error("Invalid response from Gemini API");
    }

    const generatedText = result.response.text();
    console.log("Generated text:", generatedText);

    return generatedText;
  } catch (error) {
    console.error("Error generating soal:", error);
    console.log("Prompt:", prompt);
    throw new Error("Gagal generate soal");
  }
}