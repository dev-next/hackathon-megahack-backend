const Repository = require('./base/Repository');

class CatalogueRepository extends Repository {
  constructor(injection, entity) {
    super(injection, entity);
    this._entity = entity;
  }
}

module.exports = CatalogueRepository;
