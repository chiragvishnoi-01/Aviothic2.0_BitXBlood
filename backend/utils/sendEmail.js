import nodemailer from "nodemailer";

// Email sending function using Nodemailer
export const sendEmail = async ({ to, subject, text }) => {
  try {
    // Check if we have email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("EMAIL CREDENTIALS NOT CONFIGURED - SENDING MOCK EMAIL:");
      console.log("To:", to);
      console.log("Subject:", subject);
      console.log("Text:", text);
      console.log("---");
      return { success: true, message: "Mock email sent" };
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or your email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};