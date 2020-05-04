const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
};

const FindUser = async (data, injection) => {
  const {
    UserPersistentModel,
    UserRepository,
    UserLogged,
  } = Object.assign({}, dependencies, injection);

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
