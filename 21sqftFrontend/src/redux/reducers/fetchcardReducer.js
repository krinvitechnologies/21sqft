// import { SET_FETCH } from "../constant/constant"
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "../constants/constant"

const initialFetchState = {
    loading: false,
    error: null,
    success: false,
    data: null
}

export const fetchReducer = (state = initialFetchState, action) => {
    // console.log(action)
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload
            };
        case FETCH_FAILURE:
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