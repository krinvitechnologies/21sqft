import {
    ADD_BLOG_FAILURE,
    ADD_BLOG_REQUEST,
    ADD_BLOG_SUCCESS,
    DELETE_BLOG_FAILURE,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    EDIT_BLOG_FAILURE,
    EDIT_BLOG_REQUEST,
    EDIT_BLOG_SUCCESS,
    GET_BLOGS_FAILURE,
    GET_BLOGS_REQUEST,
    GET_BLOGS_SUCCESS
} from "../constants/blogConstant";

const initialState = {
    loading: false,
    error: null,
    success: false,
    blogs: [], // Update this to reflect blogs instead of posters
    addLoading: false,
    deleteLoading: [], // Keep track of IDs that are being deleted
};

export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BLOGS_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_BLOGS_SUCCESS:
            return { ...state, loading: false, blogs: action.payload }; // Update posters to blogs

        case GET_BLOGS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ADD_BLOG_REQUEST:
            return { ...state, addLoading: true, success: false, error: null };

        case ADD_BLOG_SUCCESS:
            return {
                ...state,
                addLoading: false,
                success: true,
                blogs: [...state.blogs, action.payload], // Append new blog
            };

        case ADD_BLOG_FAILURE:
            return { ...state, addLoading: false, error: action.payload };

        case EDIT_BLOG_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        case EDIT_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                blogs: state.blogs.map(blog =>
                    blog._id === action.payload._id ? action.payload : blog
                ),
            };

        case EDIT_BLOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                deleteLoading: [...state.deleteLoading, action.payload],
            };

        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== action.payload.id), // Delete blog by ID
                deleteLoading: state.deleteLoading.filter(id => id !== action.payload.id),
            };

        case DELETE_BLOG_FAILURE:
            return {
                ...state,
                error: action.payload,
                deleteLoading: state.deleteLoading.filter(id => id !== action.payload.id),
            };

        default:
            return state;
    }
};

export default blogReducer;
