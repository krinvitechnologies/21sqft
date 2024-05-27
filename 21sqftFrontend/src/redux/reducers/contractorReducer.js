import {
    GET_ALL_CONTRACTOR_FAILURE,
    GET_ALL_CONTRACTOR_REQUEST,
    GET_ALL_CONTRACTOR_SUCCESS,
    GET_CONTRACTOR_DETAIL_FAILURE,
    GET_CONTRACTOR_DETAIL_REQUEST,
    GET_CONTRACTOR_DETAIL_SUCCESS
} from "../constants/contractorConstant";

const initialState = {
    loading: false,
    error: null,
    success: false,
    contractor: null,
    contractorDetail: null,
    // isSupplierAuthenticated: false
};

export const contractorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CONTRACTOR_REQUEST:
        case GET_CONTRACTOR_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };

        case GET_ALL_CONTRACTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                contractor: action.payload,
                error: null,
            };

        case GET_ALL_CONTRACTOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                contractor: null,
                success: false,
            };

        case GET_CONTRACTOR_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                contractorDetail: action.payload,
                error: null,
            };

        case GET_CONTRACTOR_DETAIL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                contractorDetail: null,
                success: false,
            };


        default:
            return state;
    }
};

export default contractorReducer;