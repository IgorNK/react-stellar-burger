import { getCookie } from "../utils/cookies";

class Api {
  constructor(options) {
    this._config = options;
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
    return fetch(`${this._config.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientIDs,
      }),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  loginRequest(form) {
    console.log("doing a login");
    console.log(form);
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

  logoutRequest(refreshToken) {
    console.log("logout refresh token: ");
    console.log(refreshToken);
    return fetch(`${this._config.baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshToken),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  getUserRequest(accessToken) {
    console.log("accesstoken: ");
    console.log(accessToken);
    return fetch(`${this._config.baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }).then((res) => {
      return checkResponse(res);
    });
  }

  refreshTokenRequest(refreshToken) {
    console.log("refreshtoken: ");
    console.log(refreshToken);
    return fetch(`${this._config.baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshToken),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  updateUserRequest(form, accessToken) {
    return fetch(`${this._config.baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(form),
    }).then((res) => {
      return checkResponse(res);
    });
  }

  forgotPasswordRequest(form) {
    console.log("forgot password form: ");
    console.log(form);
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
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}

export default Api;
