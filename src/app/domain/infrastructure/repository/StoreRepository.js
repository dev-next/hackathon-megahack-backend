const Repository = require('./base/Repository');

class StoreRepository extends Repository {
  constructor(injection, entity) {
    super(injection, entity);
    this._entity = entity;
  }
}

module.exports = StoreRepository;
