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

  const params = data.where ? await MakeParamsToFind(data.where, { UserLogged }) : { active: true };

  return new ItemRepository(injection, ItemPersistentModel)
    .find(params)
    .then(items => items)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar os itens ativos na plataforma.' +
      ' Por favor, tente recarregar a página ou alterar seus filtros.'));
};

module.exports = FindItems;
