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

  type AuthData {
    userID: ID!
    token: String!
    tokenExpiration: Int!
  }

  enum Conjunction {
    AND
    OR
  }

  type Filter {
    _id: ID!
    title: String!
    author: User!
    conjunction: Conjunction
    groups: [FilterGroup!]!
    createdAt: String!
    updatedAt: String!
  }

  type FilterGroup {
    _id: ID!
    conjunction: Conjunction
    conditions: [FilterCondition!]!
  }

  enum Operator {
    EQUAL,
    NOT_EQUAL,
    SMALLER_THAN,
    SMALLER_THAN_OR_EQUAL,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL,
    IN,
    NOT_IN,
    LIKE,
    NOT_LIKE,
    BETWEEN,
    NOT_BETWEEN,
    IS_NULL,
    IS_NOT_NULL
  }

  type FilterCondition {
    _id: ID!
    operator: Operator!
    field: String!
    value: [String!]!
  }

  type RootQuery {
    lists: [List!]!
    users: [User!]!
    filters: [Filter!]!
    login(email: String!, password: String!): AuthData!
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
