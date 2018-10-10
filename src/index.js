const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
  info: String!
  todos: [Todo!]!
}

type Mutation {
  createTodo(title: String!): Todo!
}

type Todo {
  id: ID!
  title: String!
  completed: Boolean!
}
`

let todos = [
  {
    id: 'todo1',
    title: '買い物に行く',
    completed: true,
  },
  {
    id: 'todo2',
    title: 'GraphQLの勉強',
    completed: false,
  },
]

let todosCount = todos.length

const resolvers = {
  Query: {
    info: () => 'hoge',
    todos: () => todos,
  },

  Mutation: {
    createTodo: (root, args) => {
      const todo = {
        id: `todo${todosCount + 1}`,
        title: args.title,
        completed: false,
      }
      todos.push(todo)
      return todo
    },
  },

  Todo: {
    id: (root) => root.id,
    title: (root) => root.title,
    completed: (root) => root.completed,
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log('Server is running on http://localhost:4000'))
