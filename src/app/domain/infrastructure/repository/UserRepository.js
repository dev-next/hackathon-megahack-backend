const Repository = require('./base/Repository');

class UserRepository extends Repository {
  constructor(injection, entity) {
    super(injection, entity);
    this._entity = entity;
  }
}

module.exports = UserRepository;
