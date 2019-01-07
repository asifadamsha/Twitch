import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isUserSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isUserSignedIn: true, userId: action.payload.userId };

    case SIGN_OUT:
      return { ...state, isUserSignedIn: false, userId: null };

    default:
      return state;
  }
};
