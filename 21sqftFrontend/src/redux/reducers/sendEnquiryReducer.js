import {
    SEND_ENQUIRY_REQUEST,
    SEND_ENQUIRY_SUCCESS,
    SEND_ENQUIRY_FAILURE
} from '../constants/sendEnquiryConstant';

export const sendEnquiryReducer = (state = { loading: false, success: false, error: null }, action) => {
    switch (action.type) {
        case SEND_ENQUIRY_REQUEST:
            return { ...state, loading: true };
        case SEND_ENQUIRY_SUCCESS:
            return { loading: false, success: true, error: null };
        case SEND_ENQUIRY_FAILURE:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export default sendEnquiryReducer;