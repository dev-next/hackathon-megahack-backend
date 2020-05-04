const internalDependencies = {
  mongoose: require('mongoose'),
};

const MakeParams = async (data, injection) => {
  const {
    UserLogged,
    mongoose,
  } = Object.assign({}, internalDependencies, injection);

  let newData = Object.assign(data, {});

  if (data.name) {
    newData = {
      ...newData,
      name: { $regex: `${data.name}`, $options: 'i' },
    };
  }

  if (data.customer) {
    newData = {
      ...newData,
      customer: mongoose.Types.ObjectId(data.customer),
    };
  }

  if (data.seller) {
    newData = {
      ...newData,
      seller: mongoose.Types.ObjectId(data.seller),
    };
  }

  return {
    ...newData,
    active: true,
  };
};

module.exports = MakeParams;
