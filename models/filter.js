//filter.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Conjunctions = [
  'AND',
  'OR'
];

const Operators = [
  'EQUAL',
  'NOT_EQUAL',
  'SMALLER_THAN',
  'SMALLER_THAN_OR_EQUAL',
  'GREATER_THAN',
  'GRETER_THAN_OR_EQUAL',
  'IN',
  'NOT_IN',
  'LIKE',
  'NOT_LIKE',
  'BETWEEN',
  'NOT_BETWEEN',
  'IS_NULL',
  'IS_NOT_NULL'
];


const FilterSchema = new Schema({
  
  title: {

    type: String, 
    required: true
  },
  author: {
    
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conjunction: {

    type: String,
    required: false,
    enum: Conjunctions
  },
  groups: {
    
    type: [{
      
      type: Schema.Types.ObjectId,
      ref: 'FilterGroup'
    }],
    required: true
  }
},
{ timestamps: true });

const FilterGroupSchema = new Schema({

  conjunction: {
    
    type: String,
    required: false,
    enum: Conjunctions
  },
  conditions: {

    type: [{

      type: Schema.Types.ObjectId,
      ref: 'FilterCondition'
    }],
    required: true
  }
});

const FilterConditionSchema = new Schema({

  operator: {
    
    type: String,
    required: true, 
    enum: Operators
  },
  field: {
    
    type: String,
    required: true
  },
  value: {

    type: [{

      type: String,
      required: true
    }],
    required: true
  }
});


module.exports = {
  
  Filter: mongoose.model('Filter', FilterSchema),
  FilterGroup: mongoose.model('FilterGroup', FilterGroupSchema),
  FilterCondition: mongoose.model('FilterCondition', FilterConditionSchema)
};
  
