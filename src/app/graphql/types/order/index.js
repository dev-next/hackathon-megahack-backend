const { merge } = require('lodash');
const { typeDefs: orderObjectTypes } = require('./types');
const { resolvers: orderObjectTypesResolvers } = require('./types');
const { typeDefs: orderObjectQueries } = require('./queries');
const { resolvers: orderObjectQueriesResolvers } = require('./queries');
const { typeDefs: orderObjectMutations } = require('./mutations');
const { resolvers: orderObjectMutationsResolvers } = require('./mutations');

module.exports = {
  orderTypeDefs: [orderObjectTypes, orderObjectQueries, orderObjectMutations],
  orderResolvers: merge(
    {},
    orderObjectTypesResolvers,
    orderObjectQueriesResolvers,
    orderObjectMutationsResolvers,
  ),
};
