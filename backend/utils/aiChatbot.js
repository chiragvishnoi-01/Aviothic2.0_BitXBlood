import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/User.js";

// Initialize Gemini AI with API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for the AI assistant
const systemPrompt = `
You are an intelligent blood donation assistant for BloodLink, a platform that connects blood donors with recipients in India. Your role is to:

1. Provide accurate information about blood donation, blood groups, and the donation process
2. Help users find donors by explaining how to use the platform's search features
3. Guide users through registration as donors
4. Answer frequently asked questions about eligibility, benefits, and safety of blood donation
5. Provide statistics about donors when requested
6. Always respond in a friendly, helpful, and professional manner

Important context about the platform:
- Users can register as donors and search for donors by blood group and location
- The platform has features for emergency requests (SOS), campaigns, and a donor leaderboard
- Users can view and update their profiles
- The platform is primarily used in India, so use Indian names, cities, and context when providing examples

When responding:
- Be concise but informative
- Use emojis appropriately to make responses engaging
- If asked about specific platform features, explain how to use them
- If asked about medical advice, recommend consulting a healthcare professional
- Always encourage blood donation as a noble cause that saves lives

For personalized responses, you may receive user information including their name, blood group, and location.
`;

// Function to get AI response using Gemini
export const getAIResponse = async (message, userId = null) => {
  try {
    // Get personalized user info if userId is provided
    let userInfo = "";
    if (userId) {
      try {
        const user = await User.findById(userId).select('name bloodGroup city isDonor');
        if (user) {
          userInfo = `User context: ${user.name}, blood group: ${user.bloodGroup || 'not specified'}, location: ${user.city || 'not specified'}, registered donor: ${user.isDonor ? 'yes' : 'no'}. `;
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    // Create prompt with user message and context
    const prompt = `${systemPrompt}

${userInfo}User message: ${message}

Please provide a helpful response:`;

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("AI Response Error:", error);
    // Fallback to rule-based responses if AI fails
    return getFallbackResponse(message);
  }
};

// Rule-based fallback responses for when AI is unavailable
const getFallbackResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Greetings
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! 👋 I'm your BloodLink assistant. How can I help you with blood donation today?";
  }
  
  // Help requests
  if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
    return "I can help you with:\n• Finding blood donors\n• Learning about blood donation\n• Registering as a donor\n• Understanding blood groups\n• Using our platform features\n\nWhat would you like to know?";
  }
  
  // Blood group information
  if (lowerMessage.includes("blood group") || lowerMessage.includes("blood type")) {
    return "Here's blood group compatibility information:\n\nO- (Universal Donor) can donate to everyone\nAB+ (Universal Receiver) can receive from everyone\n\nOther groups have specific compatibility rules. Would you like to know about a specific blood group?";
  }
  
  // Donation process
  if (lowerMessage.includes("donate") || lowerMessage.includes("donation")) {
    return "The blood donation process:\n1. Registration with ID\n2. Health screening\n3. Blood collection (8-12 minutes)\n4. Refreshments and rest\n\nThe entire process takes about 30-45 minutes. You must be at least 17 years old and weigh at least 110 lbs.";
  }
  
  // Default response
  return "I'm here to help with blood donation information. Could you please be more specific about what you'd like to know?";
};

// Function to handle special commands that require database queries
export const handleSpecialCommands = async (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Handle donor statistics request
  if (lowerMessage.includes("donor statistics") || lowerMessage.includes("how many donors") || lowerMessage.includes("total donors")) {
    try {
      const donorCount = await User.countDocuments({ isDonor: true });
      return `We currently have ${donorCount} registered donors in our system who are ready to help save lives! 🩸`;
    } catch (error) {
      console.error("Error fetching donor statistics:", error);
      return "I'm having trouble accessing donor statistics right now. Please try again later.";
    }
  }
  
  // Handle blood group statistics
  if (lowerMessage.includes("blood group statistics") || lowerMessage.includes("most needed") || lowerMessage.includes("popular blood group")) {
    try {
      const bloodGroupStats = await User.aggregate([
        { $match: { isDonor: true } },
        { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      
      if (bloodGroupStats.length > 0) {
        const mostNeeded = bloodGroupStats[0]._id;
        return `Our most needed blood group is ${mostNeeded} with ${bloodGroupStats[0].count} donors. Here's the breakdown:\n` + 
               bloodGroupStats.map(stat => `${stat._id}: ${stat.count} donors`).join('\n');
      } else {
        return "We're currently collecting blood group statistics. Check back later!";
      }
    } catch (error) {
      console.error("Error fetching blood group statistics:", error);
      return "I'm having trouble accessing blood group statistics right now. Please try again later.";
    }
  }
  
  return null; // Not a special command
};