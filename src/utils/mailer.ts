import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    
    },

});

export function sendPinParent(email: string, firstName: string, pin: string) {
    return transporter.sendMail({
        from: "My Blooming",
        to: email,
        subject: "Code PIN de votre enfant ",
        html: `<p>Bonjour,</p>
           <p>Le code PIN de votre enfant <strong>${firstName}</strong> est : <strong>${pin}</strong></p>
           <p>Merci d'utiliser notre plateforme !</p>`

    })
}