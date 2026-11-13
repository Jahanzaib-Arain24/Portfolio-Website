import nodemailer from "nodemailer";

interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification({ name, email, subject, message }: EmailPayload) {
  // If SMTP credentials are not configured, log clearly and skip
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "arainjhanzaib@gmail.com";

  if (!smtpUser || !smtpPass) {
    console.log(
      `[Email Service] SMTP credentials not set in .env. Message from ${name} (${email}) saved in Database only.`
    );
    return { sent: false, reason: "SMTP not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email, // Clicking "Reply" in your Gmail will reply directly to the sender!
      subject: `⚡ New Inquiry: ${subject} (from ${name})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0c0e; color: #cad5e2; padding: 24px; }
            .card { background-color: #15171d; border: 1px solid rgba(241, 191, 0, 0.3); border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; }
            .header { border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 16px; margin-bottom: 24px; }
            .title { color: #f1bf00; font-size: 20px; font-weight: bold; margin: 0; }
            .meta { margin-bottom: 20px; }
            .meta-item { margin-bottom: 8px; font-size: 14px; }
            .meta-label { color: #999999; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
            .meta-value { color: #ffffff; font-weight: 500; }
            .message-box { background-color: #0b0c0e; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 18px; margin-top: 20px; }
            .message-text { color: #ffffff; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin: 0; }
            .footer { margin-top: 24px; text-align: center; font-size: 12px; color: #999999; }
            .reply-btn { display: inline-block; background-color: #f1bf00; color: #0b0c0e; padding: 10px 22px; border-radius: 8px; font-weight: bold; text-decoration: none; margin-top: 16px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2 class="title">⚡ New Portfolio Contact Dispatch</h2>
            </div>
            
            <div class="meta">
              <div class="meta-item">
                <span class="meta-label">Sender Name:</span><br/>
                <span class="meta-value">${name}</span>
              </div>
              <div class="meta-item" style="margin-top: 12px;">
                <span class="meta-label">Sender Email Address:</span><br/>
                <a href="mailto:${email}" style="color: #f1bf00; font-weight: bold; font-size: 15px; text-decoration: none;">${email}</a>
              </div>
              <div class="meta-item" style="margin-top: 12px;">
                <span class="meta-label">Subject:</span><br/>
                <span class="meta-value">${subject}</span>
              </div>
            </div>

            <div class="message-box">
              <span class="meta-label">Message Content:</span>
              <p class="message-text">${message}</p>
            </div>

            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-btn">
                Direct Reply to ${name} (${email}) &rarr;
              </a>
            </div>

            <div class="footer">
              <p>Sent from your Portfolio Website (Next.js 16 Production System)</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Notification email delivered to ${recipientEmail} from ${email}`);
    return { sent: true };
  } catch (error) {
    console.error("[Email Service] Failed to send email via SMTP:", error);
    return { sent: false, error };
  }
}

