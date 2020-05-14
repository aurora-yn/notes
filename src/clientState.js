import { NOTE_FRAGMENT } from './fragments'
import { GET_NOTES } from './queries'
import { saveNote, restoreNotes } from './offline'

export const defaults = {
  notes: restoreNotes()
}

// How Schema looks using GraphQL since it supports kinds of server
export const typeDefs = [`
  extend schema {
    query: Query
    mutation: Mutation
  }
  extend type Query {
    notes: [Note]!
    note(id: Int!): Note
  }
  type Mutation {
    createNote(title: String!, content: String!): Note
    editNote(id: Int!, title: String!, content: String): Note
  }
  type Note {
    id: Int!
    title: String!
    content: String!
  }
`]

export const resolvers = {
  Query: {
    note: (_, variables, { cache }) => {
      const id = cache.config.dataIdFromObject({
        __typename: "Note", 
        id: variables.id
      })
      const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id })
      // console.log(id, note)
      return note
    }
  },
  Mutation: {
    createNote: (_, variables, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTES })
      const { title, content } = variables
      const newNote = {
        __typename: "Note",
        title,
        content,
        id: notes.length + 1
      }
      cache.writeData({
        data: {
          notes: [newNote, ...notes]
        }
      })
      // console.log('newNote:', newNote)
      saveNote(cache)
      return newNote
    },
    editNote: (_, { id, title, content }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note", 
        id
      })
      const note = cache.readFragment({ 
        fragment: NOTE_FRAGMENT, 
        id: noteId 
      })
      // console.log('note:', note)
      const updatedNote = {
        ...note,
        title,
        content
      }
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updatedNote
      })
      saveNote(cache)
      return updatedNote
    }
  }
}