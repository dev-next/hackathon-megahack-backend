function GenerateCatalogueMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const catalogueMongoSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    slug: {
      type: String,
      required: true,
      lowercase: true,
      index: { unique: true },
    },
    store: {
      type: Schema.Types.ObjectId, ref: 'stores',
      required: true,
    },
    items: [{
      type: Schema.Types.ObjectId, ref: 'items',
      required: true,
    }],
    seller: { type: Schema.Types.ObjectId, ref: 'users' },
    customer: { type: Schema.Types.ObjectId, ref: 'customer' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });
  return connection.model('catalogues', catalogueMongoSchema);
}

module.exports = injection => GenerateCatalogueMongoSchema(injection);
