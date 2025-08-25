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

app.post("/api/one-shot", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const prompt = `
    You are FocusGenie, a productivity companion.

    Example:
    Task: "Complete a math assignment"
    Focus Plan:
    1. Gather all materials (notebook, calculator, textbook).
    2. Break the assignment into 3 sections and set a 30-minute timer for each.
    3. Review answers and highlight doubts for clarification.

    Now generate a focus plan for:
    Task: "${task}"
    Focus Plan:
    - Keep it under 3 to 4 actionable steps.
    - Do not exceed 120 characters per step.  
    `;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    res.json({ plan: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong in one-shot!" });
  }
});

app.post("/api/multi-shot", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const prompt = `
    You are FocusGenie, a productivity companion.

    Example 1:
    Task: "Prepare for a biology exam"
    Focus Plan:
    1. Review syllabus & mark weak topics.
    2. Create flashcards for key terms.
    3. Solve 2 past papers under timed conditions.

    Example 2:
    Task: "Clean your room"
    Focus Plan:
    1. Pick up clothes and organize into laundry piles.
    2. Dust surfaces and arrange books/items neatly.
    3. Vacuum and mop the floor to finish.

    Example 3:
    Task: "Write a blog article"
    Focus Plan:
    1. Research topic and collect key points.
    2. Draft an outline with intro, body, and conclusion.
    3. Write, edit, and proofread before publishing.

    Now generate a focus plan for:
    Task: "${task}"
    Focus Plan:
    - Follow the same structure.
    - Keep it concise with 3 clear steps.
    - Avoid long sentences (under 120 characters).
    `;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    res.json({ plan: output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong in multi-shot!" });
  }
});

app.post("/api/dynamic-plan", async (req, res) => {
  try {
    const { task, time, mood, username } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const prompt = `
    You are FocusGenie, a personalized productivity companion.

    User: ${username || "Anonymous"}
    Mood: ${mood || "neutral"}
    Available time: ${time || "not specified"}
    Task: "${task}"

    Generate a focus plan that:
    1. Considers the user's mood and time availability.
    2. Keeps steps short and motivating.
    3. Suggests a relaxation step if mood is stressed.
    `;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    res.json({ plan: output });
  } catch (error) {
    console.error("Error in Dynamic Prompting:", error);
    res.status(500).json({ error: "Something went wrong in dynamic prompting!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
