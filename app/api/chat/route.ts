import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY no está configurada");
      return Response.json({
        reply: "Error: la API de Gemini no está configurada.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    // Construcción del historial para Gemini
    const contents = [
      ...history.map((msg: { sender: string; text: string }) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction:
          "Eres un asistente útil y amigable. Responde siempre en el mismo idioma que el usuario.",
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    console.log("GEMINI RESPONSE:", response.text);

    const reply = response.text || "Sin respuesta";

    return Response.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);

    return Response.json({
      reply: "Error al conectar 😢",
    });
  }
}