const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Order {
    id: ID
    name: String
    number: Int
    value: Float
    store: Store
    delivery: Delivery
    payment: Payment
    items: OrderItems
    customer: User
    seller: User
    active: Boolean
    creationDate: DateTime
    updateDate: DateTime
  }
  
  input OrderInput {
    name: String
    value: Float
    store: ID
    delivery: DeliveryInput
    payment: PaymentInput
    items: OrderItemsInput
    customer: ID
    seller: ID
  }
  
  type OrderItems {
    fromItem: Item
    name: String
    description: String
    value: Float
    fields: [Field]
  }
  
  input OrderItemsInput {
    fromItem: ID
    name: String
    description: String
    value: Float
    fields: [FieldInput]
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers,
};
