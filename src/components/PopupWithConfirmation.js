import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleCardDelete) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
    this._popupDelete = this._popupSelector.querySelector('.popup__form');
  };

  open(card, idCard) {
    super.open();
    this._idCard = idCard;
    this._card = card;
  };
  
  setEventListeners() {
    super.setEventListeners();
    this._popupDelete.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleCardDelete(this._card, this._idCard);
    });
  };
};