const { gql, ForbiddenError } = require('apollo-server-express');
const FindSellers = require('../../../domain/use-cases/seller/find-sellers/FindSellers');
const FindUsers = require('../../../domain/use-cases/user/find-user/FindUsers');
const FindUser = require('../../../domain/use-cases/user/find-user/FindUser');

const typeDefs = gql`
  extend type Query {
  """Query to find all active sellers from application"""
    sellers(
      where: UserWhereInput
    ): [User]

    user(
      userId: ID!
    ): User

    users(
      where: UserWhereInput
    ): [User]
  }
`;

const resolvers = {
  Query: {
    sellers: (
      root,
      data,
      {
        db: { UserPersistentModel },
        UserLogged,
      },
    ) => FindSellers(data, {
      UserPersistentModel,
      ForbiddenError,
      UserLogged,
    }),

    user: (
      root,
      data,
      {
        db: { UserPersistentModel },
        UserLogged,
      },
    ) => FindUser(data, {
      UserPersistentModel,
      ForbiddenError,
      UserLogged,
    }),

    users: (
      root,
      data,
      {
        db: { UserPersistentModel },
        UserLogged,
      },
    ) => FindUsers(data, {
      UserPersistentModel,
      ForbiddenError,
      UserLogged,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
