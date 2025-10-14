import nodemailer from "nodemailer";

// Mock email function - no actual emails sent in mock mode
export const sendEmail = async ({ to, subject, text }) => {
  console.log("MOCK EMAIL SENT:");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Text:", text);
  console.log("---");
};
