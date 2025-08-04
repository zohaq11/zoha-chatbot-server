import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
  try {
    const { messages, model, max_tokens } = req.body;

    const response = await openai.createChatCompletion({
      model,
      messages,
      max_tokens,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error in /chat:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

