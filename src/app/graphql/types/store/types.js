const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Store {
    id: ID
    name: String
    documentNumber: String
    location: Location
    openingHours: [OpeningHours]
    phones: [String]
  }

  input StoreInput {
    name: String
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

const resolvers = {
  Store: {
    // APPROACH TO TRANSFORM POSSIBLE _id RECEIVED FROM MONGODB DATABASE
    id: root => root._id || root.id,
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
