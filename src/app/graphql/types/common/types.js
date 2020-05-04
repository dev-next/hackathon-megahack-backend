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

  type Payment {
    method: _PaymentMethodEnum
    needChange: Boolean
  }

  input PaymentInput {
    method: _PaymentMethodEnum
    needChange: Boolean
    changeTo: Float
  }

  enum _PaymentMethodEnum {
    MONEY
    CREDIT_CARD
  }

  type Delivery {
    location: Location
    type: _DeliveryTypeEnum
    dates: DateTime
    period: _DeliveryPeriodEnum
    shipment: Float
  }

  input DeliveryInput {
    location: LocationInput
    type: _DeliveryTypeEnum
    dates: String
    period: _DeliveryPeriodEnum
    shipment: Float
  }

  enum _DeliveryTypeEnum {
    HOME
    STORE
  }

  enum _DeliveryPeriodEnum {
    MORNING
    AFTERNOON
  }
`;

const resolvers = {
  DateTime: GraphQLDateTime,
};

module.exports = {
  typeDefs,
  resolvers,
};


