//resolvers/merge.js

const { handle } = require('../../errorMaster');

const User = require('../../models/user');
const { List, Task } = require('../../models/list');



const getUser =  async (userID) => {
  
	try {
    
		const user = await User.findById(userID);
		return repackUserDoc(user);
	} 
	catch(err) {

		console.log(err);
		throw handle(err);
	}
};

const getList = async (listID) => {
  
	try {
    
		const list = await List.findById(listID);
		return repackListDoc(list);
	}
	catch(err) {
    
		console.log(err);
		throw handle(err);
	}
};

const getLists = async (listIDs) => {
  
	try {
    
		const lists = await List.find({_id: { $in: listIDs }});
		return lists.map(list => repackListDoc(list));
	}
	catch(err) {
    
		console.log(err);
		throw handle(err);
	}
};

const getTasks = async (taskIDs) => {

	try {
    
		const tasks = await Task.find({_id: { $in: taskIDs }});
		return tasks.map(task => repackTaskDoc(task));
	}
	catch(err) {
    
		console.log(err);
		throw handle(err);
	}
};

const repackUserDoc = (user) => ({
	...user._doc, 
	password: null,
	creationDate: user._doc.creationDate.toISOString()
});

const repackListDoc = (list) => ({
	...list._doc, 
	creationDate: list._doc.creationDate.toISOString(),
	dueDate: list._doc.dueDate ? list._doc.dueDate.toISOString() : '',
	author: getUser.bind(this, list._doc.author),
	tasks: getTasks.bind(this, list._doc.tasks)
});

const repackTaskDoc = (task) => ({
	...task._doc,
	creationDate: task._doc.creationDate.toISOString(),
	author: getUser.bind(this, task._doc.author),
	owningList: getList.bind(this, task._doc.owningList)
});

module.exports = {
	getUser,
	getList,
	getLists,
	getTasks,
	repackListDoc,
	repackTaskDoc,
	repackUserDoc
};

