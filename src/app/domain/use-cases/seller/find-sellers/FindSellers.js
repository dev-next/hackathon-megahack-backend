const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
};

const FindSellers = (data, injection) => {
  const {
    ForbiddenError,
    UserRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

  if (!UserLogged) {
    throw new ForbiddenError('Você não está logado na plataforma. Por favor, faça login e tente novamente');
  }

  return new UserRepository(injection).findUsers();
};

module.exports = FindSellers;
