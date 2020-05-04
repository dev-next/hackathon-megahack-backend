const dependencies = {
  ItemRepository: require('../../../infrastructure/repository/ItemRepository'),
};

const FindItem = async (data, injection) => {
  const {
    ItemPersistentModel,
    ItemRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  return new ItemRepository(injection, ItemPersistentModel)
    .findOne(data.itemId)
    .then(item => item)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar o item na plataforma.' +
      ' Por favor, tente recarregar a página'));
};

module.exports = FindItem;
