import Api from "../api";
import { dataUrl } from "../../utils/data.js";

import { setCookie, deleteCookie, getCookie } from "../../utils/cookies";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";

const api = new Api({ baseUrl: dataUrl });

export const logIn = (form) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    api
      .loginRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user,
          });
          deleteCookie("token");
          setCookie("token", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
        console.log(err.message);
      });
  };
};

export const logOut = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    api
      .logoutRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
          localStorage.removeItem("refreshToken");
          deleteCookie("token");
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
        });
        console.log(err.message);
      });
  };
};

export const register = (form) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    api
      .registerRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_USER_SUCCESS,
            user: res.user,
          });
          deleteCookie("token");
          setCookie("token", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_USER_FAILED,
        });
        console.log(err.message);
      });
  };
};

export const getUser = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    api
      .getUserRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
        dispatch(refreshAccessToken());
      });
  };
};

export const refreshAccessToken = () => {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    api
      .refreshTokenRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: REFRESH_TOKEN_FAILED,
        });
        console.log(err.message);
      });
  };
};

export const updateUser = (form) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    api
      .updateUserRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
        console.log(err.message);
      });
  };
};

export const forgotPassword = (form) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    api
      .forgotPasswordRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
        console.log(err.message);
      });
  };
};

export const resetPassword = (form) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    api
      .resetPasswordRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
        console.log(err.message);
      });
  };
};
