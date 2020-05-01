const { GraphQLDateTime } = require('graphql-iso-date');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  """Type that represents a DateTime data"""
  scalar DateTime

  type RangeDate {
    start: DateTime
    end: DateTime
  }

  input RangeDateInput {
    start: String
    end: String
  }

  type Location {
    country: String
    state: String
    city: String
    neighborhood: String
    street: String
    number: String
  }

  input LocationInput {
    country: String
    state: String
    city: String
    neighborhood: String
    street: String
    number: String
  }
`;

const resolvers = {
  DateTime: GraphQLDateTime,
};

module.exports = {
  typeDefs,
  resolvers,
};


