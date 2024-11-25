import { SUBSCRIBE_REQUEST, SUBSCRIBE_SUCCESS, SUBSCRIBE_FAILURE } from '../constants/subscribeConstant';

const initialState = {
  loading: false,
  error: null,
};

export const subscribeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SUBSCRIBE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subscribeReducer;