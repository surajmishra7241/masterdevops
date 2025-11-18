import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail(to: string, name: string) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject: "Your query has been received - Master DevOps",
      text: `Hello ${name},\n\nThank you for contacting Master DevOps. We have received your query and will connect with you shortly.\n\nBest regards,\nMaster DevOps Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff;">Hello ${name},</h2>
          <p>Thank you for contacting <strong>Master DevOps</strong>.</p>
          <p>We have received your query and will connect with you shortly.</p>
          <br>
          <p>Best regards,<br><strong>Master DevOps Team</strong></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${to}. MessageId: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Failed to send confirmation email to ${to}:`, error);
    throw error;
  }
}
