const {gql} = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {}
`;

const resolvers = {
  Query: {},
};

module.exports = {
  typeDefs,
  resolvers,
};
