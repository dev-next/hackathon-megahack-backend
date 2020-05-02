const dependencies = {
  UserRepository: require('../../../infrastructure/repository/UserRepository'),
  bcrypt: require('bcrypt'),
};

const FinishRegister = async (data, injection) => {
  const {
    UserPersistentModel,
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

module.exports = FinishRegister;
