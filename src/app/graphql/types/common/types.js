const { GraphQLDateTime } = require('graphql-iso-date');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  """Type that represents a DateTime data"""
  scalar DateTime
  
  type RangeDate {
    start: DateTime
    end: DateTime
  }
  
  input InputRangeDate {
    start: String
    end: String
  }
`;

const resolvers = {
  DateTime: GraphQLDateTime,
};

module.exports = {
  typeDefs,
  resolvers,
};


