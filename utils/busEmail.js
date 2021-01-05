/* eslint-disable max-classes-per-file */
/* eslint-disable prettier/prettier */

const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

class BusEmail {
  constructor(busUser, url) {
    this.to = busUser.businessEmail;
    this.businessName = busUser.businessName;
    this.url = url;
    this.from = `RiraPay for Business <${process.env.BUSEMAIL_FROM}>`;
  }

  newBusTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '52acecb7402fcd',
        pass: '680a66ed5297bf',
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      businessName: this.businessName,
      url: this.url,
      subject,
    });
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newBusTransport().sendMail(mailOptions);
  }

  async sendBusWelcome() {
    await this.send(
      'buswelcome',
      'Welcome to the RiraPay for Business Family!'
    );
  }

  async sendVerifyEmail() {
    await this.send('busVerifyEmail', 'Kindly Verify Your Email');
  }

  async sendPasswordReset() {
    await this.send(
      'busForgotPassEmail',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}

module.exports = {
  BusEmail: BusEmail,
};
