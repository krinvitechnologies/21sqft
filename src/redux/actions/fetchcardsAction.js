import axios from "axios";
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "../constants/constant";

export const setFetch = (id) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_REQUEST });
        try {
            const response = await axios.get('http://localhost:8000/api/auth/fetch-contractor', { id })
            // dispatch({
            // type: SET_FETCH,
            // payload: response.fetch
            // });
            dispatch({
                type: FETCH_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: FETCH_FAILURE,
                error: error.message
            })
        }
    }
}