import { axiosRequest } from '../../services/ApiCall.js';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import {
  SUPPLIER_LOGIN_REQUEST,
  SUPPLIER_LOGIN_SUCCESS,
  SUPPLIER_LOGIN_FAILURE,
  SUPPLIER_REGISTER_FAILURE,
  SUPPLIER_REGISTER_REQUEST,
  SUPPLIER_REGISTER_SUCCESS,
  GET_SUPPLIER_REQUEST,
  GET_SUPPLIER_SUCCESS,
  GET_SUPPLIER_FAILURE,
  SUPPLIER_LOGOUT_SUCCESS,
  SUPPLIER_LOGOUT_FAIL,
  SUPPLIER_EDIT_REQUEST,
  SUPPLIER_EDIT_SUCCESS,
  SUPPLIER_EDIT_FAILURE,
  SUPPLIER_FORGOT_PASSWORD_OTP_SEND_FAIL,
  SUPPLIER_FORGOT_PASSWORD_OTP_SEND_REQUEST,
  SUPPLIER_FORGOT_PASSWORD_OTP_SEND_SUCCESS,
  SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_FAIL,
  SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_REQUEST,
  SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_SUCCESS,
  SUPPLIER_SET_NEW_PASSWORD_FAIL,
  SUPPLIER_SET_NEW_PASSWORD_REQUEST,
  SUPPLIER_SET_NEW_PASSWORD_SUCCESS,
  SUPPLIER_ACCOUNT_DELETE_REQUEST,
  SUPPLIER_ACCOUNT_DELETE_SUCCESS,
  SUPPLIER_ACCOUNT_DELETE_FAILURE
} from "../constants/supplierAuthConstant.js";

// Supplier Registration
export const supplierRegister = (supplierRegisterData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SUPPLIER_REGISTER_REQUEST });
    try {
      const response = await axiosRequest.post('/contractor/auth/register', supplierRegisterData);
      dispatch({
        type: SUPPLIER_REGISTER_SUCCESS,
        payload: response.data
      });

      // Set the token in cookies
      const { token } = response.data;
      Cookies.set('21sqft', token, { expires: 30 });
      navigate('/');
      return response.data
    } catch (error) {
      dispatch({
        type: SUPPLIER_REGISTER_FAILURE,
        payload: error.message
      });
      // console.log(error);
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      throw error;
    }
  };
};


// Supplier Login
export const supplierLogin = (supplierLoginData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SUPPLIER_LOGIN_REQUEST });
    try {
      const response = await axiosRequest.post('/contractor/auth/login', supplierLoginData);
      dispatch({
        type: SUPPLIER_LOGIN_SUCCESS,
        payload: response.data
      });

      // Set the token in cookies
      const { token } = response.data;
      Cookies.set('21sqft', token, { expires: 30 });
      navigate('/');
      return response.data
    } catch (error) {
      dispatch({
        type: SUPPLIER_LOGIN_FAILURE,
        payload: error.message
      });
      // console.log(error);
      // console.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      throw error;
    }
  };
};

// get Supplier
export const getSupplier = () => {
  return async (dispatch) => {
    dispatch({ type: GET_SUPPLIER_REQUEST });
    try {
      const token = Cookies.get('21sqft'); // Get the token from cookies
      // if (!token) {
      //   throw new Error('Authentication token not found');
      // }

      const response = await axiosRequest.get('/contractor/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      dispatch({
        type: GET_SUPPLIER_SUCCESS,
        payload: response.data
      });

      return response.data;
    } catch (error) {
      dispatch({
        type: GET_SUPPLIER_FAILURE,
        payload: error.message
      });
      // console.log(error);
      // console.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      // throw error;
    }
  };
};

// logout supplier
export const supplierLogout = (navigate) => async (dispatch) => {
  try {
    const token = Cookies.get('21sqft');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axiosRequest.get(
      `/contractor/logout`,
      config
    );

    // if (data.success) {
    // Cookies.remove('21sqft');
    Cookies.remove('21sqft', { path: '/', domain: window.location.hostname });
    dispatch({ type: SUPPLIER_LOGOUT_SUCCESS });
    // }
    navigate('/');
    // Reload the page
    window.location.reload();

  } catch (error) {
    dispatch({
      type: SUPPLIER_LOGOUT_FAIL,
      payload: error.response.data.message,
      response: error.response,
    });
    // throw error;
  }
};

// supplier edit profile
export const supplierEditProfile = (supplierEditProfileData) => async (dispatch) => {
  try {
    dispatch({ type: SUPPLIER_EDIT_REQUEST });
    const token = Cookies.get('21sqft');

    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data", // Change content type for FormData
        Authorization: `Bearer ${token}`,
      }
    };
    // console.log('supplierEditProfileData', supplierEditProfileData);
    // Send PUT request to edit user profile
    const response = await axiosRequest.put(
      `/contractor/edit`,
      supplierEditProfileData,
      config,
    );

    dispatch({
      type: SUPPLIER_EDIT_SUCCESS,
      payload: response?.data,
    });
    toast.success(response?.data?.message || "Profile Updated Successfully");
    return response.data;
  } catch (error) {
    dispatch({
      type: SUPPLIER_EDIT_FAILURE,
      payload: error.response?.data?.message || 'Something Went Wrong',
    });
    toast.error(error.response?.data?.message || 'Something Went Wrong');
  }
};

// Delete supplier business account
export const deleteSupplierAccount = (id, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SUPPLIER_ACCOUNT_DELETE_REQUEST, payload: id });
    try {
      await axiosRequest.delete(`/contractor/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('21sqft')}`,
        },
      });

      dispatch({
        type: SUPPLIER_ACCOUNT_DELETE_SUCCESS,
        payload: { id },
      });
      Cookies.remove('21sqft');
      navigate('/');
    } catch (error) {
      dispatch({
        type: SUPPLIER_ACCOUNT_DELETE_FAILURE,
        payload: { id, error: error },
      });
      toast.error(`${error?.response?.data?.message || error?.response?.data?.error || 'Something Went Wrong'}`);
    }
  };
};



// FORGOT PASSWORD API
export const supplierForgotPasswordSendOtp = (email, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SUPPLIER_FORGOT_PASSWORD_OTP_SEND_REQUEST });
    try {
      const response = await axiosRequest.post('/contractor/auth/forgotpassword/otp/send', { email });
      dispatch({
        type: SUPPLIER_FORGOT_PASSWORD_OTP_SEND_SUCCESS,
        payload: response.data
      });

      if (response) {
        navigate("/supplier/forgot-password/verify-otp", { state: { email: email } });
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      dispatch({
        type: SUPPLIER_FORGOT_PASSWORD_OTP_SEND_FAIL,
        payload: error.message
      });
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      throw error;
    }
  };
};

export const supplierForgotPasswordVerifyOtp = (email, otp, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_REQUEST });
    try {
      const response = await axiosRequest.post('/contractor/auth/forgotpassword/otp/verify', { email, otp });
      dispatch({
        type: SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_SUCCESS,
        payload: response.data
      });

      if (response) {
        navigate("/supplier/forgot-password/change-password", { state: { email: email } });
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      dispatch({
        type: SUPPLIER_FORGOT_PASSWORD_OTP_VERIFY_FAIL,
        payload: error.message
      });
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      // throw error;
    }
  };
};

export const supplierForgotPasswordSetNewPassword = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: SUPPLIER_SET_NEW_PASSWORD_REQUEST });
    try {
      const response = await axiosRequest.post('/contractor/auth/forgotpassword/change-password', { email, password });
      dispatch({
        type: SUPPLIER_SET_NEW_PASSWORD_SUCCESS,
        payload: response.data
      });

      if (response) {
        navigate('/supplier/login')
        toast.success(response.data.message);
        return response.data;
      }
    } catch (error) {
      dispatch({
        type: SUPPLIER_SET_NEW_PASSWORD_FAIL,
        payload: error.message
      });
      // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
      toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
      // throw error;
    }
  };
};