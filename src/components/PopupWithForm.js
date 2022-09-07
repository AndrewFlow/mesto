import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupElement, formSubmit) {
    super(popupElement);
    this._formSubmit = formSubmit;
    this.popupForm = this._popupElement.querySelector(".popup__form");
    this._submitBtn = this.popupForm.querySelector(".popup__button");
    this._inputList = this.popupForm.querySelectorAll(".popup__input");

  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputs(item) {
    this._inputList.forEach((input) => {
      input.value = item[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.isLoading(true);
      this._formSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.popupForm.reset();
  }
  
    isLoading(isLoad) {
    if (isLoad) {
      this._submitBtn.textContent = "Сохранение...";
    } else {
      this._submitBtn.textContent = 'Сохранить';
    }
  }
  
}
