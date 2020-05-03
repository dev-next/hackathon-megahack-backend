const { gql } = require('apollo-server-express');
const FindStores = require('../../../domain/use-cases/user/find-store/FindStores');

const typeDefs = gql`
  enum _UserType {
    CUSTOMER
    STORE_OWNER
    SELLER
  }

  """Object Type that represents a User"""
  type User {
    id: ID
    type: _UserType
    name: String
    email: String
    phone: String
    stores: [Store]
    photo: String
    invite: InviteSeller
    tags: [String]
    active: Boolean
    creationDate: DateTime
    updateDate: DateTime
  }

  input UserWhereInput {
    name: String
    phone: String
    type: _UserType
  }
  
  input UserInput {
    name: String!
    phone: String!
    type: _UserType
    password: String
    email: String
    stores: [ID]
    photo: String
    tags: [String]
  }

  type InviteSeller {
    invitedBy: User
    status: _InviteSellerStatusEnum
  }

  input InviteSellerInput {
    invitedBy: ID
    status: _InviteSellerStatusEnum
  }

  enum _InviteSellerStatusEnum {
    ACCEPTED
    PENDING
  }
`;

const resolvers = {
  User: {
    // APPROACH TO TRANSFORM POSSIBLE _id RECEIVED FROM MONGODB DATABASE
    id: root => root._id || root.id,

    stores: (
      root,
      data,
      {
        UserLogged,
        db: { StorePersistentModel },
      }
    ) => {
      if (root.stores && root.stores.length) {
        return FindStores({
          where: {
            ids: root.stores,
          },
        }, { UserLogged, StorePersistentModel });
      }

      return [];
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};


