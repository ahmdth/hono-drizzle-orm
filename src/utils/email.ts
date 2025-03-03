import { Resend } from 'resend';

const resend = new Resend('re_123456789');

export async function sendEmail(email: string, token: string) {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Email verification',
    html: `<a href="${token}">It works!</a>`,
  });
  if (error) {
    return console.error({ error });
  }
  console.log({ data });
}
