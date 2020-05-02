const Repository = require('./base/Repository');

class SysActionRepository extends Repository {
  constructor(injection, entity) {
    super(injection, entity);
    this._entity = entity;
  }

  invalidateHashCodeByRequesterAndHash(
    injection,
    params,
    skip = 0,
    limit = 1000,
    sort = { creationDate: 1 },
  ) {
    return this._entity
      .findOneAndUpdate(
        { hash: params.hash, requester: params.requester },
        { $set: { used: true } }, { new: true },
      )
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }
}

module.exports = SysActionRepository;
