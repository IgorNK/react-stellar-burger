import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
} from "../actions/auth";

const initialState = {
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
  refreshUserRequest: false,
  refreshUserFailed: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,
  user: null,
  accessToken: "",
  refreshToken: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...initialState,
        loginFailed: true,
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...initialState,
        registerFailed: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...initialState,
        logoutRequest: false,
        logoutFailed: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        user: action.user,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...initialState,
        getUserFailed: true,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        user: action.user,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: false,
        user: action.user,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...initialState,
        refreshTokenFailed: true,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...initialState,
        forgotPasswordRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...initialState,
        forgotPasswordSuccess: true,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...initialState,
        forgotPasswordFailed: true,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...initialState,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...initialState,
        resetPasswordSuccess: true,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...initialState,
        resetPasswordFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
