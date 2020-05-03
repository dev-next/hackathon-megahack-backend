const dependencies = {
  CatalogueRepository: require('../../../infrastructure/repository/CatalogueRepository'),
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  TwilioService: require('../../../services/TwilioService'),
};

const CreateCatalogue = async (data, injection) => {
  const {
    CataloguePersistentModel,
    UserPersistentModel,
    CatalogueRepository,
    UserRepository,
    TwilioService,
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
      ...data.catalogue,
      store: UserLogged.stores[0].id,
      createdBy: UserLogged.id,
    })
    .then(async (catalogue) => {
      if (catalogue.customer) {
        const customer = await new UserRepository(injection, UserPersistentModel)
          .findOne(catalogue.customer._id);

        await TwilioService.sms({
          body: `Oi ${customer.name}, nós da ${UserLogged.stores[0].name} criamos uma lista personalizada para você!
Vem conferir: ${url.toString()}/v/${catalogue.slug}
Ah, se não conseguir clicar no link, copie e cole no seu navegador`,
          to: customer.phone,
        });

        await TwilioService.whatsapp({
          body: `Oi ${customer.name}, nós da *${UserLogged.stores[0].name}* criamos uma lista personalizada para você!
Vem conferir: ${url.toString()}/v/${catalogue.slug}
Ah, se não conseguir clicar no link, copie e cole no seu navegador`,
          to: customer.phone,
        });
      }

      return catalogue;
    })
    .catch(() => new Error('Ops, houve um problema no cadastro do seu catálogo.' +
      ' Por favor, verifique se todos os campos estão corretamente preenchidos e tente novamente'));


};

module.exports = CreateCatalogue;
