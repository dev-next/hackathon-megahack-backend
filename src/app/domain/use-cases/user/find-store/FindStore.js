const dependencies = {
  StoreRepository: require('../../../infrastructure/repository/StoreRepository'),
};

const FindStore = async (data, injection) => {
  const {
    StorePersistentModel,
    StoreRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new Error('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  if (UserLogged.type !== 'STORE_OWNER' && UserLogged.type !== 'SELLER') {
    throw new Error('Você não tem permissão para acessar este recurso');
  }

  return new StoreRepository(injection, StorePersistentModel)
    .findOne(data.storeId)
    .then(store => store)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar a loja na plataforma.' +
      ' Por favor, tente recarregar a página'));
};

module.exports = FindStore;
