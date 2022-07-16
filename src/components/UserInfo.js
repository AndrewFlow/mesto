export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._description = data.description;
  }

  getUserInfo() {
    const userInfo = {
      nameInput: this._name.textContent,
      descriptionInput: this._description.textContent
    }
    return userInfo;
  }


  setUserInfo(data) {
    this._name.textContent = data.nameInput;
    this._description.textContent = data.descriptionInput;
  };

}
