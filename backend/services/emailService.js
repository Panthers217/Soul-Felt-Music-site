import nodemailer from 'nodemailer';
import pool from '../config/db.js';

/**
 * Get email configuration from website_settings
 */
async function getEmailConfig() {
  try {
    const [settings] = await pool.query(
      `SELECT 
        email_provider, 
        email_api_key, 
        email_from_name, 
        email_reply_to,
        smtp_host, 
        smtp_port, 
        smtp_secure, 
        smtp_user, 
        smtp_password, 
        contact_email 
      FROM website_settings 
      LIMIT 1`
    );
    
    if (settings.length === 0) {
      throw new Error('Email settings not configured in Admin Settings');
    }

    const config = settings[0];
    const provider = config.email_provider || 'smtp';

    // Validate based on provider
    if (provider === 'smtp') {
      if (!config.smtp_user || !config.smtp_password) {
        throw new Error('SMTP settings not configured. Please configure SMTP username and password.');
      }
    } else {
      // API-based providers need an API key
      if (!config.email_api_key) {
        throw new Error(`${provider.toUpperCase()} API key not configured. Please add your API key in Email Settings.`);
      }
    }
    
    return config;
  } catch (error) {
    console.error('Error fetching email config:', error);
    throw error;
  }
}

/**
 * Create email transporter based on provider
 */
async function createTransporter() {
  const config = await getEmailConfig();
  const provider = config.email_provider || 'smtp';

  // SMTP (default) - works with Gmail, Outlook, SendGrid SMTP, etc.
  if (provider === 'smtp') {
    return nodemailer.createTransport({
      host: config.smtp_host,
      port: config.smtp_port,
      secure: config.smtp_secure,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_password,
      },
    });
  }

  // Resend - https://resend.com
  if (provider === 'resend') {
    return nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: {
        user: 'resend',
        pass: config.email_api_key,
      },
    });
  }

  // SendGrid API via SMTP
  if (provider === 'sendgrid') {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: config.email_api_key,
      },
    });
  }

  // Mailgun SMTP
  if (provider === 'mailgun') {
    return nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: config.smtp_user || 'postmaster@your-domain.com',
        pass: config.email_api_key,
      },
    });
  }

  // Postmark
  if (provider === 'postmark') {
    return nodemailer.createTransport({
      host: 'smtp.postmarkapp.com',
      port: 587,
      secure: false,
      auth: {
        user: config.email_api_key,
        pass: config.email_api_key,
      },
    });
  }

  // AWS SES SMTP
  if (provider === 'ses-smtp') {
    return nodemailer.createTransport({
      host: `email-smtp.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com`,
      port: 587,
      secure: false,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_password,
      },
    });
  }

  throw new Error(`Unsupported email provider: ${provider}`);
}

/**
 * Get sender email address based on provider
 */
export async function getSenderEmail() {
  const config = await getEmailConfig();
  const provider = config.email_provider || 'smtp';

  // For most providers, use smtp_user as the from address
  // For Resend and some others, you might need a verified domain email
  if (provider === 'resend' && config.contact_email) {
    return config.contact_email;
  }

  return config.smtp_user || config.contact_email || 'noreply@soulfeltmusic.com';
}

/**
 * Send newsletter campaign to a single recipient
 */
export async function sendNewsletterEmail(recipientEmail, campaign, fromEmail) {
  const transporter = await createTransporter();
  const config = await getEmailConfig();
  
  // Use configured from name and reply-to
  const fromName = config.email_from_name || 'Soul Felt Music';
  const replyTo = config.email_reply_to || fromEmail;
  
  // Build HTML email content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${campaign.subject}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #aa2a46 0%, #8a1f36 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #fff;
          padding: 30px;
          border: 1px solid #ddd;
        }
        .message {
          background: #f9f9f9;
          padding: 20px;
          border-left: 4px solid #aa2a46;
          margin: 20px 0;
        }
        .media-section {
          margin: 20px 0;
          padding: 15px;
          background: #f5f5f5;
          border-radius: 5px;
        }
        .links {
          margin: 20px 0;
        }
        .link-item {
          display: block;
          padding: 10px 15px;
          margin: 10px 0;
          background: #aa2a46;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          text-align: center;
        }
        .footer {
          background: #f9f9f9;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-radius: 0 0 10px 10px;
        }
        .unsubscribe {
          margin-top: 20px;
          font-size: 11px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Soul Felt Music</h1>
        <p>${campaign.subject}</p>
      </div>
      
      <div class="content">
        <div style="white-space: pre-wrap;">${campaign.content}</div>
        
        ${campaign.message ? `
          <div class="message">
            <strong>Additional Notes:</strong><br>
            ${campaign.message}
          </div>
        ` : ''}
        
        ${campaign.audio_url ? `
          <div class="media-section">
            <strong>🎵 Featured Audio:</strong><br>
            <a href="${campaign.audio_url}" target="_blank">Listen Now</a>
          </div>
        ` : ''}
        
        ${campaign.video_url ? `
          <div class="media-section">
            <strong>🎬 Featured Video:</strong><br>
            <a href="${campaign.video_url}" target="_blank">Watch Now</a>
          </div>
        ` : ''}
        
        ${campaign.external_links && campaign.external_links.length > 0 ? `
          <div class="links">
            <strong>🔗 Important Links:</strong><br>
            ${campaign.external_links.map(link => `
              <a href="${link.url}" class="link-item" target="_blank">${link.title}</a>
            `).join('')}
          </div>
        ` : ''}
        
        ${campaign.featured_image ? `
          <div style="text-align: center; margin: 20px 0;">
            <img src="${campaign.featured_image}" alt="Featured" style="max-width: 100%; border-radius: 10px;">
          </div>
        ` : ''}
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} Soul Felt Music. All rights reserved.</p>
        <div class="unsubscribe">
          <a href="${process.env.FRONTEND_URL || 'https://soulfeltmusic.com'}" style="color: #666;">Visit our website</a>
          <br><br>
          You're receiving this because you subscribed to Soul Felt Music newsletter.
          <br>
          <a href="${process.env.FRONTEND_URL || 'https://soulfeltmusic.com'}?unsubscribe=${encodeURIComponent(recipientEmail)}" style="color: #aa2a46;">Unsubscribe</a>
        </div>
      </div>
    </body>
    </html>
  `;

  // Plain text version
  const textContent = `
${campaign.subject}

${campaign.content}

${campaign.message ? `\nAdditional Notes:\n${campaign.message}\n` : ''}

${campaign.audio_url ? `\n🎵 Featured Audio: ${campaign.audio_url}\n` : ''}

${campaign.video_url ? `\n🎬 Featured Video: ${campaign.video_url}\n` : ''}

${campaign.external_links && campaign.external_links.length > 0 ? `\n🔗 Links:\n${campaign.external_links.map(l => `${l.title}: ${l.url}`).join('\n')}\n` : ''}

---
© ${new Date().getFullYear()} Soul Felt Music
Visit: ${process.env.FRONTEND_URL || 'https://soulfeltmusic.com'}
Unsubscribe: ${process.env.FRONTEND_URL || 'https://soulfeltmusic.com'}?unsubscribe=${encodeURIComponent(recipientEmail)}
  `;

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: recipientEmail,
    replyTo: replyTo,
    subject: campaign.subject,
    text: textContent,
    html: htmlContent,
  };

  return await transporter.sendMail(mailOptions);
}

/**
 * Test email configuration
 */
export async function testEmailConfig(testRecipient) {
  const config = await getEmailConfig();
  const transporter = await createTransporter();
  const fromEmail = await getSenderEmail();
  const fromName = config.email_from_name || 'Soul Felt Music';
  
  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: testRecipient,
    replyTo: config.email_reply_to || fromEmail,
    subject: 'Test Email - Soul Felt Music',
    text: `This is a test email from Soul Felt Music newsletter system.\n\nProvider: ${config.email_provider || 'smtp'}`,
    html: `<p>This is a test email from Soul Felt Music newsletter system.</p><p><strong>Provider:</strong> ${config.email_provider || 'smtp'}</p>`,
  };

  return await transporter.sendMail(mailOptions);
}

export default {
  sendNewsletterEmail,
  testEmailConfig,
  getSenderEmail,
};
