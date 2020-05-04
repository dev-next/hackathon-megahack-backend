const mongoose = require('mongoose');

let singleConnection = null;

const connectionConfig = {
  dev: {
    URI: process.env.DATABASE_URI,
    options: {
      poolSize: 5,
      autoIndex: true,
      useNewUrlParser: true,
    },
  },
};

function getConnection() {
  if (!singleConnection) {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', process.env.NODE_ENV === 'dev');
    singleConnection = mongoose
      .createConnection(
        connectionConfig[process.env.NODE_ENV || 'dev'].URI,
        connectionConfig[process.env.NODE_ENV || 'dev'].options,
      );
  }

  return singleConnection;
}

module.exports = getConnection;

