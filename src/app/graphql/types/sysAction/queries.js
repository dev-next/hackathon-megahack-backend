const {gql} = require('apollo-server-express');
const ValidateHashCode = require('../../../domain/use-cases/sysAction/validate-hashcode/ValidateHashCode');

const typeDefs = gql`
  extend type Query {
    validateHashcode(hash: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    validateHashcode: async (
      root,
      data,
      { mongo: { SysActionPersistentModel } }
    ) => ValidateHashCode(data, { SysActionPersistentModel }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
