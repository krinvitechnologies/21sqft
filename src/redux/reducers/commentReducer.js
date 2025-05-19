import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE, EDIT_COMMENT_REQUEST, EDIT_COMMENT_SUCCESS, GET_COMMENTS_FAILURE, GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS } from "../constants/commentConstant";

const initialState = {
    loading: false,
    error: null,
    comments: [],
    addLoading: false,
    success: false,
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_COMMENTS_SUCCESS:
            return { ...state, loading: false, comments: action.payload };
        case GET_COMMENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ADD_COMMENT_REQUEST:
            return { ...state, addLoading: true, success: false };
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addLoading: false,
                success: true,
                comments: [action.payload, ...state.comments],
            };
        case ADD_COMMENT_FAILURE:
            return { ...state, addLoading: false, error: action.payload };

        case EDIT_COMMENT_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        case EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                comments: state.comments.map(comment =>
                    comment._id === action.payload._id ? action.payload : comment
                ),
            };

        case EDIT_COMMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        default:
            return state;
    }
};

export default commentReducer;
