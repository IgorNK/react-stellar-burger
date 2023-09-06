import { getCookie, setCookie } from "../utils/cookies";
import { TLoginForm, TUpdateUserForm, TRegisterForm, TForgotPasswordForm, TResetPasswordForm } from "./types/data";

type TAPIConfig = {
  baseUrl: string,  
}

class Api {
  _config: TAPIConfig;
  
  constructor(options: TAPIConfig) {
    this._config = options;
  }

  async getOrder(id: string) {
    return fetch(`${this._config.baseUrl}/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return checkResponse(res);
    });
  }

  getIngredientsRequest() {
    return fetch(`${this._config.baseUrl}/ingredients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return checkResponse(res);
    });
  }

  submitOrderRequest(ingredientIDs: ReadonlyArray<string>) {
    return this.fetchWithRefresh(`${this._config.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: ingredientIDs,
      }),
    });
  }

  loginRequest(form: TLoginForm) {
    return fetch(`${this._config.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  registerRequest(form: TRegisterForm) {
    return fetch(`${this._config.baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  logoutRequest() {
    return fetch(`${this._config.baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  async getUserRequest() {
    return this.fetchWithRefresh(`${this._config.baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
  }

  refreshTokenRequest() {
    return fetch(`${this._config.baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  async updateUserRequest(form: TUpdateUserForm) {
    return this.fetchWithRefresh(`${this._config.baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
      body: JSON.stringify(form),
    });
  }

  forgotPasswordRequest(form: TForgotPasswordForm) {
    return fetch(`${this._config.baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  resetPasswordRequest(form: TResetPasswordForm) {
    return fetch(`${this._config.baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  async fetchWithRefresh(url: string, options: RequestInit) {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        const refreshData = await this.refreshTokenRequest();
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        setCookie("token", refreshData.accessToken);
        options.headers = {
          ...options.headers,
          Authorization: refreshData.accessToken
      };
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  }
}

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

export default Api;
