import { axiosRequest } from '../../services/ApiCall.js';
import { toast } from 'react-toastify';
import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
    EDIT_COMMENT_REQUEST,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE
} from '../constants/commentConstant.js';
import Cookies from 'js-cookie';

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

// edit comment
// export const editComment = ({ id, updatedCommentData }) => async (dispatch) => {
//     try {
//         dispatch({ type: EDIT_COMMENT_REQUEST });

//         const { data } = await axiosRequest.put(`/comment/update/${id}`, updatedCommentData);

//         dispatch({
//             type: EDIT_COMMENT_SUCCESS,
//             payload: data,
//         });
//         toast.success("Comment updated successfully");
//         return { success: true, comment: data.comment };
//     } catch (error) {
//         dispatch({
//             type: EDIT_COMMENT_FAILURE,
//             payload: error?.response?.data?.message || "Update failed",
//         });
//         toast.error(error.response?.data?.error || error.response?.data?.message || 'Something went wrong');
//         // throw error;
//     }
// };


export const editComment = (id, updatedCommentData) => {
    return async (dispatch) => {
        dispatch({ type: EDIT_COMMENT_REQUEST });
        const token = Cookies.get('21sqft');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };

        try {
            const response = await axiosRequest.put(`/blog/comment/update/${id}`, updatedCommentData, config);

            dispatch({
                type: EDIT_COMMENT_SUCCESS,
                payload: response.data.comment,
            });

            toast.success("Comment updated successfully");
            return { success: true, comment: response.data.comment };
        } catch (error) {
            dispatch({
                type: EDIT_COMMENT_FAILURE,
                payload: error?.response?.data?.message || "Update failed",
            });
            toast.error(error.response?.data?.error || error.response?.data?.message || 'Something went wrong');
        }
    };
};
