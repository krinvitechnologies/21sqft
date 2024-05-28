import validator from "validator";
import { Contact } from "../models/contactusModel.js";

// contact us
export const contactUs = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validation checks
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ success: false, message: "All Fields Are Required" });
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid Email' });
    }

    if (phone.length !== 10 || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
    }

    if (!validator.isMobilePhone(phone, 'en-IN')) {
      return res.status(400).json({ message: 'Please enter a valid phone number' });
    }

    // Creating a new contact
    const newContact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
    });

    // Sending a success response with a status code of 200
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error occurred while sending message:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
