//schema/index.js

const { buildSchema } = require('graphql');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql');



const TaskStateEnum = new GraphQLEnumType({

  name: 'TaskState',
  values: {
    
    NOT_STARTED: { value: 0 },
    IN_PROGRESS: { value: 1 },
    ABANDONED: { value: 2 },
    FINISHED: { value: 3 }
  }
});

const TaskType = new GraphQLObjectType({
  
  name: 'Task',
  fields: {

    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    author: { type: new GraphQLNonNull(UserType) },
    owningList: { type: new GraphQLNonNull(ListType) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
    taskState: { type: new GraphQLNonNull(TaskStateEnum) }
  }
});

const TaskInput = new GraphQLObjectType({

  name: 'TaskInput',
  fields: {

    title: { type: new GraphQLNonNull(GraphQLString) },
    description: type { type: GraphQLString },
    author: { type: new GraphQLNonNull(UserType) },
    taskState: { type: new GraphQLNonNull(TaskStateEnum) },
    owningList: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const ListType = new GraphQLObjectType({

  name: 'List',
  fields: {

    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GrapqhQLString) },

  }
})


