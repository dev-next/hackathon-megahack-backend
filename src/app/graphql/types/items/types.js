const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Item {
    id: ID
    name: String
    description: String
    photos: [String]
    value: Float
    tags: [String]
    fields: [Field]
    store: [Store]
    createdBy: User
    active: Boolean
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
`;

const resolvers = {
  Item: {
    id: root => root._id || root.id,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};