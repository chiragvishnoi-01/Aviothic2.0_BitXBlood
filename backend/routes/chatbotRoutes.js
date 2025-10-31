import express from "express";
import { getAIResponse, handleSpecialCommands } from "../utils/aiChatbot.js";
import { authenticateToken } from "./authRoutes.js";

const router = express.Router();

// Chatbot endpoint
router.post("/message", async (req, res) => {
  try {
    const { message } = req.body;
    
    // Handle empty messages
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        response: "Please type a message so I can help you!",
        timestamp: new Date().toISOString()
      });
    }
    
    // Handle special commands first (database queries)
    const specialResponse = await handleSpecialCommands(message);
    if (specialResponse) {
      return res.json({ 
        response: specialResponse,
        timestamp: new Date().toISOString()
      });
    }
    
    // Get AI response
    const response = await getAIResponse(message, null);
    
    res.json({ 
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ 
      response: "Sorry, I'm experiencing technical difficulties. Please try again later.",
      timestamp: new Date().toISOString()
    });
  }
});

// Chatbot health check
router.get("/health", (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Chatbot service is running!',
    timestamp: new Date().toISOString()
  });
});

export default router;