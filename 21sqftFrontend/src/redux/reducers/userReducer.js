import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  USER_EDIT_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_FORGOT_PASSWORD_OTP_SEND_REQUEST,
  USER_FORGOT_PASSWORD_OTP_SEND_SUCCESS,
  USER_FORGOT_PASSWORD_OTP_SEND_FAIL,
  USER_FORGOT_PASSWORD_OTP_VERIFY_REQUEST,
  USER_FORGOT_PASSWORD_OTP_VERIFY_SUCCESS,
  USER_FORGOT_PASSWORD_OTP_VERIFY_FAIL,
  USER_SET_NEW_PASSWORD_REQUEST,
  USER_SET_NEW_PASSWORD_SUCCESS,
  USER_SET_NEW_PASSWORD_FAIL,
} from "../constants/userAuthConstant";

const initialState = {
  loading: false,
  error: null,
  success: false,
  user: null,
  // isUserAuthenticated: false
  otpSend: false,
  otpVerify: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case USER_LOGOUT_REQUEST:
    case USER_EDIT_REQUEST:
    case USER_FORGOT_PASSWORD_OTP_SEND_REQUEST:
    case USER_FORGOT_PASSWORD_OTP_VERIFY_REQUEST:
    case USER_SET_NEW_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
        isUserAuthenticated: false
      };

    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case GET_USER_SUCCESS:
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
        error: null,
        isUserAuthenticated: true
      };

    case USER_FORGOT_PASSWORD_OTP_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSend: true,
      }

    case USER_FORGOT_PASSWORD_OTP_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        otpVerify: true,
      }

    case USER_SET_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        otpSend: false,
        otpVerify: false,
      };

    case USER_FORGOT_PASSWORD_OTP_SEND_FAIL:
    case USER_FORGOT_PASSWORD_OTP_VERIFY_FAIL:
    case USER_SET_NEW_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case USER_REGISTER_FAILURE:
    case USER_LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case USER_LOGOUT_FAIL:
    case USER_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        user: null,
        success: false,
        isUserAuthenticated: false
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
        loading: false,
        isUserAuthenticated: false
      };


    default:
      return state;
  }
};

export default userReducer;