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
    active: Boolean
    creationDate: DateTime
    updateDate: DateTime
  }

  input UserInput {
    name: String!
    email: String
    password: String!
    phone: String
    stores: [StoreInput]
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


