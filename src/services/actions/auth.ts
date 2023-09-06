import Api from "../api";
import { dataUrl } from "../../utils/data";

import { setCookie, deleteCookie, getCookie } from "../../utils/cookies";

import { AppThunk, AppDispatch } from "../types";
import { TUser, TLoginForm, TForgotPasswordForm, TRegisterForm, TResetPasswordForm, TUpdateUserForm } from "../types/data";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";

export const REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST" = "REGISTER_USER_REQUEST";
export const REGISTER_USER_FAILED: "REGISTER_USER_FAILED" = "REGISTER_USER_FAILED";
export const REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS" = "REGISTER_USER_SUCCESS";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";

export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";

export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED" = "REFRESH_TOKEN_FAILED";
export const REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS" = "REFRESH_TOKEN_SUCCESS";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly user: TUser;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TAuthAction = ILoginRequestAction |
  ILoginSuccessAction |
  ILoginFailedAction |
  IRegisterUserRequestAction |
  IRegisterUserSuccessAction |
  IRegisterUserFailedAction |
  ILogoutRequestAction |
  ILogoutSuccessAction |
  ILogoutFailedAction |
  IGetUserRequestAction |
  IGetUserSuccessAction |
  IGetUserFailedAction |
  IRefreshTokenRequestAction |
  IRefreshTokenSuccessAction |
  IRefreshTokenFailedAction |
  IUpdateUserRequestAction |
  IUpdateUserSuccessAction |
  IUpdateUserFailedAction |
  IForgotPasswordRequestAction |
  IForgotPasswordSuccessAction |
  IForgotPasswordFailedAction |
  IResetPasswordRequestAction |
  IResetPasswordSuccessAction |
  IResetPasswordFailedAction;  

const loginRequestAction = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST
});

const loginSuccessAction = (user: TUser): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  user
});

const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_FAILED
});

const registerUserRequestAction = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST
});

const registerUserSuccessAction = (user: TUser): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  user
});

const registerUserFailedAction = (): IRegisterUserFailedAction => ({
  type: REGISTER_USER_FAILED
});

const logoutRequestAction = (): ILogoutRequestAction => ({
  type: LOGOUT_REQUEST
});

const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS
});

const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED
});

const getUserRequestAction = (): IGetUserRequestAction => ({
  type: GET_USER_REQUEST
});

const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  user
});

const getUserFailedAction = (): IGetUserFailedAction => ({
  type: GET_USER_FAILED
});

const refreshTokenRequestAction = (): IRefreshTokenRequestAction => ({
  type: REFRESH_TOKEN_REQUEST
});

const refreshTokenSuccessAction = (): IRefreshTokenSuccessAction => ({
  type: REFRESH_TOKEN_SUCCESS
});

const refreshTokenFailedAction = (): IRefreshTokenFailedAction => ({
  type: REFRESH_TOKEN_FAILED
});

const updateUserRequestAction = (): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST
});

const updateUserSuccessAction = (user: TUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  user
});

const updateUserFailedAction = (): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED
});

const forgotPasswordRequestAction = (): IForgotPasswordRequestAction => ({
  type: FORGOT_PASSWORD_REQUEST
});

const forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS
});

const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED
});

const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST
});

const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS
});

const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED
});

const api = new Api({ baseUrl: dataUrl });

export const logIn: AppThunk = (form: TLoginForm)  => {
  return function (dispatch: AppDispatch) {
    dispatch(loginRequestAction());
    api
      .loginRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch(loginSuccessAction(res.user));
          deleteCookie("token");
          setCookie("token", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch(loginFailedAction());
        console.log(err.message);
      });
  };
};

export const logOut: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(logoutRequestAction());
    api
      .logoutRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch(logoutSuccessAction());
          localStorage.removeItem("refreshToken");
          deleteCookie("token");
        }
      })
      .catch((err) => {
        dispatch(logoutFailedAction());
        console.log(err.message);
      });
  };
};

export const register: AppThunk = (form: TRegisterForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(registerUserRequestAction());
    api
      .registerRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch(registerUserSuccessAction(res.user));
          deleteCookie("token");
          setCookie("token", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
      })
      .catch((err) => {
        dispatch(registerUserFailedAction());
        console.log(err.message);
      });
  };
};

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getUserRequestAction());
    api
      .getUserRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch(getUserSuccessAction(res.user));
        }
      })
      .catch((err) => {
        dispatch(getUserFailedAction());
        dispatch(refreshTokenRequestAction());
      });
  };
};

export const refreshAccessToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(refreshTokenRequestAction());
    api
      .refreshTokenRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch(refreshTokenSuccessAction());
        }
      })
      .catch((err) => {
        dispatch(refreshTokenFailedAction());
        console.log(err.message);
      });
  };
};

export const updateUser: AppThunk = (form: TUpdateUserForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(updateUserRequestAction());
    api
      .updateUserRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch(updateUserSuccessAction(res.user));
        }
      })
      .catch((err) => {
        dispatch(updateUserFailedAction());
        console.log(err.message);
      });
  };
};

export const forgotPassword: AppThunk = (form: TForgotPasswordForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(forgotPasswordRequestAction());
    api
      .forgotPasswordRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch(forgotPasswordSuccessAction());
        }
      })
      .catch((err) => {
        dispatch(forgotPasswordFailedAction());
        console.log(err.message);
      });
  };
};

export const resetPassword: AppThunk = (form: TResetPasswordForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordRequestAction());
    api
      .resetPasswordRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch(resetPasswordSuccessAction());
        }
      })
      .catch((err) => {
        dispatch(resetPasswordFailedAction());
        console.log(err.message);
      });
  };
};
