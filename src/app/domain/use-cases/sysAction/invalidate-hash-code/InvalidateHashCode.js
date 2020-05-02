const dependencies = {
  SysActionRepository: require('../../../infrastructure/repository/SysActionRepository'),
};

const invalidateHashCodeAfterUser = (data, injection) => {
  const {
    SysActionPersistentModel,
    SysActionRepository,
  } = Object.assign({}, dependencies);

  if (!data.hash || !data.requester) {
    throw new Error('Não foi fornecido um hash para ser invalidado');
  }

  return new SysActionRepository(injection, SysActionPersistentModel)
    .invalidateHashCodeByRequesterAndHash(injection, data);
};

module.exports = invalidateHashCodeAfterUser;
