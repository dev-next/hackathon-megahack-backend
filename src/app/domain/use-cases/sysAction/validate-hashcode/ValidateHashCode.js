const dependencies = {
  SysActionRepository: require('../../../infrastructure/repository/SysActionRepository'),
  moment: require('moment'),
};

const Validate = async (data, injection) => {
  const {
    SysActionRepository,
    SysActionPersistentModel,
    moment,
  } = Object.assign({}, dependencies, injection);

  if (!data.hash) {
    throw new Error('Não encontramos o código para realização desta ação.' +
      ' Por favor, solicite um novo código e tente novamente.');
  }

  try {
    const sysAction = await new SysActionRepository(injection, SysActionPersistentModel)
      .findOneByWhere({ hash: data.hash } );

    if (!sysAction) return false;

    if ((moment(sysAction.expirationDate).isBefore(new Date(), 'date')) || !sysAction.active) {
      await new SysActionRepository(injection, SysActionPersistentModel).update(
        sysAction._id,
        { active: false },
      );

      return false;
    }

    return true;
  } catch (e) {
    throw new Error('Ops, parece que este código de ação encontra-se inválido no nosso sistema.' +
      ' Por favor, solicite um novo código e tente novamente.');
  }
};
module.exports = Validate;
