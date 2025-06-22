// schemas/eventPackage.js

export default {
  name: 'eventPackage',
  title: 'חבילת אירוע',
  type: 'document',
  fields: [
    { name: 'title', title: 'כותרת החבילה', type: 'string' },
    {
      name: 'slug',
      title: 'כתובת URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-א-ת]/g, '')
            .slice(0, 96),
      },
      validation: Rule => Rule.required().error('חובה להזין כתובת URL'),
    },
    {
      name: 'price',
      title: 'מחיר כולל',
      type: 'number',
    },
    {
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      options: { hotspot: true },
    },
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
        { type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'attractions',
      title: 'אטרקציות כלולות',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'attraction' }],
        },
      ],
    },
  ],
}
