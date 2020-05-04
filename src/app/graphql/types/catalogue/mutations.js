const { gql, UserInputError } = require('apollo-server-express');
const CreateCatalogue = require('../../../domain/use-cases/user/create-catalogue/CreateCatalogue');

const typeDefs = gql`
  extend type Mutation {
    createCatalogue(
      catalogue: CatalogueInput
    ): Catalogue
  }
`;

const resolvers = {
  Mutation: {
    createCatalogue: (
      root,
      data,
      {
        db: {
          CataloguePersistentModel,
          UserPersistentModel,
        },
        UserLogged,
      },
    ) => {
      if (!data.catalogue) {
        throw new UserInputError('Dados inválidos', {
          invalidArgs: ['catálogo'],
        });
      }

      return CreateCatalogue(data, {
        CataloguePersistentModel,
        UserPersistentModel,
        UserLogged,
      });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
