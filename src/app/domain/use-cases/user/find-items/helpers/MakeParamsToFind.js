const MakeParams = async (data, injection) => {
  let newData = Object.assign(data, {});

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
    active: true,
  };
};

module.exports = MakeParams;
