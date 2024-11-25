import React, { useState } from 'react'
import './contactform.css'
import { useDispatch, useSelector } from 'react-redux';
import { getInTouch } from '../../../redux/actions/getintouchAction'
import { toast } from 'react-toastify';
import validator from 'validator';
import { PulseLoader } from 'react-spinners';

const Contactform = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setNumber] = useState('')
    const [message, setMessage] = useState('')

    const { loading } = useSelector((state) => state.getInTouchReducer);
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name || !email || !phone || !message) {
                toast.error("All fields are required");
            } else if (!validator.isEmail(email)) {
                toast.error("Invalid Email");
            } else if (!validator.isMobilePhone(phone, 'en-IN')) {
                toast.error('Invalid Phone Number');
            } else {
                const response = await dispatch(getInTouch(name, email, phone, message));
                toast.success(response);
                // Clear fields
                setName('');
                setEmail('');
                setNumber('');
                setMessage('');
            }
        } catch (error) {
            console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
        }
    };

    if (loading) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <PulseLoader color="#FECC00" />
        </div>
    }

    return (
        <div>
            <div className='contactform-main'>
                <p className='cf-p1'>Get in touch with us</p>
                <div className='contactform-inner'>
                    <form>
                        <div id='cf-inner'>
                            <div className='cf-inner-two'>
                                <input className='my-r' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                                <input className='my-r-resp' type='text' placeholder='Phone no.' value={phone} onChange={(e) => setNumber(e.target.value)}></input>
                            </div>
                            <div className='cf-inner-two'>
                                <input className='cf-mail' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className='cf-inner-two'>
                                <textarea className="cf-message" cols="30" rows="3"
                                    placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                            <button type='submit' className='contact-form-btn' onClick={handleSubmit}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contactform;
