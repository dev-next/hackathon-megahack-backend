const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');

class TwilioService {
  static sms(data) {
    const client = new twilio(accountSid, authToken);
    client.messages.create({
      body: data.body,
      to: '+5514988014891',
      from: process.env.TWILIO_NUMBER_SMS,
    })
      .then(() => true)
      .catch((e) => new Error(e));
  }

  static whatsapp(data) {
    const client = new twilio(accountSid, authToken);
    client.messages
      .create({
         body: data.body,
         to: 'whatsapp:+5514988014891',
         from: `whatsapp:${process.env.TWILIO_NUMBER_WHATSAPP}`,
       })
        .then(() => true)
        .catch((e) => new Error(e))
        .done();
  }
}

module.exports = TwilioService;
