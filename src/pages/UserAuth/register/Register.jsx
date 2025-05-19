import React from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { userRegister } from "../../../redux/actions/userAuthAction";
import { toast } from 'react-toastify';
import validator from 'validator';

function Register() {

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.userReducer);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const userRegisterData = {
        email,
        userName,
        password,
      };

      if (!email || !userName || !password) {
        toast.error("All fields are required");
      }
      else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || !validator.isEmail(email)) {
        toast.error("Invalid Email")
      }
      else if (password.length < 6) {
        toast.error("Password length must be at least 6 characters");
      } else {
        const response = await dispatch(userRegister(userRegisterData, navigate));

        // Clear input fields upon successful registration
        if (response && response.success) {
          setEmail("");
          setUserName("");
          setPassword("");
        }
      }
    } catch (error) {
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
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
    <div className="user-register">
      <div className="left-ur">
        {/* <img src="/image/div1.jpg" alt="img" /> */}
        <img src="/assets/user_auth.webp" alt="user_auth" />
      </div>
      <form className="right-ur">
        <div className="right-top-ur">
          <div>
            <Link to="/" className="ur-link">
              Back
            </Link>
          </div>
          <img src="/image/sq.jpg" alt="" />
        </div>
        <div className="user-register-form">
          <div className="ur-welcome-text">
            <h3>Welcome!</h3>
          </div>
          <div className="ur-tab-cont">
            <Link to="/user/login" className="ur-register-link">
              User
            </Link>
            <Link to="/supplier/login" className="ur-supplier-link">
              Contractor/Supplier
            </Link>
          </div>
          <div>
            <div className="ur-form-field">
              <label>Email Address
                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="ur-form-field">
              <label>User name
                <input
                  type="text"
                  placeholder="Enter your User name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            </div>
            <div className="ur-form-field">
              <label>Password
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="bottom-ul">
            <button onClick={handleRegister} type="submit">
              Sign Up
            </button>
            <div>
              Already have an account.
              <Link to="/user/login" className="ur-link">
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
