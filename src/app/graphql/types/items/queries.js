const { gql } = require('apollo-server-express');
const FindItem = require('../../../domain/use-cases/user/find-item/FindItem');
const FindItems = require('../../../domain/use-cases/user/find-item/FindItems');

const typeDefs = gql`
  extend type Query {
    items(
      where: ItemWhereInput
    ): [Item]

    item(
      itemId: ID!
    ): Item

    tags: [String]
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

    tags: (
      root,
      data,
      {
        db: { ItemPersistentModel },
      },
    ) => ItemPersistentModel.find().distinct('tags'),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
