const MakeParams = async (data, injection) => {
  let newData = Object.assign(data, {});

  if (data.name) {
    newData = {
      ...newData,
      name: { $regex: `${data.name}`, $options: 'i' },
    };
  }

  if (data.phone) {
    newData = {
      ...newData,
      phone: { $regex: new RegExp(`^${data.phone}`), $options: 'i' },
    };
  }

  if (data.type) {
    newData = {
      ...newData,
      type: data.type,
    };
  }

  return {
    ...newData,
    type: 'SELLER',
    active: true,
  };
};

module.exports = MakeParams;
