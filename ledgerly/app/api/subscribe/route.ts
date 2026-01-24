import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { DataStore, Subscriber } from '@/lib/storage';

const resend = new Resend(process.env.RESEND_API_KEY);
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

        // 4. Send Confirmation Email via Resend
        console.log('Attempting to send email to:', email);
        const emailResult = await resend.emails.send({
            from: 'Ledgerly Team <onboarding@resend.dev>', // Resend default domain
            to: email,
            replyTo: 'yashbondre04@gmail.com', // Placeholder
            subject: 'Welcome to Ledgerly Early Access',
            html: `
                <div style="font-family: sans-serif; color: #333; line-height: 1.5;">
                    <h2>Thank you for joining Ledgerly!</h2>
                    <p>Hi there,</p>
                    <p>Thanks for signing up for early access. We're building Ledgerly to help founders track every subscription and recurring cost in one clear view—without the finance headaches.</p>
                    <p>Since we are in the early stages, your feedback is incredibly valuable to us. We'd love to hear your thoughts on what matters most to you.</p>
                    <p>
                        <a href="${SURVEY_LINK}" style="background-color: #1E3A8A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Take our 2-minute survey</a>
                    </p>
                    <p>(Or click here: <a href="${SURVEY_LINK}">${SURVEY_LINK}</a>)</p>
                    <p>As an early supporter, you've been marked as eligible for special rewards (like 1 month of Pro) when we launch.</p>
                    <p>Cheers,<br>The Ledgerly Team</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #888;">You received this because you signed up on our website. We are currently in active development.</p>
                </div>
            `
        });
        console.log('Resend API Response:', JSON.stringify(emailResult, null, 2));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
