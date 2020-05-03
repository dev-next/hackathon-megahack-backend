const MakeCatalogueParamsToFind = async (data, injection) => {
  let newData = Object.assign(data, {});
  const { UserLogged } = injection;

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
      seller: data.seller.toString(),
    };
  }

  if (data.customer) {
    newData = {
      ...newData,
      customer: data.customer.toString(),
    };
  }

  return {
    ...newData,
    store: { $in: UserLogged.stores.map(store => store.id.toString()) },
    active: true,
  };
};

module.exports = MakeCatalogueParamsToFind;
