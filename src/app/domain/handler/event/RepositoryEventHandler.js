const Logger = require('../../../utils/Logger');

class RepositoryEventHandler {
  static run(injection, entity, eventName, ...params) {
    const entityName = entity.modelName;
    if (this[entityName]) return this[entityName](injection, eventName, ...params);

    Logger.error(`Manipulador de eventos não encontrado para [${entityName}]`);
    return null;
  }
}

module.exports = RepositoryEventHandler;
