import _ from "lodash";
import {
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case DELETE_STREAM:
      // using lodash : _.omit(status, action.payload);
      return { ...state, [action.payload]: undefined };

    default:
      return state;
  }
};
