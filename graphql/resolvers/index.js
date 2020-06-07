//resolvers/index.js

const bcrypt = require('bcryptjs');

const { handle } = require('../../errorMaster');
const { List, Task }  = require('../../models/list');
const User = require('../../models/user');



async function createUser(args) {

  const userArgs = args.userInput;
  try {
    const hashedPass = await bcrypt.hash(userArgs.password, 12);
    const newUser = new User({
    
    
      userName: userArgs.userName,
      password: hashedPass,
      email: userArgs.email,
      creationDate: new Date(),
      lists: []
    });
    const result = await newUser.save();
    return { ...result._doc, password: null }
  }
  catch (err) {
    console.log(err);
    throw handle(err);
  }
}

async function createList(args) {

  const listArgs = args.listInput;
  try {
    const dupList = await List.findOne({
      title: listArgs.title,
      author: listArgs.author
    });
    if(dupList) {

      throw new Error('List with that title already exists.');
    }
    const newList = new List({
        
      title:  listArgs.title,
      description:  listArgs.description,
      author: listArgs.author,
      creationDate: new Date(),
      tasks: [],
      percentDone: null
    });

    const [listResult, findUserResult] = await Promise.all([
      newList.save(),
      User.findById(newList.author)
    ]);
    findUserResult.lists.push(newList._id);
    await findUserResult.save();
    return { ...listResult._doc };
  }
  catch (err) {
    console.log(err);
    throw handle(err);
  }
}

async function createTask(args) {

  try {
    const taskArgs = args.taskInput;
    const dupTask = await Task.findOne({
      title: taskArgs.title,
      author: taskArgs.author,
      owningList: taskArgs.owningList
    });
    if(dupTask) {

      throw new Error('Task with that title already exists.');
    }
    const newTask = new Task({

      title: taskArgs.title,
      description: taskArgs.description,
      author: taskArgs.author,
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
          return task.taskState === 'FINISHED'
      }).length;
    })
    findListResult.percentDone = 100 * (numCompTasks / owningListTasks.length);
    await findListResult.save();
    return { ...taskResult._doc };
  } 
  catch(err) {
    console.log(err);
    throw handle(err);
  }
}

module.exports = { 
  lists:() => {
    return List.find().populate('author tasks')
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
  users:() => {
    return User.find().populate('lists')
      .then(users => {
        return users.map(user => {
          return { ...user._doc };
        });
      });
  },
  createList: (args) => {
    return createList(args);
  },
  createTask: (args) => {
    return createTask(args);
  },
  createUser: (args) => {
    return createUser(args);
  }
}
