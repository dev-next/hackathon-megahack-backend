function GenerateCalalogueMongoSchema(injection) {
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
    seller: { type: Schema.Types.ObjectId, ref: 'users' },
    customer: { type: Schema.Types.ObjectId, ref: 'customer' },
    store: { type: Schema.Types.ObjectId, ref: 'stores' },
    items: [{
      name: { type: String, required: true },
      description: String,
      photos: [String],
      value: Number,
      tags: [String],
      fields: [{
        label: String,
        value: String,
      }],
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });
  return connection.model('catalogues', catalogueMongoSchema);
}

module.exports = injection => GenerateCalalogueMongoSchema(injection);
