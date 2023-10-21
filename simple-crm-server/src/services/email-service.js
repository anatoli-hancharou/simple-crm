import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendMail(to, options, onSent) {
  const mailOptions = {
    ...options,
    from: `"Simple CRM" <${process.env.MAIL_USER}>`,
    to: to,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    await onSent();
  } 
  catch (error) {
    console.error("Error sending email:", error);
  };
}
