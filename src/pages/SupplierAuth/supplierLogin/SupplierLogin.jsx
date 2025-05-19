import React, { useState } from 'react'
import './supplierlogin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { supplierLogin } from '../../../redux/actions/supplierAuthAction';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import validator from 'validator';

function SupplierLogin() {

  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');

  const { loading } = useSelector((state) => state.supplierAuthReducer);

  const navigate = useNavigate('')
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const supplierLoginData = {
        phoneNo,
        password
      };

      if (!phoneNo || !password) {
        toast.error("All fields are required");
      }
      else if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
        toast.error('Please enter a valid phone number');
      }
      else if (password.length < 6) {
        toast.error("Password length must be at least 6 characters");
      } else {
        const response = await dispatch(supplierLogin(supplierLoginData, navigate));

        // Clear input fields upon successful login
        if (response && response.success) {
          setPhoneNo("");
          setPassword("");
        }
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
    <div className='supplier-login'>
      <div className='left-sl'>
        {/* <img src='/image/div2.jpg' alt='img' /> */}
        <img src="/assets/business_auth.webp" alt="business_auth" />
      </div>
      <div className='right-sl'>
        <div className="right-top-sl">
          <div>
            <Link to="/" className="ul-link">
              Back
            </Link>
          </div>
          <img src="/image/sq.jpg" alt="" />
        </div>

        <div className="supplier-login-form">
          <div className="sl-welcome-text">
            <h3>Welcome!</h3>
          </div>

          <div className="sl-tab-cont">
            <Link to="/user/login" className="sl-user-link">
              User
            </Link>
            <Link to="/supplier/login" className="sl-login-link">
              Contractor/Supplier
            </Link>
          </div>

          <form>
            <div>
              <div className="sl-form-field">
                <label>Phone Number
                  <input type="tel" value={phoneNo} onChange={e => setPhoneNo(e.target.value)} placeholder='Enter your phone number' />
                </label>
              </div>

              <div className="sl-form-field">
                <label>Password
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter your password' />
                </label>
              </div>
            </div>

            <div className="sl-forgot-cont">
              <div className="sl-remember">
                <input type="checkBox" />
                <label> Remember me</label>
              </div>
              <div className="sl-forgot-password-text" onClick={() => navigate('/supplier/forgot-password/verify-email')}>Forgot Password ?</div>
            </div>

            <div className="bottom-sl">
              <button type='submit' onClick={handleLogin}>Login</button>
              <div> Don't have an account.
                <Link to='/supplier/register' className='sl-link'>Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SupplierLogin