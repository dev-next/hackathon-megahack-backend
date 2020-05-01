const { gql, UserInputError } = require('apollo-server-express');
const CreateStoreOwner = require('../../../domain/use-cases/user/create-user/CreateStoreOwner');

const typeDefs = gql`
  extend type Mutation {
  """Mutation to create a User"""
    createStoreOwner(
      user: UserInput!
      store: StoreInput
    ): User
  }
`;

const resolvers = {
  Mutation: {
    createStoreOwner:  (
      root,
      data,
      {
        db: { UserPersistentModel },
        Logger,
      },
    ) => {
      if (data.name === '' || data.email === '') {
        throw new UserInputError('Arguments invalid', {
          invalidArgs: data.name === '' ? ['name'] : ['email'],
        });
      }
      return CreateStoreOwner(data, { UserPersistentModel, Logger });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
