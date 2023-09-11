import { getCookie, setCookie, deleteCookie } from "../utils/cookies";
import {
  ILoginForm,
  IUpdateUserForm,
  IRegisterForm,
  IForgotPasswordForm,
  IResetPasswordForm,
  TRefreshTokenResponse,
} from "./types/data";

type TAPIConfig = {
  baseUrl: string;
};

class Api {
  _config: TAPIConfig;

  constructor(options: TAPIConfig) {
    this._config = options;
  }

  async getOrder(id: string) {
    return this.request(`orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getIngredientsRequest() {
    return await this.request("ingredients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  submitOrderRequest(ingredientIDs: ReadonlyArray<string>) {
    return this.fetchWithRefresh("orders", {
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

  loginRequest(form: ILoginForm) {
    return this.request("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  }

  registerRequest(form: IRegisterForm) {
    return this.request("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  }

  logoutRequest() {
    deleteCookie("token");
    return this.request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
  }

  getUserRequest() {
    return this.fetchWithRefresh("auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
  }

  refreshTokenRequest() {
    return this.request("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
  }

  async updateUserRequest(form: IUpdateUserForm) {
    return this.fetchWithRefresh("auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
      body: JSON.stringify(form),
    });
  }

  forgotPasswordRequest(form: IForgotPasswordForm) {
    return this.request("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  }

  resetPasswordRequest(form: IResetPasswordForm) {
    return this.request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  }

  async fetchWithRefresh(endpoint: string, options: RequestInit) {
    try {
      return await this.request(endpoint, options);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        const refreshData =
          (await this.refreshTokenRequest()) as TRefreshTokenResponse;
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        setCookie("token", refreshData.accessToken);
        options.headers = {
          ...options.headers,
          Authorization: refreshData.accessToken,
        };
        return await this.request(endpoint, options);
      } else {
        return Promise.reject(err);
      }
    }
  }

  async request(endpoint: string, options: RequestInit) {
    return fetch(`${this._config.baseUrl}/${endpoint}`, options)
      .then(checkResponse)
      .then(checkSuccess);
  }
}

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

const checkSuccess = async (res: Response) => {
  if (res) {
    return res as unknown;
  }
  return Promise.reject(`Request rejected: ${res}`);
};

export default Api;
