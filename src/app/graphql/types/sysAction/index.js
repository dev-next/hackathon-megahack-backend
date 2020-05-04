const { merge } = require('lodash');
const { typeDefs: sysActionObjectTypes } = require('./types');
const { resolvers: sysActionObjectTypesResolvers } = require('./types');
const { typeDefs: sysActionObjectQueries } = require('./queries');
const { resolvers: sysActionObjectQueriesResolvers } = require('./queries');
const { typeDefs: sysActionObjectMutations } = require('./mutations');
const { resolvers: sysActionObjectMutationsResolvers } = require('./mutations');

module.exports = {
  sysActionTypeDefs: [sysActionObjectTypes, sysActionObjectQueries, sysActionObjectMutations],
  sysActionResolvers: merge(
    {},
    sysActionObjectTypesResolvers,
    sysActionObjectQueriesResolvers,
    sysActionObjectMutationsResolvers,
  ),
};
