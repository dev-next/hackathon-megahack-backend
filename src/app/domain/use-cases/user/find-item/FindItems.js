const dependencies = {
  ItemRepository: require('../../../infrastructure/repository/ItemRepository'),
  MakeParamsToFind: require('./helpers/MakeParamsToFind'),
};

const FindItems = async (data, injection) => {
  const {
    ItemPersistentModel,
    MakeParamsToFind,
    ItemRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new Error('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  if (UserLogged.type !== 'STORE_OWNER' && UserLogged.type !== 'SELLER') {
    throw new Error('Você não tem permissão para acessar este recurso');
  }

  const params = data.where ? await MakeParamsToFind(data.where, { UserLogged }) : { active: true };

  return new ItemRepository(injection, ItemPersistentModel)
    .find(params)
    .then(items => items)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar os itens ativos na plataforma.' +
      ' Por favor, tente recarregar a página ou alterar seus filtros.'));
};

module.exports = FindItems;
