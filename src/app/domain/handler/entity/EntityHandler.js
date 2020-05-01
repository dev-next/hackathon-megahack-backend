class EntityHandler {
  static USER() {
    const { UserPersistentModel } = require('../../infrastructure/mongodb-models');
    return UserPersistentModel;
  }

  static STORE() {
    const { StorePersistentModel } = require('../../infrastructure/mongodb-models');
    return StorePersistentModel;
  }

  static find(entity) {
    if (entity) return this[entity]();

    throw new Error('Tipo de entidade inválida!');
  }
}

module.exports = EntityHandler;
