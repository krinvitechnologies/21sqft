import React, { useEffect } from "react";
import "./forgotpassword.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { userForgotPasswordSetNewPassword } from "../../../redux/actions/userAuthAction";
import { toast } from 'react-toastify';

function FPChangePassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, otpSend, otpVerify } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (!otpSend) {
            navigate("/user/forgot-password/verify-email");
        }
        if (!otpVerify) {
            navigate("/user/forgot-password/verify-otp");
        }
    });

    const handleSavePassword = async (e) => {
        e.preventDefault();
        try {
            if (!password) {
                toast.error("Please Enter New Password");
            } else if (!confirmPassword) {
                toast.error("Please Enter Confirm Password");
            } else if (password.length < 6) {
                toast.error("Password must be at least 6 characters long");
            } else if (password !== confirmPassword) {
                toast.error("Password and Confirm password do not match");
            } else {
                dispatch(userForgotPasswordSetNewPassword(location?.state?.email, password, navigate));
            }
        } catch (error) {

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
                        <h3>Enter New Password</h3>
                        <h4>Your password must be diffrent from previous password</h4>
                    </div>
                    <div>
                        <div className="ufp-form-field">
                            <label>
                                New Password
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="ufp-form-field">
                            <label>
                                Confirm Password
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="ufp-btn">
                        <button onClick={handleSavePassword} type="submit">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FPChangePassword;
