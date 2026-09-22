import nodemailer from "nodemailer";
import { siteConfig } from "./config";
import { ReservationInput } from "./validation";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendReservationNotificationEmail(reservation: ReservationInput) {
  const adminEmail = process.env.ADMIN_EMAIL || siteConfig.contact.adminEmail;
  const fromEmail = process.env.EMAIL_FROM || "no-reply@marrakeshitourguide.com";

  const emailSubject = `🔔 New Tour Request: ${reservation.tour} (${reservation.fullName})`;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; color: #2B1E15; max-width: 600px; margin: 0 auto; border: 1px solid #EBDCB9; border-radius: 12px; overflow: hidden; background: #FBF6EC;">
      <div style="background-color: #C1552D; color: #FBF6EC; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; letter-spacing: 0.5px;">Marrakeshi Tour Guide</h1>
        <p style="margin: 4px 0 0; opacity: 0.9;">New Private Tour Request for Zaky</p>
      </div>
      <div style="padding: 24px;">
        <h2 style="color: #9A4220; margin-top: 0;">Reservation Request Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px;">Guest Name:</td>
            <td style="padding: 8px 0;">${reservation.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${reservation.email}">${reservation.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone / WhatsApp:</td>
            <td style="padding: 8px 0;"><a href="https://wa.me/${reservation.phone.replace(/[^0-9]/g, "")}">${reservation.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Tour Experience:</td>
            <td style="padding: 8px 0; color: #C1552D; font-weight: bold;">${reservation.tour}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Preferred Date:</td>
            <td style="padding: 8px 0;">${reservation.date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Number of People:</td>
            <td style="padding: 8px 0;">${reservation.people}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Guest Message:</td>
            <td style="padding: 8px 0; white-space: pre-wrap;">${reservation.message || "—"}</td>
          </tr>
        </table>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${siteConfig.urls.site}/adminzaky" style="display: inline-block; background-color: #2B1E15; color: #FBF6EC; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold;">
            Open Zaky Portal
          </a>
        </div>
      </div>
    </div>
  `;

  const customerSubject = `Tour Request Received: ${reservation.tour} with Zaky`;
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; color: #2B1E15; max-width: 600px; margin: 0 auto; border: 1px solid #EBDCB9; border-radius: 12px; overflow: hidden; background: #FBF6EC;">
      <div style="background-color: #2B1E15; color: #FBF6EC; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #EBDCB9;">Marrakeshi Tour Guide</h1>
        <p style="margin: 4px 0 0; color: #C79A47;">Private Tours in Marrakesh with Zaky</p>
      </div>
      <div style="padding: 24px;">
        <p>Dear <strong>${reservation.fullName}</strong>,</p>
        <p>Thank you for requesting a private tour in Marrakesh with Zaky. We have received your inquiry for <strong>${reservation.tour}</strong>.</p>
        
        <div style="background: #F3E9D2; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C1552D;">
          <p style="margin: 0 0 8px; font-weight: bold; color: #9A4220;">Your Request Summary:</p>
          <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Tour:</strong> ${reservation.tour}</li>
            <li><strong>Requested Date:</strong> ${reservation.date}</li>
            <li><strong>Number of Guests:</strong> ${reservation.people}</li>
            ${reservation.message ? `<li><strong>Notes:</strong> ${reservation.message}</li>` : ""}
          </ul>
        </div>

        <div style="background-color: #FFF3CD; border: 1px solid #FFEEBA; color: #856404; padding: 12px 16px; border-radius: 6px; font-size: 14px; margin: 20px 0;">
          <strong>Important Note:</strong> This email acknowledges receipt of your request. This is a preliminary inquiry and is <em>not yet confirmed</em>. Zaky will personally review his schedule and contact you shortly via email or WhatsApp to confirm availability and finalize arrangements.
        </div>

        <p>If you have any urgent questions or wish to connect right away, you can reach Zaky on WhatsApp:</p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="https://wa.me/${siteConfig.urls.whatsappNumber.replace(/[^0-9]/g, "")}" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold;">
            Chat on WhatsApp
          </a>
        </p>

        <p style="margin-top: 30px; font-size: 14px; color: #777;">
          Warm regards,<br>
          <strong>Zaky</strong><br>
          Official Tour Guide, Marrakesh, Morocco
        </p>
      </div>
    </div>
  `;

  const transporter = createTransporter();

  if (!transporter) {
    console.log("[Email Service] SMTP is not configured. Reservation email logged:");
    console.log(`To Admin (${adminEmail}):`, emailSubject);
    console.log(`To Customer (${reservation.email}):`, customerSubject);
    return { sent: false, mock: true };
  }

  try {
    // Send admin notification
    await transporter.sendMail({
      from: `"Marrakeshi Tour Guide" <${fromEmail}>`,
      to: adminEmail,
      subject: emailSubject,
      html: emailHtml,
    });

    // Send customer confirmation request
    await transporter.sendMail({
      from: `"Zaky - Marrakeshi Tour Guide" <${fromEmail}>`,
      to: reservation.email,
      subject: customerSubject,
      html: customerHtml,
    });

    return { sent: true, mock: false };
  } catch (error) {
    console.error("[Email Service Error]", error);
    return { sent: false, error };
  }
}
