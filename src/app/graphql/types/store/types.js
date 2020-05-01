const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Store {
    name: String
    corporateName: String
    documentNumber: String
    location: Location
    openingHours: [OpeningHours]
    phones: [String]
  }

  input StoreInput {
    name: String
    corporateName: String
    documentNumber: String
    location: LocationInput
    openingHours: [OpeningHoursInput]
    phones: [String]
  }

  type OpeningHours {
    weekDay: String
    range: RangeDate
  }

  input OpeningHoursInput {
    weekDay: String
    range: RangeDateInput
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers,
};
