const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

class TwilioService {
  static sms(data) {
    client.messages.create({
      body: data.body,
      to: `+55${data.to}`,
      from: process.env.TWILIO_NUMBER_SMS,
    })
      .then((message) => {
        console.log(message);
        return true;
      })
      .catch(() => false);
  }

  static whatsapp(data) {
    client.messages
      .create({
         body: data.body,
         to: `whatsapp:+55${data.to}`,
         from: `whatsapp:${process.env.TWILIO_NUMBER_WHATSAPP}`,
       })
        .then((message) => {
          console.log(message);
          return true;
        })
        .catch((e) => {
          console.log(e);
          return false;
        })
        .done();
  }
}

module.exports = TwilioService;
