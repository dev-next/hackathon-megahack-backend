const dependencies = {
  SysActionRepository: require('../../../infrastructure/repository/SysActionRepository'),
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  moment: require('moment'),
  uuid: require('uuid'),
};

const InviteSeller = async (data, injection) => {
  const {
    SysActionPersistentModel,
    UserPersistentModel,
    SysActionRepository,
    UserRepository,
    moment,
    uuid,
  } = Object.assign({}, dependencies, injection);

  if (!data.owner || !data.user) {
    throw new Error('Ops, os dados para convidar o vendedor não estão completos.' +
      ' Por favor, preencha todos os campos e tente novamente.');
  }

  try {
    const sysAction = {
      requester: data.owner,
      action: 'INVITE_USER',
      metadata: data.user,
      expirationDate: moment().add('days', 3),
      hash: uuid(),
    };

    await new SysActionRepository(injection, SysActionPersistentModel)
      .create(sysAction);

    return new UserRepository(injection, UserPersistentModel)
      .create(data.user);
  } catch (e) {
    throw new Error(`Error on create User, ${e.message}`);
  }
};

module.exports = InviteSeller;
