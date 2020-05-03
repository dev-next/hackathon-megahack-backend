const { gql } = require('apollo-server-express');

const typeDefs = gql`
  """Object Type that represents a Sign data"""
  type Sign {
    token: String!
    user: UserSign
  }

  type UserSign {
    id: ID
    name: String
    email: String
    phone: String
    type: _UserType
    stores: [Store]
  }
`;

const resolvers = {
  Sign: {
    user: root => root.user,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};


