const internalDependencies = {
  UserRepository: require('../infrastructure/repository/UserRepository'),
  Logger: require('../../utils/Logger'),
  bcrypt: require('bcrypt'),
  jwt: require('jsonwebtoken'),
};

class AuthenticateService {
  static async user(data, externalDependencies) {
    const {
      AuthenticationError,
      UserPersistentModel,
      UserRepository,
      bcrypt,
      Logger,
      jwt,
    } = Object.assign({}, internalDependencies, externalDependencies);

    try {
      const user = await new UserRepository(externalDependencies, UserPersistentModel)
        .findOneByWhere({ phone: data.phone });

      if (!user) {
        Logger.warn(`Usuário ${data.phone} não encontrado`);
        throw new AuthenticationError('Usuário no encontrado! Já verificou se o e-mail está correto?');
      }

      const valid = await bcrypt.compare(data.password, user.password);

      if (valid && user.active) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          type: user.type,
          stores: user.stores,
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
            stores: user.stores,
          }
        };
      } else {
        Logger.warn(`Telefone ou senha do usuário ${data.phone} incorretos`);
        throw new AuthenticationError('Ops, parece que os seus dados não estão corretos. Corriga o telefone ou a senha e tente novamente');
      }
    } catch (e) {
      Logger.warn(`Telefone ou senha do usuário ${data.phone} incorretos`);
      throw e;
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


