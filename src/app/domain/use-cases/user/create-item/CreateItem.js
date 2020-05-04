const dependencies = {
  ItemRepository: require('../../../infrastructure/repository/ItemRepository'),
};

const CreateItem = async (data, injection) => {
  const {
    ItemPersistentModel,
    ItemRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  return new ItemRepository(injection, ItemPersistentModel)
    .create({
      ...data.item,
      store: data.store,
      createdBy: data.createdBy,
    })
    .then(item => item)
    .catch(() => new Error('Ops, houve um problema no cadastro do seu item.' +
      ' Por favor, verifique se todos os campos estão corretamente preenchidos e tente novamente'));
};

module.exports = CreateItem;
