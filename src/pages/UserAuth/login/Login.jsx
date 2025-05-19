import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { userLogin } from "../../../redux/actions/userAuthAction";
import { toast } from 'react-toastify';

function Login() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.userReducer);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const userLoginData = {
        userName,
        password,
      };

      if (!userName || !password) {
        toast.error("All fields are required");
      }
      else if (password.length < 6) {
        toast.error("Invalid Credentials");
      } else {
        const response = await dispatch(userLogin(userLoginData, navigate));

        // Clear input fields upon successful registration
        if (response && response.success) {
          setUserName("");
          setPassword("");
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
    <div className="user-login">
      <div className="left-ul">
        {/* <img src="/image/div1.jpg" alt="img" /> */}
        <img src="/assets/user_auth.webp" alt="user_auth" />
      </div>
      <div className="right-ul">
        <div className="right-top-ul">
          <div>
            <Link to="/" className="ul-link">
              Back
            </Link>
          </div>
          <img src="/image/sq.jpg" alt="" />
        </div>

        <form className="user-login-form">
          <div className="ul-welcome-text">
            <h3>Welcome!</h3>
          </div>
          <div className="ul-tab-cont">
            <Link to="/user/login" className="ul-login-link">
              User
            </Link>
            <Link to="/supplier/login" className="ul-supplier-link">
              Contractor/ Supplier
            </Link>
          </div>
          <div>
            <div className="ul-form-field">
              <label>User name
                <input
                  type="text"
                  placeholder="Enter your User name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            </div>

            <div className="ul-form-field">
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
          <div className="ul-forgot-cont">
            <div className="checkedl1">
              <input type="checkBox" />
              <label> Remember me</label>
            </div>
            <div className="ul-forgot-password-text" onClick={() => navigate('/user/forgot-password/verify-email')}>Forgot Password ?</div>
          </div>
          <div className="bottom-ul">
            <button onClick={handleLogin} type="submit">
              Login
            </button>
            <div>
              Don't have an account.
              <Link to="/user/register" className="ul-link">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
