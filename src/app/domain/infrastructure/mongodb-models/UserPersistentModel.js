function GenerateUsersMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const userMongoSchema = new Schema({
    name: { type: String, required: true },
    email: {
      type: String,
      required: false,
      lowercase: true,
      index: { unique: true },
    },
    password: String,
    phone: {
      type: String,
      required: true,
      index: { unique: true },
    },
    type: {
      type: String,
      uppercase: true,
      default: 'CUSTOMER',
      enum: ['CUSTOMER', 'STORE_OWNER', 'SELLER'],
    },
    stores: [String],
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });
  return connection.model('users', userMongoSchema);
}

module.exports = injection => GenerateUsersMongoSchema(injection);
