export default {
  name: 'additionalService',
  title: 'שירות נוסף',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'כותרת השירות',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'תיאור קצר',
      type: 'text',
      validation: Rule => Rule.max(200)
    },
    {
      name: 'richDescription',
      title: 'תיאור מפורט',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'כותרת ראשית', value: 'h1'},
            {title: 'כותרת משנה', value: 'h2'},
            {title: 'כותרת שלישית', value: 'h3'},
            {title: 'פסקה רגילה', value: 'normal'}
          ],
          marks: {
            decorators: [
              {title: 'מודגש', value: 'strong'},
              {title: 'נטוי', value: 'em'},
              {title: 'קו תחתון', value: 'underline'}
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'גלריית תמונות',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'price',
      title: 'מחיר',
      type: 'number',
      description: 'מחיר השירות בשקלים'
    },
    {
      name: 'isActive',
      title: 'פעיל',
      type: 'boolean',
      initialValue: true,
      description: 'האם השירות פעיל ומוצג באתר'
    },
    {
      name: 'order',
      title: 'סדר הצגה',
      type: 'number',
      description: 'סדר הצגת השירות ברשימה (מספר נמוך יותר = מוצג קודם)',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      price: 'price'
    },
    prepare(selection) {
      const {title, media, price} = selection
      return {
        title: title,
        subtitle: price ? `₪${price}` : 'ללא מחיר',
        media: media
      }
    }
  }
} 