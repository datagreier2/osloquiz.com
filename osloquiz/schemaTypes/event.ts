import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Calendar Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Use 24-hour format, e.g. 19:00.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Details',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{type: 'venue'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      time: 'time',
      venue: 'venue.title',
    },
    prepare({title, date, time, venue}) {
      const parts = [date, time].filter(Boolean).join(' · ')
      const subtitle = [parts, venue].filter(Boolean).join(' — ')
      return {
        title,
        subtitle,
      }
    },
  },
})
