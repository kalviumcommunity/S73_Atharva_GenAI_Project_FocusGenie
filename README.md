# FocusGenie - Your AI Productivity Coach  

## Overview  
FocusGenie is a MERN stack web application powered by Generative AI.  
It acts as a personal productivity coach, helping users improve focus, build better habits, and optimize their daily routines.  

The system leverages prompt engineering techniques and retrieval-augmented generation (RAG) to deliver customized advice such as study schedules, work-life balance tips, and time-management strategies.  

---

## Features  
- User Authentication (JWT + Cookies) → Signup, Login, Logout  
- AI-Powered Productivity Advice → Personalized responses to user queries  
- RAG-based Recommendations → Uses productivity knowledge base (Pomodoro, Deep Work, Eisenhower Matrix, etc.)  
- Prompt Engineering → Zero-shot, One-shot, Multi-shot, Dynamic, and Chain-of-Thought prompts  
- Vector Database → Embeddings stored in MongoDB for fast similarity search  
- Cosine Similarity → Finds the most relevant strategies based on user queries  
- Creativity Controls → Adjust AI response style (temperature, top-p, top-k)  
- User Dashboard → Track and save AI-recommended plans  

---

## Tech Stack  
- **Frontend**: React.js + TailwindCSS  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (Atlas or local)  
- **AI Integration**: Gemini API (Google Generative AI)  
- **Vector Storage**: MongoDB collection for embeddings  

---

## System Architecture  
1. **Frontend (React)** → Provides user interface for queries and dashboards.  
2. **Backend (Express)** → Handles API requests, authentication, and AI calls.  
3. **MongoDB** → Stores users, embeddings, and saved productivity tips.  
4. **AI Layer (RAG)** → Uses embeddings + cosine similarity to retrieve strategies, then enhances output with prompt engineering.  

---

## GenAI Concepts Used  
- **System & User Prompts** → Define AI as a productivity coach  
- **Zero-Shot Prompting** → AI gives answers without prior examples  
- **One-Shot Prompting** → Improves alignment with a single example  
- **Multi-Shot Prompting** → Multiple examples for consistent output  
- **Dynamic Prompting** → Inject user’s schedule and lifestyle into prompts  
- **Chain-of-Thought Prompting** → AI explains reasoning step by step  
- **Embeddings + Vector Store** → Store strategies in MongoDB for retrieval  
- **Cosine Similarity** → Finds most relevant strategies for queries  
- **Temperature / Top-P / Top-K** → User-adjustable creativity settings  

---

## Setup & Installation  

### 1. Clone Repo  
```bash
git clone https://github.com/kalviumcommunity/S73_Atharva_GenAI_Project_FocusGenie.git
cd S73_Atharva_GenAI_Project_FocusGenie
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 3. Setup Environment
Create a .env file in backend:
```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_api_key_here
```

### 4. Run the App
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
```

App will run at: `http://localhost:3000`

## Example Use Cases  
- **User:** "I keep procrastinating my assignments."  
  **FocusGenie:** Suggests Pomodoro Technique with 25/5-minute cycles.  

- **User:** "I want a 7-day study + gym schedule."  
  **FocusGenie:** Creates a structured daily plan with breaks.  

- **User:** "How can I avoid distractions at night?"  
  **FocusGenie:** Recommends Deep Work + Digital Detox strategy.  

---

## Future Enhancements  
- Mobile app with React Native  
- Journal feature → Save daily AI tips and track progress  
- Gamification → Reward system for task completion  
- Multi-language support  

---

