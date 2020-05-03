const { merge } = require('lodash');
const { typeDefs: commonObjectTypes } = require('./types');
const { resolvers: commonObjectTypesResolvers } = require('./types');
const { typeDefs: commonObjectMutations } = require('./mutations');
const { resolvers: commonObjectMutationsResolvers } = require('./mutations');

module.exports = {
  commonTypeDefs: [commonObjectTypes, commonObjectMutations],
  commonResolvers: merge(
    {},
    commonObjectTypesResolvers,
    commonObjectMutationsResolvers
  ),
};
