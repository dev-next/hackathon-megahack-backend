const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  MakeParamsToCreate: require('./utils/MakeParamsToCreate'),
};

const CreateUser = async (data, injection) => {
  const {
    UserPersistentModel,
    MakeParamsToCreate,
    UserRepository,
  } = Object.assign({}, dependencies, injection);

  try {
    const params = await MakeParamsToCreate(data.user, injection);

    return new UserRepository(injection, UserPersistentModel).create(params);
  } catch (e) {
    throw new Error('Ops, aconteceu algum erro ao criar o usuário na plataforma.' +
      'Por favor, verifique se todos os dados estão preenchidos corretamente e tente novamente.');
  }
};

module.exports = CreateUser;
