const { gql, UserInputError } = require('apollo-server-express');
const CreateStoreAndOwner = require('../../../domain/use-cases/user/create-store-and-owner/CreateStoreAndOwner');

const typeDefs = gql`
  extend type Mutation {
  """Mutation to create a User"""
    createStoreAndOwner(
      user: UserInput!
      store: StoreInput!
    ): User
  }
`;

const resolvers = {
  Mutation: {
    createStoreAndOwner:  (
      root,
      data,
      {
        db: { UserPersistentModel, StorePersistentModel },
        Logger,
      },
    ) => {
      if (data.name === '' || data.email === '') {
        throw new UserInputError('Arguments invalid', {
          invalidArgs: data.name === '' ? ['name'] : ['email'],
        });
      }
      return CreateStoreAndOwner(data, { UserPersistentModel, StorePersistentModel, Logger });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
