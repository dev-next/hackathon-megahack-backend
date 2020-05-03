const { merge } = require('lodash');
const { typeDefs: nameObjectTypes } = require('./types');
const { resolvers: nameObjectTypesResolvers } = require('./types');
const { typeDefs: nameObjectQueries } = require('./queries');
const { resolvers: nameObjectQueriesResolvers } = require('./queries');
const { typeDefs: nameObjectMutations } = require('./mutations');
const { resolvers: nameObjectMutationsResolvers } = require('./mutations');

module.exports = {
  nameTypeDefs: [nameObjectTypes, nameObjectQueries, nameObjectMutations],
  nameResolvers: merge(
    {},
    nameObjectTypesResolvers,
    nameObjectQueriesResolvers,
    nameObjectMutationsResolvers,
  ),
};
