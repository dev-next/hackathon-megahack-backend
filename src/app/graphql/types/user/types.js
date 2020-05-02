const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum _UserType {
    CUSTOMER
    STORE_OWNER
    SELLER
  }

  """Object Type that represents a User"""
  type User {
    id: ID!
    type: _UserType
    name: String
    email: String
    password: String
    phone: String
    stores: [Store]
    photo: String
    invite: InviteSeller
    active: Boolean
    creationDate: DateTime
    updateDate: DateTime
  }

  input UserInput {
    name: String!
    phone: String!
    password: String
    email: String
    stores: [StoreInput]
    photo: String
    invite: InviteSellerInput
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
  },
};

module.exports = {
  typeDefs,
  resolvers,
};


