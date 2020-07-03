//list.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskStates =  [
	'NOT_STARTED',
	'IN_PROGRESS',
	'ABANDONED',
	'FINISHED'
];


const TaskSchema = new Schema({

	title: {

		type: String,
		required: true
	},
	description: {

		type: String,
		required: false
	},
	creationDate: {
    
		type: Date,
		required: true
	},
	dueDate: {
		type: Date, 
		required: false
	},
	author: {
    
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	owningList: {
    
		type: Schema.Types.ObjectId,
		ref: 'List',
		required: true
	},
	taskState: {

		type: String,
		required: true,
		enum: TaskStates }
});

const ListSchema = new Schema({

	title: {  
    
		type: String,
		required: true
	},
	description: {
    
		type: String,
		required: false
	},
	author: {

		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	creationDate: {

		type: Date,
		required: true
	},
	dueDate: {
		type: Date, 
		required: false
	},
	tasks: {

		type: [{

			type: Schema.Types.ObjectId,
			ref: 'Task',
		}],
		required: false
	},
	percentDone: {

		type: Number,
		required: false
	}

});



module.exports = {
  
	List: mongoose.model('List', ListSchema),
	Task: mongoose.model('Task', TaskSchema)
};
