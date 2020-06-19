//user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({

	userName: {
    
		type: String,
		required: true,
		unique: true
	},
	password: {

		type: String, 
		required: true
	},
	email: {

		type: String,
		required: true,
		unique: true
	},
	creationDate: {

		type: Date,
		required: true
	},
	lists: {

		type: [{

			type: Schema.Types.ObjectId,
			ref: 'List'
		}],
		required: false
	}
});

module.exports = mongoose.model('User', UserSchema);
