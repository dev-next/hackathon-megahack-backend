function GenerateCalalogueMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const catalogueMongoSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    photos: [String],
    value: Number,
    tags: [String],
    fields: [{
      label: String,
      value: String,
    }],
    store: { type: Schema.Types.ObjectId, ref: 'stores' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });
  return connection.model('catalogues', catalogueMongoSchema);
}

module.exports = injection => GenerateCalalogueMongoSchema(injection);
