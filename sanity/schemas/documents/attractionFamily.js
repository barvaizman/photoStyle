// sanity/schemas/documents/attractionFamily.js
export default {
  name: 'attractionFamily',
  title: 'משפחת אטרקציות',
  type: 'document',
  fields: [
    { name: 'title', title: 'שם המשפחה', type: 'string' },
    {
      name: 'attractions',
      title: 'אטרקציות',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'attraction' }] }],
    },
  ],
}
