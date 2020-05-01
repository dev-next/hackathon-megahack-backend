const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  StoreRepository: require('../../../infrastructure/repository/StoreRepository'),
  CreatePassword: require('../../../../utils/CreatePassword'),
};

const CreateStoreAndOwner = async (data, injection) => {
  const {
    StorePersistentModel,
    UserPersistentModel,
    StoreRepository,
    UserRepository,
    Logger,
  } = Object.assign({}, dependencies, injection);

  console.log(injection);
  try {
    const store = await new StoreRepository(injection, StorePersistentModel).create(data.store);

    return new UserRepository(injection, UserPersistentModel).create({
      ...data.user,
      type: 'STORE_OWNER',
      stores: [store._id],
    });
  } catch (e) {
    Logger.warn(e.message);
    throw new Error(`Error on create User, ${e.message}`);
  }
};

module.exports = CreateStoreAndOwner;
