import {
    CONTACT_REQUEST,
    CONTACT_SUCCESS,
    CONTACT_FAILURE
} from '../constants/contactConstant'

const initialContactState = {
    loading: false,
    error: null,
    success: false,
    data: null
}

export const contactReducer = (state = initialContactState, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            }
        case CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload
            }
        case CONTACT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false
            }
        default:
            return state;
    }
};