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
    zipcode: String
    country: String
    state: String
    city: String
    neighborhood: String
    street: String
    number: String
  }

  input LocationInput {
    zipcode: String
    country: String
    state: String
    city: String
    neighborhood: String
    street: String
    number: String
  }

  type Field {
    label: String
    value: String
  }

  input FieldInput {
    label: String
    value: String
  }
`;

const resolvers = {
  DateTime: GraphQLDateTime,
};

module.exports = {
  typeDefs,
  resolvers,
};


