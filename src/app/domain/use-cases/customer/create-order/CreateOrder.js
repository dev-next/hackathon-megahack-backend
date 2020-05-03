const dependencies = {
  CatalogueRepository: require('../../../infrastructure/repository/CatalogueRepository'),
  StoreRepository: require('../../../infrastructure/repository/StoreRepository'),
  OrderRepository: require('../../../infrastructure/repository/OrderRepository'),
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  TwilioService: require('../../../services/TwilioService'),
};

const CreateOrder = async (data, injection) => {
  const {
    CataloguePersistentModel,
    StorePersistentModel,
    OrderPersistentModel,
    UserPersistentModel,
    CatalogueRepository,
    OrderRepository,
    UserRepository,
    TwilioService,
  } = Object.assign({}, dependencies, injection);

  return new OrderRepository(injection, OrderPersistentModel)
    .create({
      ...data.order,
      createdBy: data.createdBy,
    })
    .then(async (order) => {
      const store = await new OrderRepository(injection, StorePersistentModel)
        .findOne(data.order.store);

      const seller = await new UserRepository(injection, UserPersistentModel)
        .findOne(data.order.seller);

      const catalogue = await new CatalogueRepository(injection, CataloguePersistentModel)
        .findOne(data.order.catalogue);

      let customer;

      if (!catalogue.customer) {
        const user = await new UserRepository(injection, UserPersistentModel)
          .findOneByWhere({ phone: data.order.customer.phone });

        if (!user) {
          customer = await new UserRepository(injection, UserPersistentModel)
            .create(data.order.customer);
          console.log('customer:', customer);
        } else {
          customer = user;
        }
      } else {
        customer = await new UserRepository(injection, UserPersistentModel)
          .findOne(catalogue.customer);
      }

      await TwilioService.sms({
        body: `Olá, ${customer.name}!
        Seu pedido na *Vitrine* da loja ${store.name} foi realizado com sucesso!
        Em breve vamos te notificar a respeito do andamento do pedido. Até logo :)
        Para acompanhar o pedido, acesse: ${process.env.API_UR}/v/${catalogue.slug}`,
        to: customer.phone,
      });

      await TwilioService.whatsapp({
        body: `Olá, ${customer.name}!
        Seu pedido na *Vitrine* da loja ${store.name} foi realizado com sucesso!
        Em breve vamos te notificar a respeito do andamento do pedido. Até logo :)
        Para acompanhar o pedido, acesse: ${process.env.API_UR}/v/${catalogue.slug}`,
        to: customer.phone,
      });

      await TwilioService.sms({
        body: `Olá, ${seller.name}!
        Há um novo pedido na plataforma :)
        Cliente: *${customer.name}*
        Telefone/Celular: *${customer.phone}*
        Para acompanhar o pedido, acesse: ${process.env.API_UR}/listas/${catalogue.slug}`,
        to: seller.phone,
      });

      await TwilioService.whatsapp({
        body: `Olá, ${seller.name}!
        Há um novo pedido na plataforma :)
        Cliente: *${customer.name}*
        Telefone/Celular: *${customer.phone}*
        Para acompanhar o pedido, acesse: ${process.env.API_UR}/listas/${catalogue.slug}`,
        to: seller.phone,
      });

      return order;
    })
    .catch(() => new Error('Ops, houve um problema ao gerar seu pedido.' +
      ' Por favor, verifique se todos os campos estão corretamente preenchidos e tente novamente'));
};

module.exports = CreateOrder;
