//resolvers/lists.js

const { handle } = require('../../errorMaster');
const { List, Task }  = require('../../models/list');
const User = require('../../models/user');

const { repackListDoc, repackTaskDoc } = require('./merge');

const createList = async (args, req) => {

	const listArgs = args.listInput;
	try {

		if(!req.isAuth) {
			
			throw new Error('Unauthenticated');
		}
		const dupList = await List.findOne({
			title: listArgs.title,
			author: req.userID
		});
		if(dupList) {

			throw new Error('List with that title already exists.');
		}
		const newList = new List({

			title:  listArgs.title,
			description:  listArgs.description,
			author: req.userID,
			creationDate: new Date(),
			...(listArgs.dueDate) && { dueDate: new Date(listArgs.dueDate) },
			tasks: [],
			percentDone: null
		});
		const [listResult, findUserResult] = await Promise.all([
			newList.save(),
			User.findById(req.userID)
		]);
		findUserResult.lists.push(newList._id);
		await findUserResult.save();
		return repackListDoc(listResult);
	}
	catch (err) {
    
		console.log(err);
		throw handle(err);
	}
}

const createTask = async (args, req) => {

	try {

		if(!req.isAuth) {
			
			throw new Error('Unauthenticated');
		}
		const taskArgs = args.taskInput;
		const dupTask = await Task.findOne({
			title: taskArgs.title,
			author: req.userID,
			owningList: taskArgs.owningList
		});
		if(dupTask) {

			throw new Error('Task with that title already exists.');
		}
		const newTask = new Task({

			title: taskArgs.title,
			description: taskArgs.description,
			author: req.userID,
			creationDate: new Date(),
			owningList: taskArgs.owningList,
			taskState: taskArgs.taskState,
		});

		const [taskResult, findListResult] = await Promise.all([
			newTask.save(),
			List.findById(newTask.owningList)
		]);
		const owningListTasks = findListResult.tasks;
		owningListTasks.push(newTask._id);
    
		const numCompTasks = await Task.find({
			_id: { $in: owningListTasks }
		}).then((refTasks) => {

			return refTasks.filter(
				(task) => {
					return task.taskState === 'FINISHED';
				}).length;
		});
		findListResult.percentDone = 100 * (numCompTasks / owningListTasks.length);
		await findListResult.save();
		return repackTaskDoc(taskResult);
	} 
	catch(err) {
    
		console.log(err);
		throw handle(err);
	}
}

const getListsAll = async () => {

	try {

		const lists = await List.find();
		return lists.map((list) => repackListDoc(list));
	}
	catch(err) {
    
		console.log(err);
		throw handle(err);
	}
}


module.exports = {

	lists:() => {
		return getListsAll();
	},
  
	createTask: (args, req) => {
		return createTask(args, req);
	},

	createList: (args, req) => {
		return createList(args, req);
	}
};
