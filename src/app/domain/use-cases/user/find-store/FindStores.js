const dependencies = {
  StoreRepository: require('../../../infrastructure/repository/StoreRepository'),
  MakeParamsToFind: require('./helpers/MakeParamsToFind'),
};

const FindStores = async (data, injection) => {
  const {
    StorePersistentModel,
    MakeParamsToFind,
    StoreRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  const params = data.where ? await MakeParamsToFind(data.where, { UserLogged }) : { active: true };

  return new StoreRepository(injection, StorePersistentModel)
    .find(params)
    .then(stores => stores)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar os itens ativos na plataforma.' +
      ' Por favor, tente recarregar a página ou alterar seus filtros.'));
};

module.exports = FindStores;
