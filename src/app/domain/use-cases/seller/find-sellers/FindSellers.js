const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  MakeParamsToFind: require('./helpers/MakeParamsToFind'),
};

const FindSellers = async (data, injection) => {
  const {
    UserPersistentModel,
    MakeParamsToFind,
    ForbiddenError,
    UserRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new ForbiddenError('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  if (UserLogged.type !== 'STORE_OWNER') {
    throw new Error('Você não tem permissão para acessar este recurso');
  }

  try {
    const params = await MakeParamsToFind(data.where);

    return new UserRepository(injection, UserPersistentModel).find(params);
  } catch (e) {
    throw new Error('Ops, ocorreu algum erro ao buscar os vendedores ativos na plataforma.' +
      ' Por favor, tente recarregar a página.');
  }
};

module.exports = FindSellers;
