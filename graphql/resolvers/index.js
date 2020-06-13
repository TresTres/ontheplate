//resolvers/index.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { handle } = require('../../errorMaster');
const { List, Task }  = require('../../models/list');
const User = require('../../models/user');
const { Filter, FilterGroup, FilterCondition } = require('../../models/filter');

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
    const userResult = await newUser.save();
    return { 
      ...userResult._doc, 
      password: null,
      creationDate: userResult._doc.creationDate.toISOString()
    }
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
    return { 
      ...listResult._doc,
      creationDate: listResult._doc.creationDate.toISOString(),
      author: user.bind(this, listResult._doc.author)
    };
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
    return { 
      ...taskResult._doc,
      creationDate: taskResult._doc.creationDate.toISOString(),
      author: user.bind(this, taskResult._doc.author),
      owningList: list.bind(this, taskResult._doc.owningList)
    };
  } 
  catch(err) {
    
    console.log(err);
    throw handle(err);
  }
}

async function login({ email, password }) {
  
  try {
  
    const user = await User.findOne({ email: email });
    if (!user) {
      
      throw new Error('User does not exist!');
    }
    const passwordFound = await bcrypt.compare(password, user.password);
    if(!passwordFound) {

      throw new Error('Incorrect password!');
    }
    const token = jwt.sign(
      {  userID: user._id, email: user.email }, 
      `${process.env.JWT_SECRET}`,
      { expiresIn: '1h' }
    );
    return { userID: user._id, token: token, tokenExpiration: 1 };

  } 
  catch(err) {
    
    console.log(err);
    throw handle(err);
  }
}

async function user(userID) {
  
  try {
    
    const user = await User.findById(userID);
    return { 
      ...user._doc, 
      password: null,
      creationDate: user._doc.creationDate.toISOString(),
      lists: lists.bind(this, user._doc.lists)
    };
  } 
  catch(err) {

    console.log(err);
    throw handle(err);
  }
}


async function list(listID) {
  
  try {
    
    const list = await List.findById(listID);
    return { 
      ...list._doc,
      creationDate: list._doc.creationDate.toISOString(),
      author: user.bind(this, list._doc.author),
      tasks: tasks.bind(this, list._doc.tasks)
    };
  }
  catch(err) {
    
    console.log(err);
    throw handle(err);
  }
}

async function lists(listIDs) {
  
  try {
    
    const lists = await List.find({_id: { $in: listIDs }});
    return lists.map(list => {  
      return { 
        ...list._doc,
        creationDate: list._doc.creationDate.toISOString(),
        author: user.bind(this, list._doc.author),
        tasks: tasks.bind(this, list._doc.tasks)
      };
    });
  }
  catch(err) {
    
    console.log(err);
    throw handle(err);
  }
}

async function tasks(taskIDs) {

  try {
    
    const tasks = await Task.find({_id: { $in: taskIDs }});
    return tasks.map(task => {  
      return { 
        ...task._doc,
        creationDate: task._doc.creationDate.toISOString(),
        author: user.bind(this, task._doc.author),
        owningList: list.bind(this, task._doc.owningList)
      };
    });
  }
  catch(err) {
    
    console.log(err);
    throw handle(err);
  }
}


module.exports = { 
  lists:() => {
    return List.find()
      .then(lists => {
        return lists.map(list => {
          return { 
            ...list._doc, 
            creationDate: list._doc.creationDate.toISOString(),
            author: user.bind(this, list._doc.author),
            tasks: tasks.bind(this, lists._doc.tasks)
          };
        });
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  users:() => {
    return User.find()
      .then(users => {
        return users.map(user => {
          return { 
            ...user._doc,
            creationDate: user._doc.creationDate.toISOString(),
            lists: lists.bind(this, user._doc.lists)
          };
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
  },
  login: (args) => {
    return login(args);
  }
}
