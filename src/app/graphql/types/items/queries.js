const { gql } = require('apollo-server-express');
const FindItem = require('../../../domain/use-cases/user/find-items/FindItem');
const FindItems = require('../../../domain/use-cases/user/find-items/FindItems');

const typeDefs = gql`
  extend type Query {
    items(
      where: ItemWhereInput
    ): [Item]

    item(
      itemId: ID!
    ): Item
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

    item: (
      root,
      data,
      {
        db: { ItemPersistentModel },
        UserLogged,
      },
    ) => FindItem(data, {
      ItemPersistentModel,
      UserLogged,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
