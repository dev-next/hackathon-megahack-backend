const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
};

const FindUser = async (data, injection) => {
  const {
    UserPersistentModel,
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

  if (!data.userId) {
    throw new Error('Por favor, selecione qual usuário gostaria de ver as informações');
  }

  return new UserRepository(injection, UserPersistentModel)
    .findOne(data.userId)
    .then(user => user)
    .catch(() => new Error('Ops, ocorreu algum erro ao buscar os vendedores ativos na plataforma.' +
      ' Por favor, tente recarregar a página.'));
};

module.exports = FindUser;
