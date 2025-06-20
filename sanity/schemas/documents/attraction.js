// schemas/attraction.js

export default {
  name: 'attraction',
  title: 'אטרקציה',
  type: 'document',
  fields: [
    { name: 'title', title: 'כותרת', type: 'string' },
    { name: 'shortDescription', title: 'תיאור קצר', type: 'string' },
    { name: 'longDescription', title: 'תיאור ארוך', type: 'text' },
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
