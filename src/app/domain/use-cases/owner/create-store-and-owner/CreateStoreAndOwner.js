const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  StoreRepository: require('../../../infrastructure/repository/StoreRepository'),
  bcrypt: require('bcrypt'),
};

const CreateStoreAndOwner = async (data, injection) => {
  const {
    StorePersistentModel,
    UserPersistentModel,
    StoreRepository,
    UserRepository,
    bcrypt,
  } = Object.assign({}, dependencies, injection);

  try {
    const store = await new StoreRepository(injection, StorePersistentModel).create(data.store);

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(data.user.password, salt);

    return new UserRepository(injection, UserPersistentModel).create({
      ...data.user,
      type: 'STORE_OWNER',
      stores: [store._id],
      password,
    });
  } catch (e) {
    throw new Error(`Error on create User, ${e.message}`);
  }
};

module.exports = CreateStoreAndOwner;
