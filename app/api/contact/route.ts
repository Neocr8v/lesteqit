import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const smtpPassword = process.env.SMTP_PASSWORD || 'Sikani@2025';

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: 'info@lesteqitsolutions.com',
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: `"Lesteq Website" <info@lesteqitsolutions.com>`,
      to: 'info@lesteqitsolutions.com',
      replyTo: email,
      subject: `${subject} | Website Inquiry`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #7c3aed; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Website Inquiry</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px;">You have received a new message from the <strong>Lesteq</strong> contact form.</p>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Subject:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${subject}</td>
              </tr>
            </table>

            <div style="margin-top: 30px;">
              <p style="font-weight: bold; margin-bottom: 10px;">Message Content:</p>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            This email was sent from the Lesteq IT Solutions contact form.
          </div>
        </div>
      `,
    };

    // Send both emails in parallel to improve performance
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail({
        from: `"Lesteq IT Solutions" <info@lesteqitsolutions.com>`,
        to: email,
        subject: `We've received your message - Lesteq IT Solutions`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #7c3aed; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Thank You for Contacting Us</h1>
            </div>
            <div style="padding: 30px; line-height: 1.6;">
              <p style="font-size: 16px;">Hello ${name},</p>
              <p style="font-size: 16px;">Thank you for reaching out to <strong>Lesteq IT Solutions</strong>. We have received your inquiry regarding "<strong>${subject}</strong>".</p>
              <p style="font-size: 16px;">Our team is reviewing your message and will get back to you within 24 hours.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 14px; color: #666;">This is an automated confirmation. Please do not reply directly to this email.</p>
            </div>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              © ${new Date().getFullYear()} Lesteq IT Solutions. All rights reserved.
            </div>
          </div>
        `,
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Nodemailer error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
