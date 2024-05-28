import { GetInTouchUser } from "../models/getInTouchModel.js";

// get in touch with us
export const getInTouch = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Validation checks
    if (!name || !email || !phone || !message) {
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

    const userCreated = await GetInTouchUser.create({
      name,
      phone,
      email,
      message,
    });

    res.status(200).json({
      message: "Message send successfully",
    });

  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
