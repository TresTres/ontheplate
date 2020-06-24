//schema/enums.js

const { GraphQLEnumType } = require('graphql');

const TaskStateEnum = new GraphQLEnumType({

	name: 'TaskState',
	values: {
    
		NOT_STARTED: { value: 0 },
		IN_PROGRESS: { value: 1 },
		ABANDONED: { value: 2 },
		FINISHED: { value: 3 }
	}
});

module.exports = {

	TaskStateEnum
};
