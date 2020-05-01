const { merge } = require('lodash');
const { typeDefs: storeObjectTypes } = require('./types');
const { resolvers: storeObjectTypesResolvers } = require('./types');
// const { typeDefs: storeObjectQueries } = require('./queries');
// const { resolvers: storeObjectQueriesResolvers } = require('./queries');
// const { typeDefs: storeObjectMutations } = require('./mutations');
// const { resolvers: storeObjectMutationsResolvers } = require('./mutations');

module.exports = {
  storeTypeDefs: [storeObjectTypes, /*storeObjectQueries, storeObjectMutations*/],
  storeResolvers: merge(
    {},
    storeObjectTypesResolvers,
    // storeObjectQueriesResolvers,
    // storeObjectMutationsResolvers,
  ),
};
