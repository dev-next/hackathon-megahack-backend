const { merge } = require('lodash');
const { typeDefs: commonObjectTypes } = require('./types');
const { resolvers: commonObjectTypesResolvers } = require('./types');

module.exports = {
  commonTypeDefs: [commonObjectTypes],
  commonResolvers: merge(
    {},
    commonObjectTypesResolvers,
  ),
};
