import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from '../constants/constant';

const initialSearchState = {
    // searchResults: []
    loading: false,
    error: null,
    success: false,
    data: [],
    contractor: [],
    totalContractors: 0,
    totalPages: 0,
    currentPage: 1,
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
                // data: action.payload
                // data: state.currentPage === 1 ? action.payload.data : [...state.data, ...action.payload.data],
                // data: state.currentPage === 1 ? action.payload : [...state.data, ...action.payload],
                contractor: state.currentPage === 1 ? action.payload.contractors : [...state.contractor, ...action.payload.contractors],
                totalContractors: action.payload.totalContractors,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                error: null,
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





// import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from '../constants/constant';

// const initialSearchState = {
//     // searchResults: []
//     loading: false,
//     error: null,
//     success: false,
//     data: []
// };

// const searchReducer = (state = initialSearchState, action) => {
//     switch (action.type) {
//         case SEARCH_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//                 success: false
//                 // searchResults: action.payload
//             };
//         case SEARCH_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 success: true,
//                 data: action.payload
//                 // searchResults: action.payload
//             };
//         case SEARCH_FAILURE:
//             return {
//                 ...state,
//                 success: false,
//                 loading: false,
//                 error: action.error,
//                 data: null,
//             }
//         default:
//             return state;
//     }
// };
// export default searchReducer;
