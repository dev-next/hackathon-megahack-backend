const { gql } = require('apollo-server-express');

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
    seller: ID
    customer: ID
    items: [ItemInput]
    title: String
    slug: String
  }

  input CatalogueWhere {
    name: String
    seller: ID
    customer: ID
    slug: ID
  }
`;

const resolvers = {
  Catalogue: {
    id: root => root._id || root.id,
  }
};

module.exports = {
  typeDefs,
  resolvers,
};
