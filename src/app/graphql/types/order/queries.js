const { gql } = require('apollo-server-express');
const FindOrder = require('../../../domain/use-cases/user/find-order/FindOrder');
const FindOrders = require('../../../domain/use-cases/user/find-order/FindOrders');

const typeDefs = gql`
  extend type Query {
    orders(
      where: OrderWhereInput
    ): [Order]

    order(
      orderId: ID!
    ): Order
  }
`;

const resolvers = {
  Query: {
    orders: (
      root,
      data,
      {
        db: { OrderPersistentModel },
        UserLogged,
      },
    ) => FindOrders(data, {
      OrderPersistentModel,
      UserLogged,
    }),

    order: (
      root,
      data,
      {
        db: { OrderPersistentModel },
        UserLogged,
      },
    ) => FindOrder(data, {
      OrderPersistentModel,
      UserLogged,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
