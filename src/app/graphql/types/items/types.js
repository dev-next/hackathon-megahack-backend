const { gql } = require('apollo-server-express');
const FindStore = require('../../../domain/use-cases/user/find-store/FindStore');
const FindUser = require('../../../domain/use-cases/user/find-user/FindUser');

const typeDefs = gql`
  type Item {
    id: ID
    name: String
    description: String
    photos: [String]
    value: Float
    tags: [String]
    fields: [Field]
    store: Store
    createdBy: User
    active: Boolean
    creationDate: DateTime
    updateDate: DateTime
  }

  input ItemInput {
    name: String
    description: String
    photos: [String]
    value: Float
    tags: [String]
    fields: [FieldInput]
    active: Boolean
  }

  input ItemWhereInput {
    name: String
    tags: [String]
  }
`;

const resolvers = {
  Item: {
    id: root => root._id || root.id,

    store: (
      root,
      data,
      {
        UserLogged,
        db: { StorePersistentModel },
      }
    ) => {
      if (root.store && !root.store.id) {
        return FindStore({
          storeId: root.store,
        }, { UserLogged, StorePersistentModel });
      }

      return {};
    },

    createdBy: (
      root,
      data,
      {
        UserLogged,
        db: { UserPersistentModel },
      }
    ) => {
      if (root.createdBy && !root.store.id) {
        return FindUser({
          userId: root.createdBy,
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
