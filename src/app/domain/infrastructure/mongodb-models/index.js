const dependencies = {
	Schema: require('mongoose').Schema,
};
let mappingObjects = null;
function MappingObjects(injection) {
  const { Schema } = Object.assign({}, dependencies, injection);
  let { conn } = Object.assign({}, dependencies, injection);
  if (!conn) {
    conn = require('../factory/ConnectionFactory')();
  }
  if (!mappingObjects) {
    mappingObjects = {
      UserPersistentModel: require('./UserPersistentModel')({ connection: conn, Schema }),
      ItemPersistentModel: require('./ItemPersistentModel')({ connection: conn, Schema }),
      StorePersistentModel: require('./StorePersistentModel')({ connection: conn, Schema }),
      OrderPersistentModel: require('./OrderPersistentModel')({ connection: conn, Schema }),
      SysActionPersistentModel: require('./SysActionPersistentModel')({ connection: conn, Schema }),
      CataloguePersistentModel: require('./CataloguePersistentModel')({ connection: conn, Schema }),
    }
  }
  return mappingObjects;
}

module.exports = injection => MappingObjects(injection);
