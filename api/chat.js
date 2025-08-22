import OpenAI from "openai";

export default async function handler(req, res) {
  // CORS (allow your GitHub Pages origin)
  res.setHeader("Access-Control-Allow-Origin", "https://zohaq11.github.io");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    return;
  }

  try {
    const { messages, model = "gpt-3.5-turbo", max_tokens = 300 } = req.body || {};
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens
    });

    res.status(200).json(completion);
  } catch (err) {
    console.error("OpenAI error:", err?.response?.data || err.message);
    res.status(err.status ?? 500).json({
      error: "OpenAI request failed",
      details: err?.response?.data || err.message
    });
  }
}




