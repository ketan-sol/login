const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')
dotenv.config()
sgMail.setApiKey("process.env.API_KEY")

const login_email =  () => {
    const msg = {
        to: 'ketan@solulab.com', // Change to your recipient
        from: 'ketan@solulab.com', // Change to your verified sender
        subject: "Login Verification",
        text: "Login successful",
        html: 'User logged in'
    }
     sgMail.send(msg)
}

const signUp_email =  () => {
    const msg = {
        to: 'ketan@solulab.com', // Change to your recipient
        from: 'ketan@solulab.com', // Change to your verified sender
        subject: "SignUp Verification",
        text: "Login successful",
        html: 'New user registered'
    }
     sgMail.send(msg)
}

 module.exports = {login_email,signUp_email}
