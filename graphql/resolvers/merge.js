//resolvers/merge.js

const { handle } = require('../../errorMaster');

const User = require('../../models/user');
const { List, Task } = require('../../models/list');



export async function getUser(userID) {
  
  try {
    
    const user = await User.findById(userID);
    return { 
      ...user._doc, 
      password: null,
      creationDate: user._doc.creationDate.toISOString(),
      lists: getLists.bind(this, user._doc.lists)
    };
  } 
  catch(err) {

    console.log(err);
    throw handle(err);
  }
}

export async function getList(listID) {
  
  try {
    
    const list = await List.findById(listID);
    return { 
      ...list._doc,
      creationDate: list._doc.creationDate.toISOString(),
      author: getUser.bind(this, list._doc.author),
      tasks: getTasks.bind(this, list._doc.tasks)
    };
  }
  catch(err) {
    
    console.log(err);
    throw handle(err);
  }
}

export async function getLists(listIDs) {
  
  try {
    
    const lists = await List.find({_id: { $in: listIDs }});
    return lists.map(list => {  
      return { 
        ...list._doc,
        creationDate: list._doc.creationDate.toISOString(),
        author: getUser.bind(this, list._doc.author),
        tasks: getTasks.bind(this, list._doc.tasks)
      };
    });
  }
  catch(err) {
    
    console.log(err);
    throw handle(err);
  }
}

export async function getTasks(taskIDs) {

  try {
    
    const tasks = await Task.find({_id: { $in: taskIDs }});
    return tasks.map(task => {  
      return { 
        ...task._doc,
        creationDate: task._doc.creationDate.toISOString(),
        author: getUser.bind(this, task._doc.author),
        owningList: getList.bind(this, task._doc.owningList)
      };
    });
  }
  catch(err) {
    
    console.log(err);
    throw handle(err);
  }
}


