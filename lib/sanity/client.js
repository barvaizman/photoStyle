import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'peolo2q1',     // ← החלף ב-ID שלך מסאניטי
  dataset: 'production',            // ← אלא אם אתה משתמש בדאטהסט אחר
  apiVersion: '2024-06-20',         // ← תאריך עדכני או של גרסת הסכמות
  useCdn: true,                    // ← true לביצועים טובים יותר
  token: process.env.SANITY_TOKEN, // אם יש token
});

// קליינט נוסף לכתיבה (אם צריך)
export const writeClient = createClient({
  projectId: 'peolo2q1',
  dataset: 'production',
  apiVersion: '2024-06-20',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});
