import axiosRequest from '../../services/ApiCall';
import { toast } from 'react-toastify';
import { SUBSCRIBE_FAILURE, SUBSCRIBE_REQUEST, SUBSCRIBE_SUCCESS } from '../constants/subscribeConstant';

export const subscribeRequest = (email) => {
    return async (dispatch) => {
        dispatch({ type: SUBSCRIBE_REQUEST });
        try {
            const response = await axiosRequest.post('/subscribe', { email });
            dispatch({
                type: SUBSCRIBE_SUCCESS,
                payload: response.data
            });
            toast.success(response?.data?.message || 'Subscribed');
        } catch (error) {
            dispatch({
                type: SUBSCRIBE_FAILURE,
                payload: error.message
            });
            toast.error(error.response?.data?.message || 'Something Went Wrong');
        }
    };
};
