//list.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    enum: [
      'NOT_STARTED',
      'IN_PROGRESS',
      'ABANDONED',
      'FINISHED'
    ]
  }
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
