import { axiosRequest } from '../../services/ApiCall.js';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import {
    ADD_BLOG_FAILURE,
    ADD_BLOG_REQUEST,
    ADD_BLOG_SUCCESS,
    DELETE_BLOG_FAILURE,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    EDIT_BLOG_FAILURE,
    EDIT_BLOG_REQUEST,
    EDIT_BLOG_SUCCESS,
    GET_BLOGS_FAILURE,
    GET_BLOGS_REQUEST,
    GET_BLOGS_SUCCESS
} from "../constants/blogConstant";

// Get Blogs
export const getBlogs = (id) => {
    return async (dispatch) => {
        dispatch({ type: GET_BLOGS_REQUEST });
        try {
            const response = await axiosRequest.get(`/blog/get/${id}`);

            dispatch({
                type: GET_BLOGS_SUCCESS,
                payload: response.data
            });

            return response.data;
        } catch (error) {
            dispatch({
                type: GET_BLOGS_FAILURE,
                payload: error.message
            });
            // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
        }
    };
};

// Add Blog
export const addBlog = (formData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_BLOG_REQUEST });
        try {
            const response = await axiosRequest.post('/blog/add', formData);
            dispatch({
                type: ADD_BLOG_SUCCESS,
                payload: response.data.blog,
            });
            return { success: true, blog: response.data.blog }; // Return success with the blog data
        } catch (error) {
            dispatch({
                type: ADD_BLOG_FAILURE,
                payload: error.message,
            });
            toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            // throw error;
        }
    };
};

// Edit Blog
// export const editBlog = (formData, blogId) => {
//     return async (dispatch) => {
//         dispatch({ type: EDIT_BLOG_REQUEST });
//         try {
//             const response = await axiosRequest.put(`/blog/update/${blogId}`, formData);
//             dispatch({
//                 type: EDIT_BLOG_SUCCESS,
//                 payload: response.data.blog,
//             });
//             return { success: true, blog: response.data.blog };
//         } catch (error) {
//             dispatch({
//                 type: EDIT_BLOG_FAILURE,
//                 payload: error.message,
//             });
//             toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
//             // throw error;
//         }
//     };
// };
// Edit Blog
export const editBlog = (blogId, formData) => {
    return async (dispatch) => {
        dispatch({ type: EDIT_BLOG_REQUEST });
        try {
            const response = await axiosRequest.put(`/blog/update/${blogId}`, formData);

            dispatch({
                type: EDIT_BLOG_SUCCESS,
                payload: response.data.blog, // send updated blog
            });

            toast.success("Blog updated successfully");
            return { success: true, blog: response.data.blog };
        } catch (error) {
            dispatch({
                type: EDIT_BLOG_FAILURE,
                payload: error || error.message,
            });
            toast.error(`${error?.response?.data?.error || error?.response?.data?.message || 'Something Went Wrong'}`);
        }
    };
};


// Delete Blog
export const deleteBlog = (blogId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_BLOG_REQUEST, payload: blogId });
        try {
            await axiosRequest.delete(`/blog/delete/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('21sqft')}`,
                },
            });

            dispatch({
                type: DELETE_BLOG_SUCCESS,
                payload: { id: blogId },
            });
        } catch (error) {
            dispatch({
                type: DELETE_BLOG_FAILURE,
                payload: { id: blogId, error: error.message },
            });
            toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
        }
    };
};
