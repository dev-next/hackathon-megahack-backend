const dependencies = {
  CatalogueRepository: require('../../../infrastructure/repository/CatalogueRepository'),
};

const CreateCatalogue = async (data, injection) => {
  const {
    CataloguePersistentModel,
    CatalogueRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new Error('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  if (UserLogged.type !== 'STORE_OWNER' && UserLogged.type !== 'SELLER') {
    throw new Error('Você não tem permissão para acessar este recurso');
  }

  return new CatalogueRepository(injection, CataloguePersistentModel)
    .create({
      ...data.item,
      store: data.store,
      createdBy: UserLogged.id,
    })
    .then(catalogue => catalogue)
    .catch(() => new Error('Ops, houve um problema no cadastro do seu catálogo.' +
      ' Por favor, verifique se todos os campos estão corretamente preenchidos e tente novamente'));
};

module.exports = CreateCatalogue;
