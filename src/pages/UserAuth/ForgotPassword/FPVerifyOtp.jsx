import React, { useEffect } from "react";
import "./forgotpassword.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { userForgotPasswordVerifyOtp } from "../../../redux/actions/userAuthAction";
import { toast } from 'react-toastify';

function FPVerifyOtp() {

    const [otp, setOtp] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { loading, otpSend } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (!otpSend) {
            navigate("/user/forgot-password/verify-email");
        }
    });

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            if (!otp) {
                toast.error("Please Enter OTP");
            } else {
                dispatch(userForgotPasswordVerifyOtp(location?.state?.email, otp, navigate));
            }
        } catch (error) {
            console.log(error);
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
        <div className="forgot-password">
            <div className="left-ufp">
                {/* <img src="/image/div1.jpg" alt="img" /> */}
                <img src="/assets/user_auth.webp" alt="user_auth" />
            </div>
            <div className="right-ufp">
                <div className="right-top-ufp">
                    <div>
                        <Link to="/" className="ufp-link">
                            Back
                        </Link>
                    </div>
                    <img src="/image/sq.jpg" alt="" />
                </div>

                <form className="user-fp-form">
                    <div className="ufp-text">
                        <h3>Enter Code</h3>
                        <h4>Enter the 4 digit code snet to your email.</h4>
                    </div>
                    <div>
                        <div className="ufp-form-field">
                            <label>
                                OTP
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="ufp-btn">
                        <button onClick={handleVerifyOtp} type="submit">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FPVerifyOtp;
