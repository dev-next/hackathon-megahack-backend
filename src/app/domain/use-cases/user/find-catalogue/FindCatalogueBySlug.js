const dependencies = {
  CatalogueRepository: require('../../../infrastructure/repository/CatalogueRepository'),
};

const FindCatalogueBySlug = async (data, injection) => {
  const {
    CataloguePersistentModel,
    CatalogueRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  return new CatalogueRepository(injection, CataloguePersistentModel)
    .findOneByWhere({
      slug: data.slug,
    })
    .then(catalogue => catalogue)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar o catálogo na plataforma através da url.' +
      ' Por favor, tente recarregar a página'));
};

module.exports = FindCatalogueBySlug;
