import { getCookie, setCookie } from "../utils/cookies";

class Api {
  constructor(options) {
    this._config = options;
  }

  async getOrder(id) {
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

  submitOrderRequest(ingredientIDs) {
    return this.fetchWithRefresh(`${this._config.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: ingredientIDs,
      }),
    });
  }

  loginRequest(form) {
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

  registerRequest(form) {
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

  async updateUserRequest(form) {
    return this.fetchWithRefresh(`${this._config.baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
      body: JSON.stringify(form),
    });
  }

  forgotPasswordRequest(form) {
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

  resetPasswordRequest(form) {
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

  async fetchWithRefresh(url, options) {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await this.refreshToken();
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        setCookie("token", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  }
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

export default Api;
