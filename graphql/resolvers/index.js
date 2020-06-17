//resolvers/index.js

const userResolver = require('./users');
const listResolver = require('./lists');


const rootResolver = {

  ...userResolver,
  ...listResolver
};

module.exports = rootResolver;

