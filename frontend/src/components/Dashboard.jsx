import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const tabs = [
    "Plan Generator",
    "Zero-Shot",
    "One-Shot",
    "Multi-Shot",
    "Dynamic Plan",
    "Chain-of-Thought",
    "Tokenizer",
  ];
  const [activeTab, setActiveTab] = useState("Plan Generator");
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [mood, setMood] = useState("");
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let res;
      switch (activeTab) {
        case "Plan Generator":
          res = await axios.post("http://localhost:3000/api/generate-plan", { task });
          setResult(res.data.plan);
          break;
        case "Zero-Shot":
          res = await axios.post("http://localhost:3000/api/zero-shot", { text });
          setResult(res.data.summary);
          break;
        case "One-Shot":
          res = await axios.post("http://localhost:3000/api/one-shot", { task });
          setResult(res.data.plan);
          break;
        case "Multi-Shot":
          res = await axios.post("http://localhost:3000/api/multi-shot", { task });
          setResult(res.data.plan);
          break;
        case "Dynamic Plan":
          res = await axios.post("http://localhost:3000/api/dynamic-plan", {
            task,
            time,
            mood,
            username,
          });
          setResult(res.data.plan);
          break;
        case "Chain-of-Thought":
          res = await axios.post("http://localhost:3000/api/chain-of-thought", { task });
          setResult(res.data.plan);
          break;
        case "Tokenizer":
          res = await axios.post("http://localhost:3000/api/tokenize", { text });
          setResult(JSON.stringify(res.data, null, 2));
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting server!");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "Zero-Shot":
      case "Tokenizer":
        return (
          <textarea
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded h-32 text-black"
          />
        );
      case "Dynamic Plan":
        return (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Available Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="p-2 border rounded text-black"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border rounded text-black"
            />
          </div>
        );
      default:
        return (
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">FocusGenie Dashboard</h1>
      
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setResult(""); }}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-600 text-white " : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-4">{renderForm()}</div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Submit"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-white border rounded shadow whitespace-pre-wrap">
          <h2 className="font-bold mb-2">{activeTab} Result:</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
