const { gql, ForbiddenError } = require('apollo-server-express');
const FindUsers = require('../../../domain/use-cases/seller/find-sellers/FindSellers');

const typeDefs = gql`
  extend type Query {
  """Query to find all active sellers from application"""
    sellers(
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
