const Repository = require('./base/Repository');

class OrderRepository extends Repository {
  constructor(injection, entity) {
    super(injection, entity);
    this._entity = entity;
  }
}

module.exports = OrderRepository;
