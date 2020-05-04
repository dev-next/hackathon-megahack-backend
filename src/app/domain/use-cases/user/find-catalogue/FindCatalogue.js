const dependencies = {
  CatalogueRepository: require('../../../infrastructure/repository/CatalogueRepository'),
};

const FindCatalogueBySlug = async (data, injection) => {
  const {
    CataloguePersistentModel,
    CatalogueRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new Error('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  if (UserLogged.type !== 'STORE_OWNER' && UserLogged.type !== 'SELLER') {
    throw new Error('Você não tem permissão para acessar este recurso');
  }

  return new CatalogueRepository(injection, CataloguePersistentModel)
    .findOne(data.catalogueId)
    .then(catalogue => catalogue)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar o catálogo na plataforma através do id.' +
      ' Por favor, tente recarregar a página'));
};

module.exports = FindCatalogueBySlug;
