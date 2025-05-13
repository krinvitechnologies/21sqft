import { axiosRequest } from '../../services/ApiCall.js';
import { toast } from 'react-toastify';
import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE
} from '../constants/commentConstant.js';

export const getComments = (blogId) => async (dispatch) => {
    dispatch({ type: GET_COMMENTS_REQUEST });
    try {
        const { data } = await axiosRequest.get(`/blog/comment/get/${blogId}`);
        dispatch({ type: GET_COMMENTS_SUCCESS, payload: data.comments });
    } catch (error) {
        dispatch({
            type: GET_COMMENTS_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const addComment = (formData) => async (dispatch) => {
    dispatch({ type: ADD_COMMENT_REQUEST });
    try {
        const { data } = await axiosRequest.post('/blog/comment/add', formData);
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: data.comment });
        return { success: true, comment: data.comment };
    } catch (error) {
        dispatch({
            type: ADD_COMMENT_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
        toast.error(error.response?.data?.message || 'Something went wrong');
    }
};