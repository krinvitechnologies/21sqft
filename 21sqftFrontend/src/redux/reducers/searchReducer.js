import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from '../constants/constant';

const initialSearchState = {
    // searchResults: []
    loading: false,
    error: null,
    success: false,
    data: []
};

const searchReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
                // searchResults: action.payload
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload
                // searchResults: action.payload
            };
        case SEARCH_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                data: null,
            }
        default:
            return state;
    }
};
export default searchReducer;
