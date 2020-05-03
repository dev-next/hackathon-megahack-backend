const MakeParams = async (data, injection) => {
  let newData = Object.assign(data, {});
  const { UserLogged } = injection;

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
    store: { $in: UserLogged.stores.map(store => store.id.toString()) },
    active: true,
  };
};

module.exports = MakeParams;
