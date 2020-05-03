const dependencies = {
  CatalogueRepository: require('../../../infrastructure/repository/CatalogueRepository'),
  MakeParams: require('./helpers/MakeParamsToFind'),
};

const FindCatalogueBySlug = async (data, injection) => {
  const {
    CataloguePersistentModel,
    CatalogueRepository,
    MakeParams,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new Error('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  if (UserLogged.type !== 'STORE_OWNER' && UserLogged.type !== 'SELLER') {
    throw new Error('Você não tem permissão para acessar este recurso');
  }

  const newData = Object.assign(data.where, {});
  const params = await MakeParams(newData, { UserLogged });

  return new CatalogueRepository(injection, CataloguePersistentModel)
    .findOneByWhere(params)
    .then(catalogue => catalogue)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar o catálogo na plataforma através da url.' +
      ' Por favor, tente recarregar a página'));
};

module.exports = FindCatalogueBySlug;
