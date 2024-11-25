import React, { useState } from 'react'
import './contact.css'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/homepage/Navbar/navbar';
import Footer from '../../components/homepage/footer/footer';
import { setContact } from '../../redux/actions/contactAction';
import { toast } from 'react-toastify';
import validator from 'validator';

function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setNumber] = useState('')
    const [service, setService] = useState('')
    const [message, setMessage] = useState('')

    const { loading } = useSelector((state) => state.contactReducer);
    const dispatch = useDispatch('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!name || !email || !phone || !service || !message) {
                toast.error("All fields are required");
            } else if (!validator.isEmail(email)) {
                toast.error("Invalid Email");
            } else if (!validator.isMobilePhone(phone, 'en-IN')) {
                toast.error('Invalid Phone Number');
            } else {
                const response = await dispatch(setContact(name, email, phone, service, message));
                toast.success(response);
                // Clear fields
                setName('');
                setEmail('');
                setNumber('');
                setService('');
                setMessage('');
            }
        } catch (error) {
            console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
            // toast.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
        }
    }

    return (
        <div className='contact'>
            <Navbar />
            <div className='contact-cont'>
                <div className="top-contact">
                    <img src='/image/img.jpg' alt='' />
                    <div className="top-contact-head">
                        <h1>Contact Us<span>.</span></h1>
                    </div>
                </div>
                <div className='bottom-contact'>
                    <div className='left-contact'>
                        <div className="contact-form-head">
                            <img src='image/div.jpg' alt='' />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='contact-form-field'>
                                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='contact-form-field'>
                                <input type="tel" placeholder='Phone no' value={phone} onChange={(e) => setNumber(e.target.value)} />
                                <input type="text" placeholder='Service Ex Cement Supplier' value={service} onChange={(e) => setService(e.target.value)} />
                            </div>
                            <div className='contact-textarea'>
                                <textarea type="text" placeholder='Your Message' rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                            </div>
                            <div className='contact-send-btn'>
                                <button type='submit' disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
                            </div>
                        </form>
                    </div>

                    <div className='right-contact'>
                        <div className="contact-form-head">
                            <img src='image/div.jpg' alt='img' />
                        </div>
                        <div className='right-contact-text'>
                            <p>
                                Our dedicated team is ready to provide you with the support and information you require.
                                Your inquiries are important to us, and we look forward to hearing from you.
                            </p>
                            <span> Let's connect and make your real estate and construction journey exceptional!</span>
                        </div>
                        <div className='contact-detail'>
                            <div className='contact-info'>
                                <div>
                                    <img src="/image/phone.png" alt="" />
                                </div>
                                <div>
                                    <span> Have any question?</span>
                                    <strong>9877503362</strong>
                                </div>
                            </div>
                            <div className='contact-info'>
                                <div>
                                    <img src="/image/email.png" alt="" />
                                </div>
                                <div>
                                    <span>Write email</span>
                                    <strong>info@21sqft.com</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;