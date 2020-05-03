const dependencies = {
  ItemRepository: require('../../../infrastructure/repository/ItemRepository'),
};

const FindItem = async (data, injection) => {
  const {
    ItemPersistentModel,
    ItemRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new Error('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  if (UserLogged.type !== 'STORE_OWNER' && UserLogged.type !== 'SELLER') {
    throw new Error('Você não tem permissão para acessar este recurso');
  }

  return new ItemRepository(injection, ItemPersistentModel)
    .findOne(data.itemId)
    .then(item => item)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar o item na plataforma.' +
      ' Por favor, tente recarregar a página'));
};

module.exports = FindItem;
