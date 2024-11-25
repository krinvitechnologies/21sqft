import { LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE } from '../constants/constant'

const initialLikeState = {
    loading: false,
    error: null,
    success: false,
    data: null
}

export const likeReducer = (state = initialLikeState, action) => {
    // console.log(action)
    switch (action.type) {
        case LIKE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };
        case LIKE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload
            };
        case LIKE_FAILURE:
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