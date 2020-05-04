const Repository = require('./base/Repository');

class ItemRepository extends Repository {
  constructor(injection, entity) {
    super(injection, entity);
    this._entity = entity;
  }
}

module.exports = ItemRepository;
