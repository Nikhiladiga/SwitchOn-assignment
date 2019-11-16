import * as AuthConst from "../../constants/auth";
import * as AuthActionType from "../../actionTypes/auth";

const initState = {
  authStatus: AuthConst.AUTH_LOADING
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthActionType.AUTH_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        authStatus: AuthConst.AUTHENTICATED
      };
    case AuthActionType.AUTH_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        authStatus: AuthConst.NOT_AUTHENTICATED
      };
    default:
      return state;
  }
};

export default authReducer;
