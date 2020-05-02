const internalDependencies = {
  UserRepository: require('../infrastructure/repository/UserRepository'),
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
      jwt,
    } = Object.assign({}, internalDependencies, externalDependencies);

    try {
      const user = await new UserRepository(externalDependencies, UserPersistentModel)
        .findOneByWhere({ phone: data.phone });

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


