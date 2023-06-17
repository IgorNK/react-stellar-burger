class Api {
  constructor(options) {
    this._config = options;
  }

  getIngredients() {
    return fetch(`${this._config.baseUrl}/ingredients`).then((res) => {
      return _checkResponse(res);
    });
  }

  submitOrder(ingredientIDs) {
    return fetch(`${this._config.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientIDs,
      }),
    }).then((res) => {
      return _checkResponse(res);
    });
  }
}

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}

export default Api;
