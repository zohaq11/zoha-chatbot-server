import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/', async (req, res) => {
  try {
    const { messages, model, max_tokens } = req.body;

    const response = await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
    });

    res.json(response);
  } catch (error) {
    console.error('Error in /chat:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



