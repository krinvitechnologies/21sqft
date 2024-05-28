import validator from "validator";
import { Subscribe } from "../models/subscribeModel.js";
import nodemailer from "nodemailer";

// save & SEND the email
export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return res.status(400).json({ success: false, message: "Invalid Email" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid Email' });
  }

  const userExist = await Subscribe.findOne({ email: email });
  if (userExist) {
    return res.status(400).json({ msg: "You have already subscribed" });
  } else {
    const userCreated = new Subscribe({ email: email });
    await userCreated.save();
    async function sendMail() {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
      const mailOptions = {
        from: "kapilt749@gmail.com",
        to: email,
        subject: "21SqFt subscription",
        text: "Congratulation now you have 21SqFt Subscription",
      };
      try {
        const result = await transporter.sendMail(mailOptions);
        // console.log("Email sent successfully");
      } catch (error) {
        console.log("Email send fail with error", error);
      }
    }
    sendMail();

    res
      .status(200)
      .send({ status: "success", message: "Subscribe successfully" });
  }
};
