const dependencies = {
  StoreRepository: require('../../../infrastructure/repository/StoreRepository'),
};

const FindStore = async (data, injection) => {
  const {
    StorePersistentModel,
    StoreRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  return new StoreRepository(injection, StorePersistentModel)
    .findOne(data.storeId)
    .then(store => store)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar a loja na plataforma.' +
      ' Por favor, tente recarregar a página'));
};

module.exports = FindStore;
