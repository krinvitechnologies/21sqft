import axiosRequest from '../../services/ApiCall';
import {
    SEND_ENQUIRY_REQUEST,
    SEND_ENQUIRY_SUCCESS,
    SEND_ENQUIRY_FAILURE
} from '../constants/sendEnquiryConstant';

export const sendEnquiry = (businessId, enquiryDetails) => async (dispatch) => {
    try {
        dispatch({ type: SEND_ENQUIRY_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axiosRequest.post(`/send-enquiry/${businessId}`, enquiryDetails, config);

        dispatch({
            type: SEND_ENQUIRY_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SEND_ENQUIRY_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};
