const { gql, ForbiddenError } = require('apollo-server-express');
const FindSellers = require('../../../domain/use-cases/seller/find-sellers/FindSellers');
const FindSeller = require('../../../domain/use-cases/seller/find-sellers/FindSeller');

const typeDefs = gql`
  extend type Query {
  """Query to find all active sellers from application"""
    sellers(
      where: UserWhereInput
    ): [User]

    seller(
      sellerId: ID!
    ): User
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

    seller: (
      root,
      data,
      {
        db: { UserPersistentModel },
        UserLogged,
      },
    ) => FindSeller(data, {
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
