const { merge } = require('lodash');
const { typeDefs: catalogueObjectTypes } = require('./types');
const { resolvers: catalogueObjectTypesResolvers } = require('./types');
const { typeDefs: catalogueObjectQueries } = require('./queries');
const { resolvers: catalogueObjectQueriesResolvers } = require('./queries');
const { typeDefs: catalogueObjectMutations } = require('./mutations');
const { resolvers: catalogueObjectMutationsResolvers } = require('./mutations');

module.exports = {
  catalogueTypeDefs: [catalogueObjectTypes, catalogueObjectQueries, catalogueObjectMutations],
  catalogueResolvers: merge(
    {},
    catalogueObjectTypesResolvers,
    catalogueObjectQueriesResolvers,
    catalogueObjectMutationsResolvers,
  ),
};
