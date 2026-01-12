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
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'eventAction',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              options: {
                list: [
                  {title: 'Book table', value: 'Book table'},
                  {title: 'Get tickets', value: 'Get tickets'},
                  {title: 'Drop-in', value: 'Drop-in'},
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Use https://, http://, or just an email address.',
              validation: (rule) =>
                rule.custom((value) => {
                  if (!value) {
                    return true
                  }
                  const trimmed = String(value).trim()
                  if (trimmed.startsWith('mailto:')) {
                    return true
                  }
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  if (emailPattern.test(trimmed)) {
                    return true
                  }
                  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
                    return true
                  }
                  return 'Enter a valid URL or email address.'
                }),
            },
          ],
        },
      ],
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
