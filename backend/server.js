const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Vertex AI
// NOTE: For local development, ensure GOOGLE_APPLICATION_CREDENTIALS is set,
// or run `gcloud auth application-default login`.
// Also ensure your GCP project is set correctly.
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT;
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

let generativeModel;
try {
  const vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION });
  generativeModel = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-1.5-flash-preview-0514', // using preview to ensure flash availability, but can use standard `gemini-1.5-flash` if preferred
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.7,
      topP: 0.95,
    },
  });
} catch (error) {
  console.warn('Vertex AI initialization failed. Please check your credentials/project ID.');
}


app.post('/api/advice', async (req, res) => {
  const { age, location } = req.body;

  if (!age || !location) {
    return res.status(400).json({ error: 'Age and location are required.' });
  }

  const prompt = `
You are a helpful CivicPath AI assistant. Provide personalized, step-by-step voting advice and a roadmap for someone who is ${age} years old and lives in ${location}. Keep the advice concise, engaging, and accurate for the United States election process. Make sure the output is structured clearly using Markdown. Include headers, bullet points, and actionable next steps.
  `;

  try {
    if (!generativeModel) {
      return res.status(500).json({ error: 'Generative AI model is not initialized.' });
    }
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };
    const responseStream = await generativeModel.generateContent(request);
    const textResponse = responseStream.response.candidates[0].content.parts[0].text;
    res.json({ advice: textResponse });
  } catch (error) {
    console.error('Error calling Vertex AI:', error);
    res.status(500).json({ error: 'Failed to generate advice.', details: error.message });
  }
});

// Serve static frontend in production
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
