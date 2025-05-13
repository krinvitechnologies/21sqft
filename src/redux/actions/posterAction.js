import { axiosRequest } from '../../services/ApiCall.js';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ADD_POSTERS_FAILURE, ADD_POSTERS_REQUEST, ADD_POSTERS_SUCCESS, DELETE_POSTERS_FAILURE, DELETE_POSTERS_REQUEST, DELETE_POSTERS_SUCCESS, GET_POSTERS_FAILURE, GET_POSTERS_REQUEST, GET_POSTERS_SUCCESS } from '../constants/posterConstant.js';

// get Supplier
export const getPosters = () => {
    return async (dispatch) => {
        dispatch({ type: GET_POSTERS_REQUEST });
        try {
            const token = Cookies.get('21sqft'); // Get the token from cookies
            // if (!token) {
            //   throw new Error('Authentication token not found');
            // }

            const response = await axiosRequest.get('/admin/poster/get', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            dispatch({
                type: GET_POSTERS_SUCCESS,
                payload: response.data
            });

            return response.data;
        } catch (error) {
            dispatch({
                type: GET_POSTERS_FAILURE,
                payload: error.message
            });
            // console.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            // throw error;
        }
    };
};

export const addPoster = (formData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_POSTERS_REQUEST });
        try {
            const response = await axiosRequest.post('/admin/poster/add', formData);
            dispatch({
                type: ADD_POSTERS_SUCCESS,
                payload: response.data,
            });
            // return response.data;
            return { success: true, poster: response.data };
        } catch (error) {
            dispatch({
                type: ADD_POSTERS_FAILURE,
                payload: error.message,
            });
            toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            throw error;
        }
    };
};


export const deletePoster = (posterId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_POSTERS_REQUEST, payload: posterId });
        try {
            await axiosRequest.delete(`/admin/poster/delete/${posterId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('21sqft')}`,
                },
            });

            dispatch({
                type: DELETE_POSTERS_SUCCESS,
                payload: { id: posterId },
            });
        } catch (error) {
            dispatch({
                type: DELETE_POSTERS_FAILURE,
                payload: { id: posterId, error: error.message },
            });
            toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
        }
    };
};


// add poster
// export const addPoster = (supplierRegisterData, navigate) => {
//     return async (dispatch) => {
//         dispatch({ type: ADD_POSTERS_REQUEST });
//         try {
//             const response = await axiosRequest.post('/admin/poster/add', supplierRegisterData);
//             dispatch({
//                 type: ADD_POSTERS_SUCCESS,
//                 payload: response.data
//             });
//             return response.data
//         } catch (error) {
//             dispatch({
//                 type: ADD_POSTERS_FAILURE,
//                 payload: error.message
//             });
//             // console.log(error);
//             // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
//             toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
//             throw error;
//         }
//     };
// };

// // Delete poster
// export const deletePoster = (posterId) => {
//     return async (dispatch) => {
//         dispatch({ type: DELETE_POSTERS_REQUEST });
//         try {
//             const token = Cookies.get('21sqft'); // Get the token from cookies
//             // if (!token) {
//             //   throw new Error('Authentication token not found');
//             // }

//             const response = await axiosRequest.delete(`/admin/poster/delete/${posterId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Include the token in the request headers
//                 },
//             });

//             dispatch({
//                 type: DELETE_POSTERS_SUCCESS,
//                 payload: response.data
//             });

//             return response.data;
//         } catch (error) {
//             dispatch({
//                 type: DELETE_POSTERS_FAILURE,
//                 payload: error.message
//             });
//             // console.log(error);
//             // console.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
//             // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
//             // throw error;
//         }
//     };
// };