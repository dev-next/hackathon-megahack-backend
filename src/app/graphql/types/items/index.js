const { merge } = require('lodash');
const { typeDefs: itemObjectTypes } = require('./types');
const { resolvers: itemObjectTypesResolvers } = require('./types');
// const { typeDefs: itemObjectQueries } = require('./queries');
// const { resolvers: itemObjectQueriesResolvers } = require('./queries');
const { typeDefs: itemObjectMutations } = require('./mutations');
const { resolvers: itemObjectMutationsResolvers } = require('./mutations');

module.exports = {
  itemTypeDefs: [itemObjectTypes, /*itemObjectQueries,*/ itemObjectMutations],
  itemResolvers: merge(
    {},
    itemObjectTypesResolvers,
    // itemObjectQueriesResolvers,
    itemObjectMutationsResolvers,
  ),
};
