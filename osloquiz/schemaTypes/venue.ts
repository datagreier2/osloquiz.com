import {defineField, defineType} from 'sanity'

export const venue = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps Share URL',
      type: 'url',
      description: 'Paste the share link from Google Maps.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'bookTableUrl',
      title: 'Book Table URL',
      type: 'url',
      description: 'Default link for “Book table” actions.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https', 'mailto'],
        }),
    }),
    defineField({
      name: 'ticketsUrl',
      title: 'Buy Tickets URL',
      type: 'url',
      description: 'Default link for “Buy tickets” actions.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https', 'mailto'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
})
