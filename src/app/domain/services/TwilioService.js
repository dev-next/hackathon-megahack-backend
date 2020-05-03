const internalDependencies = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  twilio: require('twilio'),
};

class TwilioService {
  static sms(data, externalDependencies) {
    const {
      accountSid,
      authToken,
      twilio,
    } = Object.assign({}, internalDependencies, externalDependencies);

    const client = new twilio(accountSid, authToken);

    client.messages.create({
      body: data.body,
      to: data.to,
      from: data.from,
    })
      .then((message) => {
        console.log(message);
        return true;
      })
      .catch(() => false);
  }
}

module.exports = TwilioService;
