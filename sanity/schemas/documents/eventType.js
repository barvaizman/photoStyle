export default {
  name: 'eventType',
  title: 'Event Type',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Event Type Name',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'חתונות', value: 'חתונות'},
          {title: 'בר מצווה', value: 'בר מצווה'},
          {title: 'בת מצווה', value: 'בת מצווה'},
          {title: 'אירועי חברה', value: 'אירועי חברה'},
          {title: 'יום הולדת', value: 'יום הולדת'},
          {title: 'אחר', value: 'אחר'}
        ]
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'attractions',
      title: 'Attractions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'attraction'}]
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'specializations',
      title: 'Our Specializations',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of our specializations for this event type'
    },
    {
      name: 'advantages',
      title: 'Our Advantages',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of our advantages for this event type'
    },
    {
      name: 'experience',
      title: 'Our Experience',
      type: 'text',
      description: 'Description of our experience with this event type'
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string'
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'heroImage'
    }
  }
} 