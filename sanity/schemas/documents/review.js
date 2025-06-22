export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Customer Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5)
    },
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'חתונה', value: 'חתונה'},
          {title: 'בר מצווה', value: 'בר מצווה'},
          {title: 'בת מצווה', value: 'בת מצווה'},
          {title: 'אירוע חברה', value: 'אירוע חברה'},
          {title: 'יום הולדת', value: 'יום הולדת'},
          {title: 'אחר', value: 'אחר'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'review',
      title: 'Review Text',
      type: 'text',
      validation: Rule => Rule.required().max(500)
    },
    {
      name: 'date',
      title: 'Review Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Show this review prominently'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'eventType',
      media: 'image'
    }
  }
} 