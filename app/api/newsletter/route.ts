import MailerLite from '@mailerlite/mailerlite-nodejs';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, vorname, name } = await req.json();

    // Validate email
    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    if (!process.env.MAILERLITE_API_KEY) {
      return NextResponse.json({ error: 'Key is required.' }, { status: 400 });
    }

    const mailerlite = new MailerLite({
      api_key: process.env.MAILERLITE_API_KEY,
    });

    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

    const params: {
      email: string;
      fields: { name: string; last_name: string };
      groups: string[];
      status: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
      subscribed_at: string;

    } = {
      email,
      fields: {
        name: vorname,
        last_name: name,
      },
      groups: ['139744295996360607'],
      status: 'active', // Direct literal without casting
      subscribed_at: formattedDate
    };

    await mailerlite.subscribers
      .createOrUpdate(params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) console.log(error.response.data);
      });

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
