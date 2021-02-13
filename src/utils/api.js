export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.token;
  }

  _getResponse(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        return this._getResponse(res);
      })
  }

  setProfileInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    }).then(res => {
      return this._getResponse(res);
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return this._getResponse(res);
    })
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    }).then(res => {
      return this._getResponse(res);
    })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => {
      return this._getResponse(res);
    })
  }

  putLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    }).then(res => {
      return this._getResponse(res);
    })
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(res => {
      return this._getResponse(res);
    })
  }

  changeLikeStatus(id, isLiked) {
    return (isLiked) ? this.deleteLike(id) : this.putLike(id);
  }

  setProfileAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        data
      )
    }).then(res => {
      return this._getResponse(res);
    })
  }
}
const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/',
  token: 'aac4a60b-b09e-40d2-9391-f119b1a59443'
}
const api = new Api(options);
export default api;