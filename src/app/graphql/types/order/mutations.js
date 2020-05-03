const { gql, UserInputError } = require('apollo-server-express');
const CreateOrder = require('../../../domain/use-cases/customer/create-order/CreateOrder');

const typeDefs = gql`
  extend type Mutation {
    createOrder(
      order: OrderInput!
    ): Order
  }
`;

const resolvers = {
  Mutation: {
    createOrder: (
      root,
      data,
      {
        db: {
          UserPersistentModel,
          OrderPersistentModel,
          StorePersistentModel,
          CataloguePersistentModel,
        },
      },
    ) => {
      if (!data.order) {
        throw new UserInputError('Dados inválidos', {
          invalidArgs: ['pedido'],
        });
      }

      return CreateOrder(data, {
        UserPersistentModel,
        OrderPersistentModel,
        StorePersistentModel,
        CataloguePersistentModel,
      });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
