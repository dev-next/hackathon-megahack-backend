const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  MakeParamsToFind: require('./helpers/MakeParamsToFind'),
};

const FindSellers = (data, injection) => {
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

  const params = MakeParamsToFind(data.where);

  return new UserRepository(injection, UserPersistentModel).find(params);
};

module.exports = FindSellers;
