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

  if (data.tags && data.tags.length) {
    const regex = new RegExp(data.tags.join('|'));

    newData = {
      ...newData,
      tags: { $in: regex },
    };
  }

  if (data.ids && data.ids.length) {
    newData = {
      ...newData,
      _id: { $in: data.ids.map(id => mongoose.Types.ObjectId(id)) },
    };
  }

  return {
    ...newData,
    store: { $in: UserLogged.stores.map(store => mongoose.Types.ObjectId(store.id)) },
    active: true,
  };
};

module.exports = MakeParams;
