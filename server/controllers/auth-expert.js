import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Expert } from "../models/expert-model";
import ConfirmationCode from "../models/confirmationCode-model";
dotenv.config();

// Configure the transporter with Ethereal Email credentials

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_AUTH_USER, // provide owners email 
    pass: process.env.MAIL_AUTH_PASSWORD, // provide your app-password not he gmail account password
  },
});
export const authorizeExpert = async (req, res) => {
  const { email, name , phoneNo, expertise , field, jobTitle } = req.body;

  const expert = new Expert({ email: email, name: name });
  await expert.save();

  const info = await transporter.sendMail({
    from: `"${name}" <${email}>`,
    to: "<owner's email>",
    subject: "User Registration Request",
    text: `Hello, I would like to register on Sarthi. My email is ${email}.`,
    html: `<p>A new expert has registered with the following details:</p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone No:</strong> ${phoneNo}</li>
                <li><strong>Expertise:</strong> ${expertise}</li>
                <li><strong>Field:</strong> ${field}</li>
                <li><strong>Job Title:</strong> ${jobTitle}</li>
            </ul>
            <p>Please authorize this registration by clicking the following link:</p>`,//send the url for sharing the confirmation code where the owner has
            //to give the email of the user and the code will generated auto,atically and will be sent to the experts email.
  });

  console.log("Message sent: %s", info.messageId);
  res.json({ message: "Registration request sent to app owner" });
};

export const sendConfirmationCode = async (req,res) => {
    const confirmationCode = uuidv4();// new Id generated
    if(!confirmationCode){throw new Error("code not generated")}
    console.log(confirmationCode," : confirmation code") ;
   
    const {email,name} = req.body; // assuming this is the user's email provided in the request body
    console.log(name)

    await ConfirmationCode.create({ email: email, code: confirmationCode });

    const info = await transporter.sendMail({
        from: '"App Owner" <owners_email>',
        to: email,
        subject: "Registration Confirmation",
        text: `Hello, Please confirm your registration by entering the following code: ${confirmationCode}`,
    });

    console.log("Confirmation email sent: %s", info.messageId);
    res.json({ message: 'Confirmation code sent to user' });
};
export const confirmExpert = async (req, res) => {
    const { email, confirmationCode } = req.body;

    const codeEntry = await ConfirmationCode.findOne({ email: email, code: confirmationCode });

    if (codeEntry) {
      const info = await transporter.sendMail({
        from: '"App Owner" <OWNERS_EMAIL>',
        to: email,
        subject: "Request Accepted",
        text: `Hello, Your registration request was accepted`,
    });
    console.log("email sent successfully",info.messageId) ;
    res.json({ message: 'User confirmed successfully' });
    // Optionally, you can delete the code entry from the database
    await ConfirmationCode.deleteOne({ _id: codeEntry._id });
     //redirect the user to the registration page ...
        res.json({ message: 'User confirmed successfully' });
        // Optionally, you can delete the code entry from the database
        await ConfirmationCode.deleteOne({ _id: codeEntry._id }); //redirect the user to the registration page ..
    } else {
        res.status(400).json({ message: 'Invalid confirmation code' });
    }
};