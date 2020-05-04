const { gql } = require('apollo-server-express');
const TwilioService = require('../../../domain/services/TwilioService');

const typeDefs = gql`
  extend type Mutation {
    sendSms(
      body: String
      to: String
    ): Boolean

    sendWhatsapp(
      body: String
      to: String
    ): Boolean
  }
`;

const resolvers = {
  Mutation: {
    sendSms: (
      root,
      data,
    ) => TwilioService.sms(data),

    sendWhatsapp: (
      root,
      data,
    ) => TwilioService.whatsapp(data),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
