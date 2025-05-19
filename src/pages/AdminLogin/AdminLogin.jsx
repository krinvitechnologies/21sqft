import React, { useState } from 'react'
import './adminlogin.css';
import { toast } from 'react-toastify';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../redux/actions/adminAction';

const AdminLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize useDispatch

    const { loading } = useSelector((state) => state.adminReducer);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const adminLoginData = {
                email,
                password,
            };

            if (!email) {
                toast.error("Email is required");
            }
            else if (!password) {
                toast.error('Password is required');
            }
            else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                toast.error("Invalid Email")
            }
            else if (!validator.isEmail(email)) {
                toast.error("Invalid Email");
            }
            else if (password.length < 6) {
                toast.error("Invalid Credentials");
            } else {
                dispatch(adminLogin(adminLoginData, navigate));
            }
        } catch (error) {
            console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
            // toast.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
        }
    }

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
        <div className='admin-login'>
            <div className="admin-login-container">
                <div className="left-admin-login">
                    <div className="admin-login-form">
                        <h1>Admin Panel</h1>
                        <h5>Log in now to access the latest business and manage business effortlessly</h5>
                        <div className="ad-l-item">
                            <span>Email</span>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="ad-l-item">
                            <span>Password</span>
                            <input
                                type="password"
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="ad-l-item">
                            <button onClick={handleAdminLogin}>Continue</button>
                        </div>
                    </div>

                </div>
                <div className="right-admin-login">
                    {/* <img src="/image/div2.jpg" alt="" /> */}
                    <img src="/assets/business_auth.webp" alt="" />
                </div>
            </div>
        </div>
    )
}

export default AdminLogin