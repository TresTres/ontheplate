//filter.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  query:  {
    type: Map,
    of: String,
    required: true
  }
}, { timestamps: true});

module.exports = mongoose.model('FilterSchema', FilterSchema);
