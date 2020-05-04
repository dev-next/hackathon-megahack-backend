const dependencies = {
  ItemRepository: require('../../../infrastructure/repository/ItemRepository'),
};

const CreateItem = async (data, injection) => {
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
