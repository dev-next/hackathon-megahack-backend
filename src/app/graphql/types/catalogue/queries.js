const {gql} = require('apollo-server-express');
const FindCatalogue = require('../../../domain/use-cases/user/find-catalogue/FindCatalogue');
const FindCatalogues = require('../../../domain/use-cases/user/find-catalogue/FindCatalogues');
const FindCatalogueBySlug = require('../../../domain/use-cases/user/find-catalogue/FindCatalogueBySlug');

const typeDefs = gql`
  extend type Query {
    catalogues(
      where: CatalogueWhereInput
    ): [Catalogue]

    catalogue(
      catalogueId: ID!
    ): Catalogue

    catalogueBySlug(
      slug: String!
    ): Catalogue
  }
`;

const resolvers = {
  Query: {
    catalogues: (
      root,
      data,
      {
        db: { ItemPersistentModel },
        UserLogged,
      },
    ) => FindCatalogues(data, {
      ItemPersistentModel,
      UserLogged,
    }),

    catalogue: (
      root,
      data,
      {
        db: { ItemPersistentModel },
        UserLogged,
      },
    ) => FindCatalogue(data, {
      ItemPersistentModel,
      UserLogged,
    }),

    catalogueBySlug: (
      root,
      data,
      {
        db: { ItemPersistentModel },
        UserLogged,
      },
    ) => FindCatalogueBySlug(data, {
      ItemPersistentModel,
      UserLogged,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
