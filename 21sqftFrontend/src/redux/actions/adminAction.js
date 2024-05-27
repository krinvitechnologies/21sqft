import { axiosRequest } from '../../services/ApiCall.js';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import {
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    CONTRACTOR_STATUS_EDIT_FAILURE,
    CONTRACTOR_STATUS_EDIT_REQUEST,
    CONTRACTOR_STATUS_EDIT_SUCCESS
} from '../constants/adminConstant.js';


// admin login
export const adminLogin = (adminLoginData, navigate) => {
    return async (dispatch) => {
        dispatch({ type: ADMIN_LOGIN_REQUEST });
        try {
            const response = await axiosRequest.post('/admin/login', adminLoginData);
            dispatch({
                type: ADMIN_LOGIN_SUCCESS,
                payload: response.data
            });

            // Set the token in cookies
            const { token } = response.data;
            Cookies.set('21sqft', token, { expires: 7 });
            navigate('/admin/business');
            return response.data
        } catch (error) {
            dispatch({
                type: ADMIN_LOGIN_FAILURE,
                payload: error.message
            });
            // console.log(error);
            // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
            toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            throw error;
        }
    };
};

// STATUS UPDATE
export const contractorStatusEdit = (status, _id) => async (dispatch) => {
    try {
        dispatch({ type: CONTRACTOR_STATUS_EDIT_REQUEST });
        const token = Cookies.get('21sqft');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };

        // Send PUT request to edit user profile
        const response = await axiosRequest.put(
            `/admin/update/contractor-status/${_id}`,
            { status },
            config,
        );

        // Handle response
        if (response) {
            dispatch({
                type: CONTRACTOR_STATUS_EDIT_SUCCESS,
                payload: response.data,
            });
            toast.success(response.data.message);
            // Handle navigation if needed
        } else {
            dispatch({
                type: CONTRACTOR_STATUS_EDIT_FAILURE,
                payload: response.data.message || 'Status update failed. Please check your credentials.',
            });
            toast.error(response.data.message || 'Status update failed. Please check your credentials.');
        }
        return response.data

    } catch (error) {
        // console.error(error.response?.data?.message);
        dispatch({
            type: CONTRACTOR_STATUS_EDIT_FAILURE,
            payload: error.response?.data?.message || 'An error occurred',
        });
        toast.error(error.response?.data?.message || 'Something Went Wrong! Please try again later');
    }
};
