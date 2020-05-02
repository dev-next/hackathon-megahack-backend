const dependencies = {
  SysActionRepository: require('../../../infrastructure/repository/SysActionRepository'),
  ValidateHashCode: require('../../sysAction/validate-hashcode/ValidateHashCode'),
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  bcrypt: require('bcrypt'),
};

const FinishRegister = async (data, injection) => {
  const {
    SysActionPersistentModel,
    UserPersistentModel,
    SysActionRepository,
    ValidateHashCode,
    UserRepository,
    bcrypt,
  } = Object.assign({}, dependencies, injection);

  if (!data.hash || !data.user) {
    throw new Error('Ops, os dados para concluir o cadastro não estão completos.' +
      ' Por favor, preencha todos os campos e tente novamente.');
  }

  if (!data.user.password) {
    throw new Error('Ops, detectamos que você não definiu sua senha ainda.' +
      ' Por favor, defina uma senha e tente novamente.');
  }

  try {
    const isValid = ValidateHashCode({ hash: data.hash }, injection);
    console.log('isValid:', isValid);

    if (!isValid) {
      throw new Error('Ops, detectamos que este código de ação não está mais válido.' +
        ' Por favor, solicite um novo link de criação de conta com o seu gerente.');
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(data.user.password, salt);

    const sysAction = await new SysActionRepository(injection, SysActionPersistentModel)
      .findOneByWhere({ hash: data.hash });

    return new UserRepository(injection, UserPersistentModel)
      .update(sysAction.requester, {
        ...data.user,
        'invite.status': 'ACCEPTED',
        type: 'SELLER',
        active: true,
        password,
      }, true);
  } catch (e) {
    throw new Error(`Error on create User, ${e.message}`);
  }
};

module.exports = FinishRegister;
