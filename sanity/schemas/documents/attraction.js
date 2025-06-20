// schemas/attraction.js

export default {
  name: 'attraction',
  title: 'אטרקציה',
  type: 'document',
  fields: [
    { name: 'title', title: 'כותרת', type: 'string' },
   {
  name: 'slug',
  title: 'כתובת URL (Slug)',
  type: 'slug',
  options: {
    source: 'title', // ← מבוסס על הכותרת
    slugify: input => 
      input
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // רווחים → מקפים
        .replace(/[^\w\-א-ת]/g, '')     // מסיר תווים לא תקינים פרט לעברית
        .slice(0, 96),
  },
  validation: Rule => Rule.required().error('חובה להזין כתובת URL'),
},
    { name: 'shortDescription', title: 'תיאור קצר', type: 'string' },
    {
      name: 'richDescription',
      title: 'תיאור עשיר ומעוצב',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'רגיל', value: 'normal' },
            { title: 'כותרת בינונית', value: 'h2' },
            { title: 'כותרת קטנה', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'מודגש', value: 'strong' },
              { title: 'נטוי', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'קישור',
                fields: [
                  { name: 'href', type: 'url', title: 'כתובת URL' },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'פתח בלשונית חדשה',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } }, // אופציונלי: תמונות בתוך התיאור
      ],
    },
    { name: 'price', title: 'מחיר', type: 'number' },
    {
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'gallery',
      title: 'גלריית תמונות',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'family',
      title: 'משפחת אטרקציות',
      type: 'reference',
      to: [{ type: 'attractionFamily' }],
      validation: Rule => Rule.required().error('חובה לבחור משפחת אטרקציות'),
    },
  ],
}
