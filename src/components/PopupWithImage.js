import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._imageBig = this._popupElement.querySelector(".popup__image");
    this._titleImageBig = this._popupElement.querySelector(".popup__description");
  }

  open({ name, link }) {
    this._imageBig.setAttribute('src', link);
    this._imageBig.setAttribute('alt', name);
    this._titleImageBig.textContent = name;
    super.open();
  }
}
