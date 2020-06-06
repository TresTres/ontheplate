//app.js

const express = require('express');
const bodyParser = require('body-parser');
const egql = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const { List, Task } = require('./models/list');

const app = express();

const tempLists = [];


app.use(bodyParser.json());


app.use('/api', egql({
  schema: buildSchema(`

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
      author: String!
      creationDate: String!
      taskState: TaskState!
    }

    input TaskInput {
      title: String!
      description: String
      author: String!
      taskState: TaskState!
      listID: ID!
    }


    type List {
      _id: ID!
      title: String!
      description: String
      author: String!
      creationDate: String
      tasks: [Task!]
      percentDone: Float
    }

    input ListInput {
      title: String!
      description: String
      author: String!
    }

    type RootQuery {
      lists: [List!]!
    }

    type RootMutation {
      createList(listInput: ListInput): List
      createTask(taskInput: TaskInput): Task
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: { 
    lists:() => {
      return List.find()
        .then(lists => {
          return lists.map(list => {
            return { ...list._doc };
          });
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    },
    createList: (args) => {

      const listArgs = args.listInput;
      const newList = new List({
      
        title:  listArgs.title,
        description:  listArgs.description,
        author: listArgs.author,
        creationDate: new Date(),
        tasks: [],
        percentDone: null
      });

      return newList.save()
        .then(result => {
          return { ...result._doc };
        })
        .catch(err => {
          console.log(err);
          throw err;
      });
    
    },
    createTask: (args) => {

      const taskArgs = args.taskInput;
      const owningList = tempLists.find(list => list._id === taskArgs.listID);
      
      const newTask = {
        _id: Math.random().toString(),
        title: taskArgs.title,
        description: taskArgs.description,
        author: taskArgs.author,
        creationDate: taskArgs.creationDate,
        taskState: taskArgs.taskState,
      };
      
      owningList.tasks.push(newTask);

      return newTask;
    }
  },  
  graphiql: true
}));


mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@otp-cluster-syomc.gcp.mongodb.net/` +
  `${process.env.MONGO_DB}?authSource=admin&retryWrites=true&w=majority`
  ).then(() => {
    app.listen(4000);
  }).catch((err) => {
    console.log(err);
  });





