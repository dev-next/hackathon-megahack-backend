const { gql } = require('apollo-server-express');
const FindStore = require('../../../domain/use-cases/user/find-store/FindStore');
const FindStores = require('../../../domain/use-cases/user/find-store/FindStores');

const typeDefs = gql`
  extend type Query {
    stores(
      where: StoreWhereInput
    ): [Store]

    store(
      storeId: ID!
    ): Store
  }
`;

const resolvers = {
  Query: {
    stores: (
      root,
      data,
      {
        db: { StorePersistentModel },
        UserLogged,
      },
    ) => FindStores(data, {
      StorePersistentModel,
      UserLogged,
    }),

    store: (
      root,
      data,
      {
        db: { StorePersistentModel },
        UserLogged,
      },
    ) => FindStore(data, {
      StorePersistentModel,
      UserLogged,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
