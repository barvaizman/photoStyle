// schemas/popularAttractions.js

export default {
  name: 'popularAttractions',
  title: 'אטרקציות פופולריות',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'שם רשימה (פנימי בלבד)',
      type: 'string'
    },
    {
      name: 'attractions',
      title: 'אטרקציות',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'attraction' }]
        }
      ]
    }
  ]
}
