import {
    ADMIN_LOGIN_FAILURE,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    CONTRACTOR_STATUS_EDIT_FAILURE,
    CONTRACTOR_STATUS_EDIT_REQUEST,
    CONTRACTOR_STATUS_EDIT_SUCCESS,
} from "../constants/adminConstant";

const initialState = {
    loading: false,
    error: null,
    success: false,
    admin: null,
    // isUserAuthenticated: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
        case CONTRACTOR_STATUS_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                isAdminAuthenticated: false,
            };

        case ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                admin: action.payload,
                error: null,
                isAdminAuthenticated: true,
            };
        case CONTRACTOR_STATUS_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                isAdminAuthenticated: true,
            };

        case CONTRACTOR_STATUS_EDIT_FAILURE:
            return {
                loading: false,
                error: action.error,
                success: false,
            }
        case ADMIN_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                admin: null,
                success: false,
                isAdminAuthenticated: false,
            };

        default:
            return state;
    }
};

export default adminReducer;
