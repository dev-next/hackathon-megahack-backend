const internalDependencies = {
  mongoose: require('mongoose'),
};

const MakeParams = async (data, injection) => {
  let newData = Object.assign(data, {});
  const {
    UserLogged,
    mongoose,
  } = Object.assign({}, internalDependencies, injection);

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

  return {
    ...newData,
    store: { $in: UserLogged.stores.map(store => mongoose.Types.ObjectId(store.id)) },
    active: true,
  };
};

module.exports = MakeParams;
