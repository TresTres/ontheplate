//app.js

const express = require('express');
const bodyParser = require('body-parser');
const egql = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const tempLists = [];


app.use(bodyParser.json());


app.use('/api', egql({
  schema: buildSchema(`
    
    type List {
      _id: ID!
      title: String!
      description: String
      author: String!
      creationDate: String!
      size: Int!
    }


    input ListInput {
      title: String!
      description: String
      author: String!
      creationDate: String!
      size: Int!
    }

    type RootQuery {
      lists: [List!]!
    }

    type RootMutation {
      createList(listInput: ListInput): List
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: { 
    lists:() => {
      return tempLists;
    },
    createList: (args) => {


      
      const listArgs = args.listInput;
      const newList = {
        _id: Math.random().toString(),
        title:  listArgs.title,
        description:  listArgs.description,
        author: listArgs.author,
        creationDate: listArgs.creationDate,
        size: +listArgs.size
      };

      tempLists.push(newList);

      return newList;
    }
  },  
  graphiql: true
}));


app.listen(4000);

