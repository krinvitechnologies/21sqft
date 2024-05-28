import validator from 'validator';
import Enquiry from '../models/sendEnquiryModel.js';
import { Contractor } from "../models/contractorModel.js";
import nodemailer from 'nodemailer';

export const sendEnquiry = async (req, res) => {
    try {
        const { id: businessId } = req.params;
        const { name, phoneNo, email: senderEmail, message } = req.body;

        // Validation checks
        if (!name || !phoneNo || !senderEmail || !message) {
            return res.status(400).json({ success: false, message: "All Fields Are Required" });
        }

        if (!senderEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Sender's Email" });
        }

        if (!validator.isEmail(senderEmail)) {
            return res.status(400).json({ error: "Invalid Sender's Email" });
        }

        if (phoneNo.length !== 10 || !/^[0-9]{10}$/.test(phoneNo)) {
            return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
        }

        if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
            return res.status(400).json({ message: 'Please enter a valid phone number' });
        }

        // Fetch details of the business
        const business = await Contractor.findById(businessId);

        if (!business) {
            return res.status(404).json({ success: false, message: "Business not found" });
        }

        const enquiry = new Enquiry({
            business: businessId,
            name,
            phoneNo,
            email: senderEmail,
            message
        });

        const createdEnquiry = await enquiry.save();

        sendEmailNotification(name, senderEmail, message, business); // Call function to send email with sender's email and business details

        if (createdEnquiry) {
            res.status(201).json({ success: true, message: 'Enquiry sent successfully', enquiry: createdEnquiry });
        } else {
            res.status(400).json({ success: false, message: 'Failed to send enquiry' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Function to send email notification
const sendEmailNotification = async (name, senderEmail, message, business) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL_ID,
            pass: process.env.NODEMAILER_EMAIL_ID_PASSWORD
        }
    });

    const mailOptions = {
        from: senderEmail,
        to: 'info@krinvitech.com',
        subject: 'New Enquiry Received',
        text: `Hello,\n\nYou have received a new enquiry from ${name} (${senderEmail}).\n\nHere are the details:\n\n- Message: ${message}\n\n- Business Name: ${business.name}\n- Business Address: ${business.address}\n- Business Phone: ${business.phone}\n- Business Email: ${business.email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
