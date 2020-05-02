function GenerateItemsMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const storeMongoSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    photos: [String],
    value: Number,
    tags: [String],
    fields: [{
      type: { type: String },
      label: String,
      value: String,
    }],
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });
  return connection.model('items', storeMongoSchema);
}

module.exports = injection => GenerateItemsMongoSchema(injection);
