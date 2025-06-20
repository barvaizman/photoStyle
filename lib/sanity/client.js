import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'peolo2q1',     // ← החלף ב-ID שלך מסאניטי
  dataset: 'production',            // ← אלא אם אתה משתמש בדאטהסט אחר
  apiVersion: '2024-06-20',         // ← תאריך עדכני או של גרסת הסכמות
  useCdn: false,                    // ← false כדי לוודא שאתה מקבל מידע חי
});
