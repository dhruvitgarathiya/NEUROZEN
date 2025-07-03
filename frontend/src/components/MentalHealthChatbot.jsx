import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, Bot, User2 } from "lucide-react";

const MentalHealthChatbot = () => {
  const [messages, setMessages] = useState([{
    role: "bot",
    text: "Hello! I'm a mental wellness chatbot. Feel free to ask me anything related to mental health. 😊",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Function to filter only mental health-related queries
  const isMentalHealthQuery = (query) => {
    const keywords = [
      "anxiety", "stress", "depression", "mood", "panic", "mental health", 
      "self-care", "overthinking", "therapy", "burnout", "emotions", "CBT",
      "coping", "loneliness", "self-worth", "negative thoughts", "wellness"
    ];
    return keywords.some((word) => query.toLowerCase().includes(word));
  };

  const fetchResponse = async (query) => {
    // if (!isMentalHealthQuery(query)) {
    //   setMessages([...messages, { sender: "bot", text: "I'm here to help with mental health topics! 😊 Try asking about self-care, emotions, stress, or well-being." }]);
    //   return;
    // }

    setLoading(true);
    const geminiAPIKey = import.meta.env.VITE_GEMINI_API_KEY;
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiAPIKey}`;

    const prompt = `
      You are a warm, empathetic mental health assistant dedicated to helping users navigate their emotional well-being. Your goal is to provide thoughtful, supportive, and evidence-based responses related to mental health, self-care, emotional regulation, stress management, mindfulness, and personal growth. 

      If a query is unrelated to mental health, gently steer the conversation back to wellness topics without being dismissive. For example:  
      - If a user asks about finance, you can say: "I'm here to support mental well-being! Managing financial stress can be overwhelming—would you like some tips on handling anxiety around money?"  
      - If a user asks about general knowledge, politely respond: "That's an interesting topic! My expertise is in mental wellness, but if you're feeling overwhelmed, I’d be happy to share mindfulness techniques."  

      Always maintain a **compassionate and understanding** tone. Responses should be warm, positive, and uplifting. Never diagnose conditions but instead offer **general guidance, self-help tips, and encourage seeking professional support when needed**.   and keep your response mostly in plain text format and try not to use markdowns. also keep the response short and concise and readable.

      keep it in plain text format

      Now, provide a helpful response to the user's query: "${query}"
    `;

    try {
      const { data } = await axios.post(geminiEndpoint, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help, but I couldn't find an answer to that.";
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: responseText }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Oops! Something went wrong please try again later" }]);
    }

    setLoading(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    fetchResponse(input);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-[80vw] md:w-full  max-w-2xl mx-auto h-[80vh] bg-green-100 shadow-lg rounded-xl p-4 md:p-6">
    {/* Header */}
    <motion.h2
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xl md:text-2xl font-semibold text-green-800 mb-3 flex items-center gap-2"
    >
      <Bot className="w-5 h-5 md:w-6 md:h-6 text-green-600" /> Mental Wellness Chatbot
    </motion.h2>

    {/* Chat messages */}
    <div className="flex-1 overflow-y-auto space-y-3 p-2 sm:p-3">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-2 sm:p-3 rounded-lg max-w-[85%] text-sm sm:text-base ${
            msg.sender === "user"
              ? "ml-auto bg-green-600 text-white"
              : "mr-auto bg-white text-gray-700 border"
          }`}
        >
          <div className="flex items-center gap-2">
            {msg.sender === "user" ? <User2 className="w-4 h-4" /> : <Bot className="w-4 h-4 text-green-600" />}
            {msg.text}
          </div>
        </motion.div>
      ))}
      {loading && <p className="text-gray-500 text-center text-sm sm:text-base">Typing...</p>}
      <div ref={chatEndRef} />
    </div>

    {/* Input field */}
    <div className="flex items-center p-2 bg-white rounded-lg shadow mt-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about mental wellness..."
        className="flex-1 px-3 py-2 text-sm sm:text-base rounded-lg focus:outline-none text-gray-700"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        className="md:ml-2 bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg flex items-center gap-1"
      >
        <Send className="w-4 h-4" /> 
        <span className="hidden sm:inline">Send</span>
      </motion.button>
    </div>
  </div>
  );
};

export default MentalHealthChatbot;
