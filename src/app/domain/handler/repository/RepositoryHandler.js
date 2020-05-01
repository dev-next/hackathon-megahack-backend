const StoreRepository = require('../../infrastructure/repository/StoreRepository');
const UserRepository = require('../../infrastructure/repository/UserRepository');

class RepositoryHandler {
  constructor(injection, entity) {
    this.injection = injection;
    this.entity = entity;
  }

  STORE() {
    return new StoreRepository(this.injection, this.entity);
  }

  USER() {
    return new UserRepository(this.injection, this.entity);
  }

  find(entityName) {
    if (entityName) return this[entityName]();

    throw new Error('Tipo de entidade para buscar o repositório é inválida!');
  }
}

module.exports = RepositoryHandler;
