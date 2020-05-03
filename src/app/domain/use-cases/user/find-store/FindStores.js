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

  if (!UserLogged) {
    throw new Error('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  if (UserLogged.type !== 'STORE_OWNER' && UserLogged.type !== 'SELLER') {
    throw new Error('Você não tem permissão para acessar este recurso');
  }

  const params = data.where ? await MakeParamsToFind(data.where, { UserLogged }) : { active: true };

  return new StoreRepository(injection, StorePersistentModel)
    .find(params)
    .then(stores => stores)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar os itens ativos na plataforma.' +
      ' Por favor, tente recarregar a página ou alterar seus filtros.'));
};

module.exports = FindStores;
