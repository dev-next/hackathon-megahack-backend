const dependencies = {
  SysActionRepository: require('../../../infrastructure/repository/SysActionRepository'),
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  moment: require('moment'),
  uuid: require('uuid').v4,
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
    await new UserRepository(injection, UserPersistentModel)
      .create(data.user);

    const sysAction = {
      requester: data.owner,
      action: 'INVITE_USER',
      metadata: JSON.stringify(data.user),
      expirationDate: moment().add(3, 'days'),
      hash: uuid(),
    };

    return !! new SysActionRepository(injection, SysActionPersistentModel)
      .create(sysAction);
  } catch (e) {
    throw new Error(`Erro ao convidar usuário, ${e.message}`);
  }
};

module.exports = InviteSeller;
