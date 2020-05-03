function GenerateUsersMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const sysActionMongoSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'users' },
    hash: { type: String, required: true },
    action: {
      type: String,
      required: true,
      uppercase: true,
      enum: [
        'FORGOT_PASS',
        'FINISH_ACCOUNT',
        'INVITE_USER',
      ],
    },
    metadata: { type: String, required: false },
    expirationDate: { type: Date, required: true },
    creationDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });

  return connection.model('sysActions', sysActionMongoSchema);
}

module.exports = injection => GenerateUsersMongoSchema(injection);
