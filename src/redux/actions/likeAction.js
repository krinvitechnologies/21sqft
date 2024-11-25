import { LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE } from '../constants/constant'
import axiosRequest from '../../services/ApiCall';
import { toast } from 'react-toastify';

export const setLike = (businessId) => {
    return async (dispatch) => {
        dispatch({ type: LIKE_REQUEST });
        try {
            const response = await axiosRequest.put('/contractor/like', { businessId });
            dispatch({
                type: LIKE_SUCCESS,
                payload: response.data
            });
            toast.success(response?.data?.message || 'Liked');
        } catch (error) {
            dispatch({
                type: LIKE_FAILURE,
                payload: error.message
            });
            toast.error(error.response?.data?.message || 'Something Went Wrong');
        }
    };
};
