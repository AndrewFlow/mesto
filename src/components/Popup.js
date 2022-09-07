export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._closeButton = this._popupElement.querySelector('.popup__icon');
    this._closePopup = this._handleEscClose.bind(this);
  }

  // открыть любое окно
  open() {
    this._popupElement.classList.add('popup_opened');
    window.addEventListener('keydown', this._closePopup);
  }
  // закрыть любое окно
  close() {
    this._popupElement.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._closePopup);
  }
  // закрытие Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  // закрытие по клику вне блока
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
      }
    });
  };
}
