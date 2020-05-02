const { gql } = require('apollo-server-express');
const InvalidateHashCode = require('../../../domain/use-cases/sysAction/invalidate-hash-code/InvalidateHashCode');

const typeDefs = gql`
  extend type Mutation {
    invalidateHashCode(hash: String!, requester: ID!): SysAction
  }
`;

const resolvers = {
  Mutation: {
    invalidateHashCode: (
      root,
      data,
      { mongo: { SysActionPersistentModel } },
    ) => InvalidateHashCode(
      data,
      {
        SysActionPersistentModel,
      },
    ),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
