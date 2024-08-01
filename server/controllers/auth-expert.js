import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

// Configure the transporter with Ethereal Email credentials

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_AUTH_USER,        // replace with your Ethereal email
        pass: process.env.MAIL_AUTH_PASSWORD     // replace with your Ethereal email password
    }
});

const sendAuthorizationEmail = async (expert) => {
    const mailOptions = {
        from: process.env.MAIL_AUTH_USER,      // replace with your Ethereal email
        to: 'samarthmanojhapse96.0@gmail.com',     // replace with owner's email
        subject: 'New Expert Registration Authorization',

        // text: `A new expert has registered with the following details:\n\n
        //        Name: ${expert.name}\n
        //        Email: ${expert.email}\n
        //        Phone No: ${expert.phoneNo}\n
        //        Expertise: ${expert.expertise}\n
        //        Field: ${expert.field}\n
        //        Job Title: ${expert.jobTitle}\n\n
        //        Please authorize this registration by clicking the following link:\n
        //       ${process.env.SERVER_ADDRESS}/api/v1/expert/authorize?email=${expert.email}`

        //OR

        html: `
            <p>A new expert has registered with the following details:</p>
            <ul>
                <li><strong>Name:</strong> ${expert.name}</li>
                <li><strong>Email:</strong> ${expert.email}</li>
                <li><strong>Phone No:</strong> ${expert.phoneNo}</li>
                <li><strong>Expertise:</strong> ${expert.expertise}</li>
                <li><strong>Field:</strong> ${expert.field}</li>
                <li><strong>Job Title:</strong> ${expert.jobTitle}</li>
            </ul>
            <p>Please authorize this registration by clicking the following link:</p>
            <a href="${process.env.SERVER_ADDRESS}/authorize?email=${expert.email}" target="_blank">
                Click on this link to authorize. 
            </a>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Authorization email sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send authorization email');
    }
};

export default sendAuthorizationEmail;
