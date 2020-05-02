const { gql, UserInputError } = require('apollo-server-express');
const CreateStoreAndOwner = require('../../../domain/use-cases/user/create-store-and-owner/CreateStoreAndOwner');
const CreateUser = require('../../../domain/use-cases/user/create-user/CreateUser');

const typeDefs = gql`
  extend type Mutation {
  """Mutation to create a User"""
    createStoreAndOwner(
      user: UserInput!
      store: StoreInput!
    ): User

    createUser(
      user: UserInput!
    ): User
  }
`;

const resolvers = {
  Mutation: {
    createStoreAndOwner: (
      root,
      data,
      {
        db: { UserPersistentModel, StorePersistentModel },
      },
    ) => {
      if (!data.user || !data.store) {
        throw new UserInputError('Dados inválidos', {
          invalidArgs: !data.user ? 'usuário' : 'loja',
        });
      }

      return CreateStoreAndOwner(data, { UserPersistentModel, StorePersistentModel });
    },

    createUser: (
      root,
      data,
      {
        db: { UserPersistentModel },
      },
    ) => {
      if (!data.user) {
        throw new UserInputError('Dados inválidos', {
          invalidArgs: 'usuário',
        });
      }

      return CreateUser(data, { UserPersistentModel });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
