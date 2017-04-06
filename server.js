const express = require('express')
const app = express()

module.exports = app

app.get('/response', (req, res) => {
  console.log(req.headers)

  if (req.query.key !== process.env.KEY) {
    res.status(403).send('Access denied.')
  }

  const nodemailer = require('nodemailer')

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: process.env.NOTIFIED_EMAIL, // list of receivers
    subject: req.query.userId, // Subject line
    text: req.query.proId, // plain text body
    html: `<p>${JSON.stringify(req.query)}</p>` // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
  res.redirect(process.env.REDIRECT)
})
