const { gql, ForbiddenError } = require('apollo-server-express');
const FindUsers = require('../../../domain/use-cases/user/find-user/FindUsers');

const typeDefs = gql`
  extend type Query {
  """Query to find all active uses from application"""
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users:  (
      root,
      data,
      {
        db: { UserPersistentModel },
        UserLogged,
        Logger,
      },
    ) => FindUsers(data, {
      UserPersistentModel,
      ForbiddenError,
      UserLogged,
      Logger,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
