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
        db: { OrderPersistentModel },
        UserLogged,
      },
    ) => {
      if (!data.order) {
        throw new UserInputError('Dados inválidos', {
          invalidArgs: ['pedido'],
        });
      }

      return CreateOrder(data, { OrderPersistentModel, UserLogged });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
