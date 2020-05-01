const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Mutation {}
`;

const resolvers = {
  Mutation: {},
};

module.exports = {
  typeDefs,
  resolvers,
};
