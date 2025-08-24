import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/generate-plan", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const prompt = `
    You are FocusGenie, a productivity companion.
    User task: "${task}".
    Generate a clear, actionable 3-step focus plan.
    `;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    res.json({ plan: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.post("/api/zero-shot", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const prompt = `Summarize the following text in 3 bullet points:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    res.json({ summary: output });
  } catch (error) {
    console.error("Error in Zero Shot Prompting:", error);
    res.status(500).json({ error: "Something went wrong in zero-shot!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
