function GenerateUsersMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const userMongoSchema = new Schema({
    name: { type: String, required: true },
    email: String,
    password: String,
    phone: {
      type: String,
      required: true,
      lowercase: true,
      index: { unique: true },
    },
    type: {
      type: String,
      uppercase: true,
      default: 'CUSTOMER',
      enum: ['CUSTOMER', 'STORE_OWNER', 'SELLER'],
    },
    photo: String,
    stores: [String],
    invite: {
      invitedBy: { type: Schema.Types.ObjectId, ref: 'users' },
      status: {
        type: String,
        uppercase: true,
        default: 'PENDING',
        enum: ['PENDING', 'ACCEPTED'],
      },
    },
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });

  return connection.model('users', userMongoSchema);
}

module.exports = injection => GenerateUsersMongoSchema(injection);
