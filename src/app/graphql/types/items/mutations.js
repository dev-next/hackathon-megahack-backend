const { gql } = require('apollo-server-express');
const CreateItem = require('../../../domain/use-cases/user/create-item/CreateItem');

const typeDefs = gql`
  extend type Mutation {
    createItem(
      item: ItemInput!
      store: ID!
      createdBy: ID!
    ): Item
  }
`;

const resolvers = {
  Mutation: {
    createItem: (
      root,
      data,
      {
        db: { ItemPersistentModel },
      },
    ) => {
      if (!data.item || !data.store || !data.createdBy) {
        throw new UserInputError('Dados inválidos', {
          invalidArgs: ['item', 'loja'],
        });
      }

      return CreateItem(data, { ItemPersistentModel });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
