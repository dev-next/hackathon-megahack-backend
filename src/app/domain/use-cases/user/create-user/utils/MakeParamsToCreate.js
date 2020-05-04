const dependencies = {
  bcrypt: require('bcrypt'),
};

const MakeParams = async (data, injection) => {
  const { bcrypt } = Object.assign({}, dependencies, injection);

  let newData = Object.assign(data, {});

  if (data.password) {
    try {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(data.password, salt);

      newData = {
        ...newData,
        password,
      };
    } catch (e) {
      throw new Error(`Erro ao criar senha, ${e.message}`);
    }
  }

  return newData;
};

module.exports = MakeParams;
