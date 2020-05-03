const internalDependencies = {
  mongoose: require('mongoose'),
  omit: require('lodash/omit'),
};

const MakeParams = async (data, injection) => {
  const {
    UserLogged,
    mongoose,
    omit,
  } = Object.assign({}, internalDependencies, injection);

  let newData = Object.assign({ ...omit(data, 'ids') }, {});

  if (data.name) {
    newData = {
      ...newData,
      name: { $regex: `${data.name}`, $options: 'i' },
    };
  }

  if (data.email) {
    newData = {
      ...newData,
      email: { $regex: `${data.email}`, $options: 'i' },
    };
  }

  if (data.documentNumber) {
    newData = {
      ...newData,
      documentNumber: { $regex: `${data.documentNumber}`, $options: '^i' },
    };
  }

  if (data.phones && data.phones.length) {
    const regex = new RegExp(data.phones.join('|'));

    newData = {
      ...newData,
      phones: { $in: regex },
    };
  }

  return {
    ...newData,
    _id: { $in: UserLogged.stores.map(store => mongoose.Types.ObjectId(store.id)) },
    active: true,
  };
};

module.exports = MakeParams;
