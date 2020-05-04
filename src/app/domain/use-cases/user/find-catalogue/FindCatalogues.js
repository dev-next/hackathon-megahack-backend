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

  const newData = Object.assign(data.where || {}, {});
  const params = await MakeParams(newData, { UserLogged });

  return new CatalogueRepository(injection, CataloguePersistentModel)
    .find(params)
    .then(catalogue => catalogue)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar os catálogos na plataforma.' +
      ' Por favor, tente recarregar a página ou alterar os parâmetros de busca'));
};

module.exports = FindCatalogueBySlug;
