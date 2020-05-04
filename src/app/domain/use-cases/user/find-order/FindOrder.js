const dependencies = {
  OrderRepository: require('../../../infrastructure/repository/OrderRepository'),
  MakeParamsToFind: require('./helpers/MakeParamsToFind'),
};

const FindOrders = async (data, injection) => {
  const {
    OrderPersistentModel,
    MakeParamsToFind,
    OrderRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  const params = data.where ? await MakeParamsToFind(data.where, { UserLogged }) : { active: true };

  return new OrderRepository(injection, OrderPersistentModel)
    .find(params)
    .then(orders => orders)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar os pedidos na plataforma.' +
      ' Por favor, tente recarregar a página ou alterar seus filtros.'));
};

module.exports = FindOrders;
