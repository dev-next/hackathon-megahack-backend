const { gql } = require('apollo-server-express');
const TwilioService = require('../../../domain/services/TwilioService');

const typeDefs = gql`
  extend type Mutation {
    sendSms(
      body: String
      to: String
      from: String
    ): Boolean
  }
`;

const resolvers = {
  Mutation: {
    sendSms: (
      root,
      data,
      {
        UserLogged,
      },
    ) => TwilioService.sms(data, { UserLogged }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
