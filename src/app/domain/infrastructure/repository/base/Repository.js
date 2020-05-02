const dependencies = {
  Logger: require('../../../../utils/Logger'),
  mongoose: require('mongoose'),
  RepositoryEventHandler: require('../../../handler/event/RepositoryEventHandler'),
};

class Repository {
  constructor(injection, entity) {
    if (!entity) throw new Error('Favor informar parâmetros obrigatórios [entity]');
    this._dependencies = Object.assign({}, dependencies, injection);
    this._injection = injection;
    this._entity = entity;
  }

  count(where = {}) {
    return this._entity
      .countDocuments(where)
      .exec();
  }

  find(where = {}, skip = 0, limit = 1000, selectThisFields = {}, sort = { creationDate: -1 }, populate = '') {
    return this._entity
      .find(where)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(selectThisFields)
      .populate(populate)
      .exec();
  }

  findOne(id, selectThisFields = {}) {
    return this._entity
      .findOne({ _id: id })
      .select(selectThisFields)
      .exec();
  }

  findOneByWhere(where = { active: true }, selectThisFields = {}) {
    return this._entity
      .findOne(where)
      .select(selectThisFields)
      .exec();
  }

  update(id, payload, returnNew = false, eventName = '') {
    const { RepositoryEventHandler } = this._dependencies;

    return returnNew
      ? this._entity
        .findOneAndUpdate(
          { _id: id },
          { $set: payload },
          { new: true },
        )
        .exec()
        .then((result) => {
          if (!eventName) return result;

          RepositoryEventHandler.run(
            this._injection,
            this._entity,
            eventName,
            result,
          );

          return result;
        })
      : this._entity
        .updateOne(
          { _id: id },
          { $set: payload },
        ).exec();
  }

  updateMany(ids, payload) {
    return this._entity
      .updateMany(
        { _id: { $in: ids } },
        { $set: payload },
      ).exec();
  }

  push(id, fieldName, element, returnNew = false, eventName = '', manyValues = false) {
    const { RepositoryEventHandler } = this._dependencies;

    const update = manyValues && Array.isArray(element)
      ? { $push: { [fieldName]: { $each: element } } } : { $push: { [fieldName]: element } };

    return returnNew
      ? this._entity
        .findOneAndUpdate(
          { _id: id },
          update,
          { new: true },
        )
        .exec()
        .then((result) => {
          if (!eventName) return result;

          RepositoryEventHandler.run(
            this._injection,
            this._entity,
            eventName,
            result,
            {
              [fieldName]: element,
            },
          );

          return result;
        })
      : this._entity
        .updateOne(
          { _id: id },
          update,
        ).exec();
  }

  /**
   *
   * @param {Object} where - The clause to find document's
   * @param {String} fieldName - The document's array field from which items will be pushed
   * @param {Array} element - Value or array of values to be pushed.
   * @return {boolean|*}
   */
  pushMany(where, fieldName, element, manyValues = true) {
    const { Logger } = this._dependencies;

    const update = manyValues && Array.isArray(element)
      ? { $push: { [fieldName]: { $each: element } } } : { $push: { [fieldName]: element } };

    // VERIFY IF WHERE IS NOT {}, TO PREVENT UPDATE WIHOUT WHERE
    if (where && Object.keys(where).length && Object.values(where).length) {
      return this._entity
        .updateMany(
          where,
          update,
        )
        .exec()
        .then(result => result.nModified >= 1)
        .catch((e) => {
          Logger.error(e.message);
          throw new Error(`Erro ao atualizar entidade [${e.message}] - pushMany`);
        });
    }
    Logger.warn('Clausula where enviada está vazia, atualização de objeto negada - UPDATE WITHOUT WHERE');
    return false;
  }

  async pull(id, fieldName, element, returnNew = false, allowSizeZero = false, eventName = '', manyValues = false) {
    const {
      Logger,
      RepositoryEventHandler,
    } = this._dependencies;

    const update = manyValues
      ? { $pullAll: { [fieldName]: element } } : { $pull: { [fieldName]: element } };

    const whereSizeGtOne = {
      _id: id,
      [`${fieldName}.1`]: { $exists: true },
    };
    const whereSizeZeroAllowed = { _id: id };

    if (returnNew) {
      try {
        const oldData = await this._entity
          .findOne(allowSizeZero ? whereSizeZeroAllowed : whereSizeGtOne)
          .exec();

        const newData = await this._entity
          .findOneAndUpdate(
            allowSizeZero ? whereSizeZeroAllowed : whereSizeGtOne,
            update,
            { new: true },
          )
          .exec();

        if (!eventName) return newData;

        RepositoryEventHandler.run(this._injection, this._entity, eventName, oldData, newData);

        return newData;
      } catch (e) {
        Logger.error(`Erro ao executar o método pull no repositório de [${this._entity.modelName}]: ${e}`);
        return null;
      }
    }

    return this._entity.updateOne(
      allowSizeZero ? whereSizeZeroAllowed : whereSizeGtOne,
      update,
    ).exec();
  }

  /**
   * Remove all the array field items mathing the where clause.
   *
   * BE CAUTIOUS, this method will remove all the items it finds and has no security measure
   * to prevent the array from being empty.
   * @param {Object} where - The clause to find document's
   * @param {String} fieldName - The document's array field from which items will be removed
   * @param {Array} element - Value or array of values to be removed. If an object or objects
   * are to be removed, the objects passed must completely match the stored objects element to
   * be removed
   * @return {boolean|*}
   */
  pullMany(where, fieldName, element, manyValues = true) {
    const { Logger } = this._dependencies;

    const update = manyValues
      ? { $pullAll: { [fieldName]: element } } : { $pull: { [fieldName]: element } };

    // VERIFY IF WHERE IS NOT {}, TO PREVENT UPDATE WIHOUT WHERE
    if (where && Object.keys(where).length && Object.values(where).length) {
      return this._entity
        .updateMany(
          where,
          update,
        )
        .exec()
        .then(result => result.nModified >= 1)
        .catch((e) => {
          Logger.error(e.message);
          throw new Error(`Erro ao atualizar entidade [${e.message}] - pullMany`);
        });
    }
    Logger.warn('Clausula where enviada está vazia, atualização de objeto negada - UPDATE WITHOUT WHERE');
    return false;
  }

  create(payload) {
    return this._entity
      .create(payload);
  }

  createMany(payload) {
    return this._entity
      .insertMany(payload);
  }
}

module.exports = Repository;
