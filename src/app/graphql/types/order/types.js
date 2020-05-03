const { gql } = require('apollo-server-express');
const FindStore = require('../../../domain/use-cases/user/find-store/FindStore');
const FindUser = require('../../../domain/use-cases/user/find-user/FindUser');

const typeDefs = gql`
  type Order {
    id: ID
    name: String
    number: Int
    value: Float
    store: Store
    delivery: Delivery
    payment: Payment
    items: OrderItems
    customer: OrderUser
    seller: User
    active: Boolean
    creationDate: DateTime
    updateDate: DateTime
  }

  input OrderInput {
    name: String
    value: Float
    store: ID
    delivery: DeliveryInput
    payment: PaymentInput
    items: OrderItemsInput
    customer: OrderUserInput
    seller: ID
    catalogue: ID
  }

  type OrderUser {
    fromUser: User
    name: String
    email: String
    phone: String
    tags: [String]
  }

  input OrderUserInput {
    name: String
    email: String
    phone: String
    tags: [String]
  }

  type OrderItems {
    fromItem: Item
    name: String
    description: String
    value: Float
    fields: [Field]
  }

  input OrderItemsInput {
    fromItem: ID
    name: String
    description: String
    value: Float
    fields: [FieldInput]
  }

  input OrderWhereInput {
    name: String
    number: Int
    customer: ID
    seller: ID
  }
`;

const resolvers = {
  OrderUser: {
    fromUser: (
      root,
      data,
      {
        UserLogged,
        db: { UserPersistentModel },
      }
    ) => {
      if (root.fromUser && !root.fromUser.id) {
        return FindUser({
          userId: root.fromUser,
        }, { UserLogged, UserPersistentModel });
      }

      return {};
    },
  },

  Order: {
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

    seller: (
      root,
      data,
      {
        UserLogged,
        db: { UserPersistentModel },
      }
    ) => {
      if (root.seller && !root.seller.id) {
        return FindUser({
          userId: root.seller,
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
