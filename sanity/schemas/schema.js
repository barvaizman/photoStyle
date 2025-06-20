// sanity/schemas/schema.js
import attraction from './documents/attraction'
import attractionFamily from './documents/attractionFamily'

export const schemaTypes = [attraction, attractionFamily]
export default {
  name: 'schema',
  title: 'Schema',
  type: 'document',
  fields: [
    {
      name: 'attraction',
      title: 'Attraction',
      type: 'reference',
      to: [{ type: 'attraction' }],
    },
    {
      name: 'attractionFamily',
      title: 'Attraction Family',
      type: 'reference',
      to: [{ type: 'attractionFamily' }],
    },
  ],
}