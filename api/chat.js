import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, model, max_tokens } = req.body;

    const response = await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in /chat:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal server error"});
  }
}