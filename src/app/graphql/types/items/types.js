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
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
