//schema/index.js

const { 
	GraphQLObjectType,
	GraphQLID,
	GraphQLInt,
	GraphQLFloat,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
} = require('graphql');


const { TaskStateEnum } = require('./enums');
const { 
	TaskInput,
	ListInput,
	UserInput
} = require('./inputs');


const UserType = new GraphQLObjectType({

	name: 'User',
	fields: () => ({
		_id: { type: new GraphQLNonNull(GraphQLID) },
		userName: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: GraphQLString },
		email: { type: new GraphQLNonNull(GraphQLString) },
		creationDate: {type: new GraphQLNonNull(GraphQLString) },
		lists: { type: new GraphQLNonNull(
			new GraphQLList(
				new GraphQLNonNull(
					ListType
				)
			)
		)}
	})
});

const ListType = new GraphQLObjectType({

	name: 'List',
	fields: () => ({

		_id: { type: new GraphQLNonNull(GraphQLID) },
		title: { type: new GraphQLNonNull(GraphQLString) },
		description: { type: GraphQLString },
		author: { type: new GraphQLNonNull(UserType) },
		creationDate: { type: new GraphQLNonNull(GraphQLString) },
		tasks: { type: new GraphQLNonNull(
			new GraphQLList(
				new GraphQLNonNull(
					TaskType
				)
			)
		)},
		percentDone: { type: GraphQLFloat }
	})
});

const TaskType = new GraphQLObjectType({
  
	name: 'Task',
	fields: () => {
		
		const taskFields = {
			_id: { type: new GraphQLNonNull(GraphQLID) },
			title: { type: new GraphQLNonNull(GraphQLString) },
			description: { type: GraphQLString },
			author: { type: new GraphQLNonNull(UserType) },
			owningList: { type: new GraphQLNonNull(ListType) },
			creationDate: { type: new GraphQLNonNull(GraphQLString) },
			taskState: { type: new GraphQLNonNull(TaskStateEnum) }
		};

		return taskFields;
	}
});

const AuthDataType = new GraphQLObjectType({

	name: 'AuthData',
	fields: {
		
		userID: { type: new GraphQLNonNull(GraphQLID) },
		token: { type: new GraphQLNonNull(GraphQLString) },
		tokenExpiration: { type: new GraphQLNonNull(GraphQLInt) }
	}
});

const RootQueryType = new GraphQLObjectType({

	name: 'RootQuery',
	fields: {

		lists: { type: new GraphQLNonNull(
			new GraphQLList(
				new GraphQLNonNull(
					ListType
				)
			)
		)},
		users: { type: new GraphQLNonNull(
			new GraphQLList(
				new GraphQLNonNull(
					UserType
				)
			)
		)},
		login: {
			
			type: new GraphQLNonNull(AuthDataType),
			args: {
				
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
			}
		}
	}
});


const RootMutationType = new GraphQLObjectType({

	name: 'RootMutation',
	fields: {

		createTask: {
			
			type: TaskType,
			args: {

				taskInput: {
					
					name: 'taskInput',
					type: new GraphQLNonNull(TaskInput)
				}
			}
		},
		createList: {
			
			type: ListType,
			args: {
				
				listInput: {

					name: 'listInput',
					type: new GraphQLNonNull(ListInput)
				}
			}
		},
		createUser: {
			
			type: UserType,
			args: {
				
				userInput: {

					name: 'userInput',
					type: new GraphQLNonNull(UserInput)
				}
			}
		}
	}
});


module.exports = new GraphQLSchema({

	query: RootQueryType,
	mutation: RootMutationType
});
