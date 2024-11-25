import { axiosRequest } from '../../services/ApiCall.js';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  USER_EDIT_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_FORGOT_PASSWORD_OTP_SEND_FAIL,
  USER_FORGOT_PASSWORD_OTP_SEND_REQUEST,
  USER_FORGOT_PASSWORD_OTP_SEND_SUCCESS,
  USER_FORGOT_PASSWORD_OTP_VERIFY_FAIL,
  USER_FORGOT_PASSWORD_OTP_VERIFY_REQUEST,
  USER_FORGOT_PASSWORD_OTP_VERIFY_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SET_NEW_PASSWORD_FAIL,
  USER_SET_NEW_PASSWORD_REQUEST,
  USER_SET_NEW_PASSWORD_SUCCESS,
} from "../constants/userAuthConstant.js";

export const userRegister = (userRegisterData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const response = await axiosRequest.post('/user/register', userRegisterData);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: response.data
      });

      // Set the token in cookies
      const { token } = response.data;
      Cookies.set('21sqft', token, { expires: 7 });
      navigate('/');
      return response.data
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: error.message
      });
      // console.log(error);
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      // Check if the error is related to username duplication
      if (error.response?.data?.errors?.userName) {
        toast.error(error.response.data.errors.userName);
      } else {
        toast.error(error.response?.data?.message || 'Something Went Wrong');
      }
      throw error;
    }
  };
};

// user login
export const userLogin = (userLoginData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
      const response = await axiosRequest.post('/user/login', userLoginData);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data
      });

      // Set the token in cookies
      const { token } = response.data;
      Cookies.set('21sqft', token, { expires: 7 });
      navigate('/');
      return response.data
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: error.message
      });
      console.log(error);
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      throw error;
    }
  };
};

// get user
export const getUser = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const token = Cookies.get('21sqft');
      // console.log('user token', token);
      const response = await axiosRequest.get('/user/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error.message
      });
      // console.log(error);
      // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      // throw error;
    }
  };
};

// logout user
export const userLogout = (navigate) => async (dispatch) => {
  try {
    const token = Cookies.get('21sqft');
    // console.log('Token from cookies:', token);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    // eslint-disable-next-line
    const data = await axiosRequest.get(
      `/user-auth/logout`,
      config
    );

    // if (data.success) {
    Cookies.remove('21sqft');
    dispatch({ type: USER_LOGOUT_SUCCESS });
    navigate('/');
    window.location.reload(); // Reload the page
    // }

  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response.data.message,
      response: error.response,
    });
    // throw error;
  }
};

// user edit profile
export const userEditProfile = (userEditProfileData) => async (dispatch) => {
  try {
    dispatch({ type: USER_EDIT_REQUEST });
    const token = Cookies.get('21sqft');

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };

    // Send PUT request to edit user profile
    const response = await axiosRequest.put(
      `/user/edit`,
      userEditProfileData,
      config,
    );

    // Handle response
    if (response.data.success) {
      dispatch({
        type: USER_EDIT_SUCCESS,
        payload: response.data,
      });
      toast.success("Profile Updated Successfully");
      // Handle navigation if needed
    } else {
      dispatch({
        type: USER_EDIT_FAILURE,
        payload: response.data.message || 'Edit profile failed. Please check your credentials.',
      });
      toast.error(response.data.message || 'Edit profile failed. Please check your credentials.');
    }
    return response.data

  } catch (error) {
    console.error(error.response?.data);
    dispatch({
      type: USER_EDIT_FAILURE,
      payload: error.response?.data?.message || 'An error occurred',
    });
    toast.error(error.response?.data?.message || 'An error occurred');
  }
};


// FORGOT PASSWORD API
export const userForgotPasswordSendOtp = (email, navigate) => {
  return async (dispatch) => {
    dispatch({ type: USER_FORGOT_PASSWORD_OTP_SEND_REQUEST });
    try {
      const response = await axiosRequest.post('/user/forgotpassword/otp/send', { email });
      dispatch({
        type: USER_FORGOT_PASSWORD_OTP_SEND_SUCCESS,
        payload: response.data
      });

      if (response) {
        navigate("/user/forgot-password/verify-otp", { state: { email: email } });
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      dispatch({
        type: USER_FORGOT_PASSWORD_OTP_SEND_FAIL,
        payload: error.message
      });
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      throw error;
    }
  };
};

export const userForgotPasswordVerifyOtp = (email, otp, navigate) => {
  return async (dispatch) => {
    dispatch({ type: USER_FORGOT_PASSWORD_OTP_VERIFY_REQUEST });
    try {
      const response = await axiosRequest.post('/user/forgotpassword/otp/verify', { email, otp });
      dispatch({
        type: USER_FORGOT_PASSWORD_OTP_VERIFY_SUCCESS,
        payload: response.data
      });

      if (response) {
        navigate("/user/forgot-password/change-password", { state: { email: email } });
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      dispatch({
        type: USER_FORGOT_PASSWORD_OTP_VERIFY_FAIL,
        payload: error.message
      });
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      // throw error;
    }
  };
};

export const userForgotPasswordSetNewPassword = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: USER_SET_NEW_PASSWORD_REQUEST });
    try {
      const response = await axiosRequest.post('/user/forgotpassword/change-password', { email, password });
      dispatch({
        type: USER_SET_NEW_PASSWORD_SUCCESS,
        payload: response.data
      });

      if (response) {
        navigate('/user/login')
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      dispatch({
        type: USER_SET_NEW_PASSWORD_FAIL,
        payload: error.message
      });
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      // throw error;
    }
  };
};