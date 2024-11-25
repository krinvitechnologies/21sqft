import React, { useState } from 'react'
import './sendenquiry.css'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch } from 'react-redux';
import { sendEnquiry } from '../../redux/actions/sendEnquiryAction';
import validator from 'validator';
import { toast } from 'react-toastify';

function Send({ open, setOpen, businessId }) {

    const [name, setName] = useState()
    const [phoneNo, setPhoneNo] = useState()
    const [email, setEmail] = useState()
    const [message, setMessage] = useState()

    const dispatch = useDispatch();

    const handleSendEnquiry = (e) => {
        e.preventDefault();

        // Create an object with enquiry details
        const enquiryDetails = {
            name,
            phoneNo,
            email,
            message
        };

        if (!name || !phoneNo || !email || !message) {
            toast.error("All fields are required");
        } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            toast.error("Invalid Email")
        } else if (!validator.isEmail(email)) {
            toast.error("Invalid Email");
        } else if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
            toast.error('Please enter a valid phone number');
        } else {
            dispatch(sendEnquiry(businessId, enquiryDetails));
            setOpen(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth={true} // Set to true to make the dialog take up the full width
            maxWidth="sm"
        >
            <DialogContent>
                <form className="send-enquery-form">
                    <div className="se-popup-heading">
                        <h1>Send Enquiry</h1>
                    </div>
                    <div className="sep-text-field">
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'></input>
                        <input type='tel' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} placeholder='Phone'></input>
                    </div>
                    <div className="sep-text-field">
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='email' placeholder='Email'></input>
                    </div>
                    <div className="sep-textarea">
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Your Message'></textarea>
                    </div>
                    <button className='sep-send-btn' onClick={handleSendEnquiry}>Send</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Send;