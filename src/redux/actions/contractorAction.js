import axiosRequest from "../../services/ApiCall";
import {
    GET_ALL_CONTRACTOR_FAILURE,
    GET_ALL_CONTRACTOR_REQUEST,
    GET_ALL_CONTRACTOR_SUCCESS,
    GET_CONTRACTOR_DETAIL_FAILURE,
    GET_CONTRACTOR_DETAIL_REQUEST,
    GET_CONTRACTOR_DETAIL_SUCCESS,
    GET_MOST_LIKED_CONTRACTOR_FAILURE,
    GET_MOST_LIKED_CONTRACTOR_REQUEST,
    GET_MOST_LIKED_CONTRACTOR_SUCCESS
} from "../constants/contractorConstant";

export const getAllContractor = () => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CONTRACTOR_REQUEST });
        try {

            const response = await axiosRequest.get('/contractor/get-all');

            dispatch({
                type: GET_ALL_CONTRACTOR_SUCCESS,
                payload: response.data
            });

            return response.data;
        } catch (error) {
            dispatch({
                type: GET_ALL_CONTRACTOR_FAILURE,
                payload: error.message
            });
            // console.log(error);
            // console.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            // throw error;
        }
    };
};

export const getMostLikedContractor = () => {
    return async (dispatch) => {
        dispatch({ type: GET_MOST_LIKED_CONTRACTOR_REQUEST });
        try {
            const response = await axiosRequest.get('/contractor/get/most-liked');
            dispatch({
                type: GET_MOST_LIKED_CONTRACTOR_SUCCESS,
                payload: response.data
            });
            return response.data;
        } catch (error) {
            dispatch({
                type: GET_MOST_LIKED_CONTRACTOR_FAILURE,
                payload: error.message
            });
            // console.log(error);
            // console.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            // throw error;
        }
    };
};


export const getContractorDetail = (id) => {
    return async (dispatch) => {
        dispatch({ type: GET_CONTRACTOR_DETAIL_REQUEST });
        try {

            const response = await axiosRequest.get(`/contractor/get-details/${id}`);

            dispatch({
                type: GET_CONTRACTOR_DETAIL_SUCCESS,
                payload: response.data
            });

            return response.data;
        } catch (error) {
            dispatch({
                type: GET_CONTRACTOR_DETAIL_FAILURE,
                payload: error.message
            });
            console.log(error);
            // console.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            // toast.error(`${error?.response?.data?.message || 'Something Went Wrong'}`);
            throw error;
        }
    };
};