import {
    GET_IN_TOUCH_REQUEST,
    GET_IN_TOUCH_SUCCESS,
    GET_IN_TOUCH_FAILURE
} from '../constants/constant'
import { axiosRequest } from '../../services/ApiCall.js';

export const getInTouch = (name, email, phone, message) => {
    return async (dispatch) => {
        dispatch({ type: GET_IN_TOUCH_REQUEST });
        try {
            const response = axiosRequest.post('/get-in-touch-with-us', { name, email, phone, message })
            // dispatch({
            // type: SET_GET_IN_TOUCH,
            // payload: response.data
            // });
            dispatch({
                type: GET_IN_TOUCH_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_IN_TOUCH_FAILURE,
                payload: error.message
            });
            // console.error('Error:', error);
        }
    };
};
