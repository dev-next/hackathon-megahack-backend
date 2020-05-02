const { merge, flatten } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-express');

const { userTypeDefs, userResolvers } = require('./types/user');
const { signTypeDefs, signResolvers } = require('./types/sign');
const { itemTypeDefs, itemResolvers } = require('./types/items');
const { storeTypeDefs, storeResolvers } = require('./types/store');
const { commonTypeDefs, commonResolvers } = require('./types/common');
const { sysActionTypeDefs, sysActionResolvers } = require('./types/sysAction');

// DEFAULT EMPTY ROOT TYPES
const RootTypes = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const rootTypeDefs = [RootTypes];

const typeDefs = flatten([
  rootTypeDefs,
  userTypeDefs,
  signTypeDefs,
  itemTypeDefs,
  storeTypeDefs,
  commonTypeDefs,
  sysActionTypeDefs,
]);
const resolvers = merge(
  {},
  userResolvers,
  signResolvers,
  itemResolvers,
  storeResolvers,
  commonResolvers,
  sysActionResolvers,
);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
