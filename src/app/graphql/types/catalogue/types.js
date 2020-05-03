const { gql } = require('apollo-server-express');
const FindItems = require('../../../domain/use-cases/user/find-item/FindItems');
const FindUser = require('../../../domain/use-cases/user/find-user/FindUser');

const typeDefs = gql`
  type Catalogue {
    id: ID
    name: String
    seller: User
    customer: User
    store: Store
    items: [Item]
    slug: String
    creationDate: DateTime
    updateDate: DateTime
    active: Boolean
  }

  input CatalogueInput {
    name: String
    slug: String
    seller: ID
    customer: ID
    items: [ID]
  }

  input CatalogueWhereInput {
    name: String
    seller: ID
    customer: ID
    slug: ID
  }
`;

const resolvers = {
  Catalogue: {
    id: root => root._id || root.id,

    items: (
      root,
      data,
      {
        UserLogged,
        db: { ItemPersistentModel },
      }
    ) => {
      if (root.items && root.items.length) {
        return FindItems({
          where: {
            ids: root.items,
          },
        }, { UserLogged, ItemPersistentModel });
      }

      return [];
    },

    seller: (
      root,
      data,
      {
        UserLogged,
        db: { UserPersistentModel },
      }
    ) => {
      if (root.seller) {
        return FindUser({
          userId: root.seller,
        }, { UserLogged, UserPersistentModel });
      }

      return {};
    },

    customer: (
      root,
      data,
      {
        UserLogged,
        db: { UserPersistentModel },
      }
    ) => {
      if (root.customer) {
        return FindUser({
          userId: root.customer,
        }, { UserLogged, UserPersistentModel });
      }

      return {};
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
