import nodemailer from "nodemailer";

export default async function ContactAPI(req, res){
    const { name, email, option, budget, message } = req.body;

    const data = {
        name, email, option, budget, message,
    }

    // const user = "joobyrumi@gmail.com";
    const user = process.env.DB_USER;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: user,
            // pass: "jehfxkxkctpelgki",
            pass: process.env.DB_PASS,
        }
    });

    try {
        const mail = await transporter.sendMail({
            from: user,
            to: "joobyrumi@gmail.com",
            replyTo: email,
            subject: `Contact From Submission from ${name}`,
            html: `
            <p> Name: ${name} </p>
            <p> Email: ${email} </p>
            <p> Option: ${option} </p>
            <p> Budget: ${budget} </p>
            <p> Message: ${message} </p>
            `
        });

        console.log("Message sent:", mail.messageId);

        return res.status(200).json({message: "success"});
    } catch (error) {
        //resubmission logic should be done here
        console.log(error);
        res.status(500).json({
            message: "Cound not send the email. Your messaga was not sent",
        });
    }
}