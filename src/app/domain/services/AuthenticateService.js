const internalDependencies = {
  StoreRepository: require('../infrastructure/repository/StoreRepository'),
  UserRepository: require('../infrastructure/repository/UserRepository'),
  mongoose: require('mongoose'),
  bcrypt: require('bcrypt'),
  jwt: require('jsonwebtoken'),
};

class AuthenticateService {
  static async user(data, externalDependencies) {
    const {
      StorePersistentModel,
      AuthenticationError,
      UserPersistentModel,
      StoreRepository,
      UserRepository,
      mongoose,
      bcrypt,
      jwt,
    } = Object.assign({}, internalDependencies, externalDependencies);

    try {
      const user = await new UserRepository(externalDependencies, UserPersistentModel)
        .findOneByWhere({ phone: data.phone });
      const stores = await new StoreRepository(externalDependencies, StorePersistentModel)
        .find({
          _id: { $in: user.stores.map(store => mongoose.Types.ObjectId(store)) },
        }, undefined, undefined, {
          _id: 1,
          name: 1,
        });

      if (!user) {
        throw new AuthenticationError('Usuário não encontrado! Já verificou se o telefone está correto?');
      }

      const valid = await bcrypt.compare(data.password, user.password);

      if (valid && user.active) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          type: user.type,
          stores: stores.map(store => ({
            name: store.name,
            id: store._id,
          })),
        };

        return {
          // add your encryption key here
          token: jwt.sign(payload, process.env.API_KEY),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            type: user.type,
            stores: stores.map(store => ({
              name: store.name,
              id: store._id,
            })),
          }
        };
      } else {
        throw new AuthenticationError('Ops, parece que os seus dados não estão corretos. Corriga o telefone ou a senha e tente novamente');
      }
    } catch (e) {
      throw new Error(`Telefone ou senha do usuário ${data.phone} incorretos`);
    }
  }

  static userFromToken({ id }, externalDependencies) {
    const {
      UserPersistentModel,
      UserRepository,
    } = Object.assign({}, internalDependencies, externalDependencies);
    return new UserRepository(externalDependencies, UserPersistentModel)
        .findOne(id);
  }
}

module.exports = AuthenticateService;


