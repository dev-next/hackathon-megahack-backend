const internalDependencies = {
  mongoose: require('mongoose'),
};

const MakeCatalogueParamsToFind = async (data, injection) => {
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

  if (data.slug) {
    newData = {
      ...newData,
      slug: { $regex: `${data.slug}`, $options: 'i' },
    };
  }

  if (data.seller) {
    newData = {
      ...newData,
      seller: mongoose.Types.ObjectId(data.seller),
    };
  }

  if (data.customer) {
    newData = {
      ...newData,
      customer: mongoose.Types.ObjectId(data.customer),
    };
  }

  return {
    ...newData,
    store: { $in: UserLogged.stores.map(store => mongoose.Types.ObjectId(store.id)) },
    active: true,
  };
};

module.exports = MakeCatalogueParamsToFind;
