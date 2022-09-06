export default class UserInfo {
  constructor({name, description,avatar}) {
    this._userName = name;
    this._userDescription = description;
    this._userAvatar = avatar;
  }

  // Принимает данные User
  getInfo() {
    return {
      name: this._userName.textContent, 
      description: this._userDescription.textContent,
      avatar: this._userAvatar.src};
  }

  // Получение id User
  getId() {
    return this._userId;
}

  // Возвращает данные User
  setInfo(res) {
      this._userName.textContent = res.name;
      this._userDescription.textContent = res.about;
      this._userAvatar.src = res.avatar;
      this._userId = res._id;
  }

}
