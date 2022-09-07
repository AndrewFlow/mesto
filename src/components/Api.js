export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    // Запрос пользователя
    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'GET'
        })
            .then(res => this._checkApi(res))
    }

    // Проверка получаения данных
    _checkApi(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Возникла ошибка: ${res.status}`);
    }

    // Редактирование пользователя
    setInfo(data) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
            .then(res => this._checkApi(res))
    }

    // Редактирование аватара
    setAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._checkApi(res))
    }

    // Запрос карточек от Api
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'GET'
        })
            .then(res => this._checkApi(res))
    }

    // Добавление карточек в поток
    addCards(data) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: data.placeName,
                link: data.placeLink
            })
        })
            .then(res => this._checkApi(res))

    }
    // Лайк
    setLikes(card) {
        return fetch(`${this._url}/cards/${card}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => this._checkApi(res))
    }

    // Удаление лайка
    deleteLike(card) {
        return fetch(`${this._url}/cards/${card}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkApi(res))
    }

    // Удаление карточек
    openConfirmationPopup(card) {
        return fetch(`${this._url}/cards/${card}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkApi(res))
    }


}