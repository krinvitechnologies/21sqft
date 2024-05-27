import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from '../constants/constant';
import axiosRequest from '../../services/ApiCall';

export const fetchSearchResults = (q) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_REQUEST });
    // console.log(id)

    try {
      const response = await axiosRequest.get(`/contractor/search?q=${q}`);
      // .then((response) => response.json())
      // .then((json) => {
      // console.log(json);
      // });
      // console.log(response)
      // dispatch(setSearchResults(response.data.data));
      dispatch({
        type: SEARCH_SUCCESS,
        payload: response.data,
      });
      // console.log(response.data)
    } catch (error) {
      dispatch({
        type: SEARCH_FAILURE,
        error: error.message,
      });
    }
  };
};


export const fetchSearchResultsByCityAndService = (address, state, service, completeAddress) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_REQUEST });
    // console.log('service', service)

    try {
      const response = await axiosRequest.get(`/contractor/search?city=${address}&&state=${state}&&service=${service}&&completeAddress=${completeAddress}`)
      // .then((response) => response.json())
      // .then((json) => {
      // console.log(json);
      // });
      // console.log(response)
      // dispatch(setSearchResults(response.data.data));
      dispatch({
        type: SEARCH_SUCCESS,
        payload: response.data,
      });
      // console.log(response.data)
    } catch (error) {
      dispatch({
        type: SEARCH_FAILURE,
        error: error.message,
      });
    }
  };
};

