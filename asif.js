import { transporter } from "./emailConfig.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formData = req.body;

  if (!formData || Object.keys(formData).length === 0) {
    return res.status(400).json({ error: "Form data missing" });
  }

  try {
    await transporter.sendMail({
      from: `"PROFESSOR" <dardhame1@gmail.com>`,
      to: "newzatpage.@gmail.com,submitdispute@gmail.com",
      subject: "Asif Testing",
      text: JSON.stringify(formData, null, 2),
      html: `<h3>New submission from Asif</h3><pre>${JSON.stringify(formData, null, 2)}</pre>`
    });

    res.json({ success: true, message: "Data sent via email (Asif)" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
}
