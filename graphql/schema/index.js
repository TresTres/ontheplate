//schema/index.js

const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  enum TaskState {
    NOT_STARTED
    IN_PROGRESS
    ABANDONED
    FINISHED
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    author: User!
    owningList: List!
    creationDate: String!
    taskState: TaskState!
  }

  input TaskInput {
    title: String!
    description: String
    author: String!
    taskState: TaskState!
    owningList: String!
  }

  type List {
    _id: ID!
    title: String!
    description: String
    author: User!
    creationDate: String
    tasks: [Task!]
    percentDone: Float
  }

  input ListInput {
    title: String!
    description: String
    author: String!
  }

  type User {
    _id: ID!
    userName: String!
    password: String
    email: String!
    creationDate: String
    lists: [List!]
  }

  input UserInput {
    userName: String!
    password: String!
    email: String!
  }

  type RootQuery {
    lists: [List!]!
    users: [User!]!
  }

  type RootMutation {
    createList(listInput: ListInput): List
    createTask(taskInput: TaskInput): Task
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
