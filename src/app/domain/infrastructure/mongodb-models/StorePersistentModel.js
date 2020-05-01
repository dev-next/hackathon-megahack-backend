function GenerateStoresMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const storeMongoSchema = new Schema({
    email: String,
    name: { type: String, required: true },
    document_number: {
      type: String,
      required: true,
      index: { unique: true },
    },
    location: {
      zipcode: { type: String },
      country: { type: String },
      city: { type: String },
      state: { type: String },
      street: { type: String },
      number: { type: Number },
      neighborhood: { type: String },
      complements: { type: String },
    },
    opening_hours: [{
      weekday: String,
      range: {
        start: Date,
        end: Date,
      },
    }],
    phones: [String],
    logo: String,
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });
  return connection.model('stores', storeMongoSchema);
}

module.exports = injection => GenerateStoresMongoSchema(injection);
