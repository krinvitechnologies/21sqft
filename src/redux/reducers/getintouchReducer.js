import {
    GET_IN_TOUCH_REQUEST,
    GET_IN_TOUCH_SUCCESS,
    GET_IN_TOUCH_FAILURE
} from '../constants/constant'

const initialGetInTouchState = {
    loading: false,
    error: null,
    success: false,
    data: null
}

export const getInTouchReducer = (state = initialGetInTouchState, action) => {
    // console.log(action)
    switch (action.type) {
        case GET_IN_TOUCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };

        case GET_IN_TOUCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload,
                error: null,
            };

        case GET_IN_TOUCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                success: false,
                data: null,
            }

        default:
            return state;
    }
};