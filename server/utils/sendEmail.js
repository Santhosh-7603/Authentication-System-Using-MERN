// utils/sendEmail.js
import nodemailer from "nodemailer";

async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: `"Bluemoon Authentication App" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error while sending email:", err.message);
  }
}

export default sendEmail;
