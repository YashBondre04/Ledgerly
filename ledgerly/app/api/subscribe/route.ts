import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { DataStore, Subscriber } from '@/lib/storage';

const SURVEY_LINK = "https://forms.gle/YOUR_GOOGLE_FORM_LINK_HERE"; // Placeholder, user should update

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Validate Email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // 2. Check Duplicates
    if (await DataStore.exists(email)) {
      return NextResponse.json(
        { message: 'You are already subscribed!' }, // Treat as success to avoid leaking info/confusion
        { status: 200 }
      );
    }

    // 3. Store Subscriber
    const newSubscriber: Subscriber = {
      email,
      signup_date: new Date().toISOString(),
      source: 'marketing-site',
      survey_sent: true,
      survey_completed: false,
      reward_eligible: true,
      last_emailed_at: new Date().toISOString()
    };

    const stored = await DataStore.addSubscriber(newSubscriber);
    if (!stored) {
      return NextResponse.json(
        { error: 'Failed to save subscription.' },
        { status: 500 }
      );
    }

    // 4. Send Confirmation Email via Gmail SMTP
    try {
      console.log('Attempting to send email to:', email);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const emailHtml = `
                <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color: #333; line-height: 1.6;">
  <h2 style="color:#0F172A;">Thanks for joining Ledgerly 👋</h2>

  <p>Hi there,</p>

  <p>
    Thanks for signing up for early access to <strong>Ledgerly</strong>.
    We’re building it to help people get a clear view of their subscriptions and recurring costs — without spreadsheets or finance headaches.
  </p>

  <p>
    Since we’re still early, your input really matters to us.
    If you have a couple of minutes, we’d really appreciate you filling out a short survey to tell us what matters most to you.
  </p>

  <p style="margin: 20px 0;">
    <a
      href="https://forms.gle/ew7G3xbBcJfqHxck7"
      style="background-color:#1E3A8A; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:6px; display:inline-block;"
    >
      Take the 2-minute survey
    </a>
  </p>

  <p style="font-size:14px;">
    If the button doesn’t work, you can also use this link:<br>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfzVPc0eJCmUemruGazlHLsDGWqX6yGJDXBbKLSooQ4bLbnBw/viewform?usp=header" style="color:#1E3A8A;">https://docs.google.com/forms/d/e/1FAIpQLSfzVPc0eJCmUemruGazlHLsDGWqX6yGJDXBbKLSooQ4bLbnBw/viewform?usp=header</a>
  </p>

  <p>
    As an early supporter, we’ve also marked you as eligible for early-access perks
    (like a free month of Pro) when we launch.
  </p>

  <p>
    We’ll keep you posted with occasional development updates as we build.
    No spam — just meaningful progress.
  </p>

  <p>
    Thanks again,<br>
    <strong>The Ledgerly Team</strong>
  </p>

  <hr style="border:0; border-top:1px solid #eee; margin:24px 0;">

  <p style="font-size:12px; color:#777;">
    You’re receiving this email because you signed up on the Ledgerly website.
    We’re currently in active development.
  </p>
</div>

            `;

      const mailOptions = {
        from: '"Ledgerly Team" <ledgerlysass@gmail.com>',
        to: email,
        subject: 'Welcome to Ledgerly Early Access',
        html: emailHtml,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);

    } catch (emailError) {
      console.error('Email sending failed, but subscriber was saved:', emailError);
      // We do NOT return an error here, because the subscription itself was successful.
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
