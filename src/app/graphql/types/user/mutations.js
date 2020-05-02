const { gql, UserInputError } = require('apollo-server-express');
const CreateStoreAndOwner = require('../../../domain/use-cases/owner/create-store-and-owner/CreateStoreAndOwner');
const CreateUser = require('../../../domain/use-cases/user/create-user/CreateUser');
const FinishSellerRegister = require('../../../domain/use-cases/seller/finish-seller-register/Finish');
const InviteSeller = require('../../../domain/use-cases/owner/invite-seller/InviteSeller');

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

    inviteSeller(
      user: UserInput!
      owner: ID!
    ): Boolean

    finishSellerRegister(
      hash: String!
      user: UserInput!
    ): Sign
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

    inviteSeller: (
      root,
      data,
      {
        db: { UserPersistentModel, SysActionPersistentModel },
      },
    ) => {
      if (!data.user || !data.owner) {
        throw new UserInputError('Dados inválidos', {
          invalidArgs: ['convidado', 'gerente'],
        });
      }

      return InviteSeller(data, { UserPersistentModel, SysActionPersistentModel });
    },

    finishSellerRegister: (
      root,
      data,
      {
        db: { UserPersistentModel, SysActionPersistentModel },
      },
    ) => {
      if (!data.hash || !data.user) {
        throw new UserInputError('Dados inválidos', {
          invalidArgs: ['usuário', 'validador'],
        });
      }

      return FinishSellerRegister(data, { UserPersistentModel, SysActionPersistentModel });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
