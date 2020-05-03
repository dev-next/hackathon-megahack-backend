function GenerateOrdersMongoSchema(injection) {
  const {
    connection,
    Schema,
  } = Object.assign({}, injection);
  const orderMongoSchema = new Schema({
    name: { type: String, required: true },
    number: Number,
    value: Number,
    store: { type: Schema.Types.ObjectId, ref: 'stores' },
    delivery: {
      location: {
        country: String,
        state: String,
        city: String,
        number: String,
        neighborhood: String,
        zipcode: String,
      },
      type: {
        type: String,
        uppercase: true,
        default: 'STORE',
        enum: ['HOME', 'STORE'],
      },
      dates: Date,
      period: [{
        type: String,
        uppercase: true,
        default: 'MORNING',
        enum: ['MORNING', 'AFTERNOON']
      }],
      shipment: Number,
    },
    payment: {
      method: {
        type: String,
        uppercase: true,
        default: 'MONEY',
        enum: ['MONEY', 'CREDIT_CARD'],
      },
      needChange: Boolean,
      changeTo: Number,
    },
    items: [{
      fromItem: { type: Schema.Types.ObjectId, ref: 'items' },
      name: String,
      value: Number,
      description: String,
      fields: [{
        label: String,
        value: String,
      }],
    }],
    customer: {
      fromUser: {type: Schema.Types.ObjectId, ref: 'users'},
      name: String,
      email: String,
      phone: String,
      tags: [String],
    },
    seller: { type: Schema.Types.ObjectId, ref: 'users' },
    active: { type: Boolean, default: true },
  }, { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } });
  return connection.model('orders', orderMongoSchema);
}

module.exports = injection => GenerateOrdersMongoSchema(injection);
