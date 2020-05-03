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
        db: { CataloguePersistentModel },
        UserLogged,
      },
    ) => FindCatalogues(data, {
      CataloguePersistentModel,
      UserLogged,
    }),

    catalogue: (
      root,
      data,
      {
        db: { CataloguePersistentModel },
        UserLogged,
      },
    ) => FindCatalogue(data, {
      CataloguePersistentModel,
      UserLogged,
    }),

    catalogueBySlug: (
      root,
      data,
      {
        db: { CataloguePersistentModel },
        UserLogged,
      },
    ) => FindCatalogueBySlug(data, {
      CataloguePersistentModel,
      UserLogged,
    }),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
