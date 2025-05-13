import {
    ADD_POSTERS_FAILURE,
    ADD_POSTERS_REQUEST,
    ADD_POSTERS_SUCCESS,
    DELETE_POSTERS_FAILURE,
    DELETE_POSTERS_REQUEST,
    DELETE_POSTERS_SUCCESS,
    GET_POSTERS_FAILURE,
    GET_POSTERS_REQUEST,
    GET_POSTERS_SUCCESS
} from "../constants/posterConstant";

const initialState = {
    loading: false,
    error: null,
    success: false,
    posters: [],
    addLoading: false,
    deleteLoading: [],
};

export const posterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTERS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_POSTERS_SUCCESS:
            return { ...state, loading: false, posters: action.payload };

        case GET_POSTERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ADD_POSTERS_REQUEST:
            return { ...state, addLoading: true, success: false, error: null };
        case ADD_POSTERS_SUCCESS:
            return {
                ...state,
                addLoading: false,
                success: true,
                posters: [...state.posters, action.payload],
                // posters: [...(state.posters || []), action.payload], // append new poster
            };
        case ADD_POSTERS_FAILURE:
            return { ...state, addLoading: false, error: action.payload };

        case DELETE_POSTERS_REQUEST:
            return {
                ...state,
                deleteLoading: [...state.deleteLoading, action.payload],
            };
        case DELETE_POSTERS_SUCCESS:
            return {
                ...state,
                posters: state.posters.filter(p => p._id !== action.payload.id),
                deleteLoading: state.deleteLoading.filter(id => id !== action.payload.id),
            };
        case DELETE_POSTERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                deleteLoading: state.deleteLoading.filter(id => id !== action.payload.id),
            };

        default:
            return state;
    }
};

export default posterReducer;






// import { ADD_POSTERS_FAILURE, ADD_POSTERS_REQUEST, ADD_POSTERS_SUCCESS, DELETE_POSTERS_FAILURE, DELETE_POSTERS_REQUEST, DELETE_POSTERS_SUCCESS, GET_POSTERS_FAILURE, GET_POSTERS_REQUEST, GET_POSTERS_SUCCESS } from "../constants/posterConstant";


// const initialState = {
//     loading: false,
//     error: null,
//     success: false,
//     posters: null,
// };

// export const posterReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_POSTERS_REQUEST:
//         case ADD_POSTERS_REQUEST:
//         case DELETE_POSTERS_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//                 success: false,
//             };

//         case GET_POSTERS_SUCCESS:
//         case ADD_POSTERS_SUCCESS:
//         case DELETE_POSTERS_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 success: true,
//                 posters: action.payload,
//             };

//         case GET_POSTERS_FAILURE:
//         case ADD_POSTERS_FAILURE:
//         case DELETE_POSTERS_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.error,
//                 posters: null,
//             };

//         default:
//             return state;
//     }
// };

// export default posterReducer;