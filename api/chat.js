import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, model = "gpt-3.5-turbo", max_tokens = 500 } = req.body;

    const response = await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in /chat:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}






