const { gql } = require('apollo-server-express');
const FindItems = require('../../../domain/use-cases/user/find-items/FindItems');

const typeDefs = gql`
  extend type Query {
    items(
      where: ItemWhereInput
    ): [Item]
  }
`;

const resolvers = {
  Query: {
    items: (
      root,
      data,
      {
        db: { ItemPersistentModel },
        UserLogged,
      },
    ) => FindItems(data, {
      ItemPersistentModel,
      UserLogged,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
