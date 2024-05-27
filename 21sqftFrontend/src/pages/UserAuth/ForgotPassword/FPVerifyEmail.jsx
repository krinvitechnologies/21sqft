import React from "react";
import "./forgotpassword.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { userForgotPasswordSendOtp } from "../../../redux/actions/userAuthAction";
import { toast } from 'react-toastify';
import validator from 'validator';

function FPVerifyEmail() {

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.userReducer);

    const handleLogin = async (e) => {
        try {
            e.preventDefault();

            if (!email) {
                toast.error("Email is required");
            } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || !validator.isEmail(email)) {
                toast.error("Please enter a valid email")
            } else {
                const response = await dispatch(userForgotPasswordSendOtp(email, navigate));

                // Clear input fields upon successful registration
                if (response && response.success) {
                    setEmail("");
                }
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
        <div className="forgot-password">
            <div className="left-ufp">
                <img src="/image/div1.jpg" alt="img" />
            </div>
            <div className="right-ufp">
                <div className="right-top-ufp">
                    <div>
                        <Link to="/user/login" className="ufp-link">
                            Back
                        </Link>
                    </div>
                    <img src="/image/sq.jpg" alt="" />
                </div>

                <form className="user-fp-form">
                    <div className="ufp-text">
                        <h3>Forgot Password </h3>
                        <h4>Don't worry, enter your email to get 4 digit code.</h4>
                    </div>
                    <div>
                        <div className="ufp-form-field">
                            <label>
                                Email
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="ufp-btn">
                        <button onClick={handleLogin} type="submit">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FPVerifyEmail;
