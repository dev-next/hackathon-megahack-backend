const { gql, AuthenticationError } = require('apollo-server-express');
const Authenticate = require('../../../domain/services/AuthenticateService');

const typeDefs = gql`
  extend type Query {
  """Query to authenticate User on Application"""
    authenticate(
      phone: String!
      password: String!
    ): Sign
  }
`;

const resolvers = {
  Query: {
    authenticate:  (
      root,
      data,
      {
        db: { UserPersistentModel, StorePersistentModel },
      },
    ) => Authenticate.user(data, {
      StorePersistentModel,
      UserPersistentModel,
      AuthenticationError,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
