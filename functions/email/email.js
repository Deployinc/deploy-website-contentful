const nodemailer = require('nodemailer');
const path = require('path');
const fetch = require('node-fetch');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

exports.handler = async (event, context, callback) => {
  if(event.httpMethod === 'OPTIONS') {
    const headers = {};
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400';
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    
    return {
      headers,
      statusCode: 200,
      body: "CORS enabled"
    };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*"
  };

  if(event.httpMethod !== 'POST')
    return { headers, statusCode: 405, body: JSON.stringify({ success: false, error: "Method not allowed." }) };

  const body = JSON.parse(event.body);
  const {
    firstName,
    email,
    phone,
    message,
    recaptcha
  } = body;

  if(!firstName || !email || !phone || !message || !recaptcha) {
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ success: false, error: "All fields are required." })
    }
  }

  if(!tester.test(email) || email.length > 256) {
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ success: false, error: "Email address is not valid." })
    }
  }
  
  try {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${recaptcha}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if(!data.success) {
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify({ success: false, error: 'Google Recaptcha is invalid.' })
      }
    }

  } catch(err) {
    console.log(err);
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ success: false, error: 'Google Recaptcha is invalid.' })
    }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const html = `
    <b>Name: </b> ${firstName} <br>
    <b>Email: </b> ${email} <br>
    <b>Phone Number: </b> ${phone} <br>
    <b>Message: </b> ${message}
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'biz@deployinc.com',
    subject: 'Deploy Inc. Website | Contact Form Submited',
    html
  };

  try {
    const { error } = await transporter.sendMail(mailOptions);
    if(error) {
      console.log(error);
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify({ success: false, error: 'An unknown error occurred.' })
      }
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch(err) {
    console.log(err);
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ success: false, error: 'An unknown error occurred.' })
    }
  }
}
