class Api {
  constructor(options) {
    this._options = options;
    this._serverUrl = this._options.serverUrl;
    this._headers = this._options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  // Загрузка информации о пользователе с сервера

  getUserInfo() {
    return this._request(this._serverUrl + '/users/me', {
      headers: this._headers,
    })
  }

  //Загрузка карточек с сервера

  getInitialCards() {
    return this._request(this._serverUrl + '/cards', {
      headers: this._headers,
    })
  }

  //Редактирование профиля

  editProfileInfo(userData) {
    return this._request(this._serverUrl + '/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${userData.name}`,
        about: `${userData.about}`
      }),
    })
  }

  //Добавление новой карточки

  addNewCard(cardData) {
    return this._request(this._serverUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${cardData.name}`,
        link: `${cardData.link}`
      }),
    })
  }

  //

  deleteInitialCards(_id) {
    return this._request(this._serverUrl + '/cards/' + _id, {
      method: "DELETE",
      headers: this._headers
    })
  }

  likeCardStatus(_id, isLiked) {
    if (isLiked) {
      return this._request(this._serverUrl + '/cards/' + _id + '/likes', {
        method: "DELETE",
        headers: this._headers
      })
    } else {
      return this._request(this._serverUrl + '/cards/' + _id + '/likes', {
        method: "PUT",
        headers: this._headers
      })
    }
  }
 
  changeAvatar(avatar) {
    return this._request(this._serverUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatar.avatar}`
      })
    })
  }
}

const api = new Api({
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "b185719c-abff-4277-81cb-becf6d2eb2bf",
    "Content-Type": "application/json",
  },
});

export default api;

