import {
    CONTACT_REQUEST,
    CONTACT_SUCCESS,
    CONTACT_FAILURE
} from '../constants/contactConstant.js'
import { axiosRequest } from '../../services/ApiCall.js';

export const setContact = (name, email, phone, service, message) => {
    return async (dispatch) => {
        dispatch({ type: CONTACT_REQUEST });
        try {
            const response = await axiosRequest.post('/contact-us', { name, email, phone, service, message });
            dispatch({
                type: CONTACT_SUCCESS,
                payload: response.data
            });
            return response.data.message;
        } catch (error) {
            dispatch({
                type: CONTACT_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};
