
export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    // Construimos el arreglo completo de mensajes
    const messages = [
      {
        role: "system",
        content: "Eres un asistente útil y amigable. Responde siempre en el mismo idioma que el usuario.",
      },
      // Convertimos el historial previo al formato que espera la API
      ...history.map((msg: { sender: string; text: string }) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      // El mensaje actual del usuario
      { role: "user", content: message },
    ];

    const res = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-8B-Instruct",
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

    const data = await res.json();
    console.log("HF RESPONSE:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "Sin respuesta";

    return Response.json({ reply });

  } catch (err) {
    console.error(err);
    return Response.json({ reply: "Error al conectar 😢" });
  }
}