const dependencies = {
  OrderRepository: require('../../../infrastructure/repository/OrderRepository'),
};

const CreateOrder = async (data, injection) => {
  const {
    OrderPersistentModel,
    OrderRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new Error('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  return new OrderRepository(injection, OrderPersistentModel)
    .create({
      ...data.order,
      store: UserLogged.stores[0].id,
      createdBy: data.createdBy,
    })
    .then(order => order)
    .catch(() => new Error('Ops, houve um problema ao gerar seu pedido.' +
      ' Por favor, verifique se todos os campos estão corretamente preenchidos e tente novamente'));
};

module.exports = CreateOrder;
