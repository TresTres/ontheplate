//schema/inputs.js

const { 
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType,
} = require('graphql');

const { TaskStateEnum } = require('./enums');

const UserInput = new GraphQLInputObjectType({

	name: 'UserInput',
	fields: {

		userName: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: new GraphQLNonNull(GraphQLString) }
	}
});

const ListInput = new GraphQLInputObjectType({

	name: 'ListInput',
	fields: {
    
		title: { type: new GraphQLNonNull(GraphQLString) },
		description: { type: GraphQLString }
	}
});

const TaskInput = new GraphQLInputObjectType({

	name: 'TaskInput',
	fields: {

		title: { type: new GraphQLNonNull(GraphQLString) },
		description: { type: GraphQLString },
		taskState: { type: new GraphQLNonNull(TaskStateEnum) },
		owningList: { type: new GraphQLNonNull(GraphQLString) }
	}
});


module.exports = {
	UserInput,
	ListInput,
	TaskInput
};
