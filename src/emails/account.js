const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (to, name) => {
    sgMail.send({
        to,
        from: 'welcome@maiorini.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know what you think about the app.`
    })
}

const sendCancellationEmail = (to, name) => {
    sgMail.send({
        to,
        from: 'cancel@maiorini.com',
        subject: 'Sorry to see you go...',
        text: `${name}, we see that you cancelled your account.  Sorry to see you go. Let us know if there is anything you think we can do to improve.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}