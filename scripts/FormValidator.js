
export class FormValidator {
  constructor(data, element) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._element = element;
  }

  // активируем кнопку
  _activateButton () {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }


  // деактивируем кнопку
  _deactivateButton () {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled', false);
  }


 // переключаем состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) { //
      this._activateButton();
    }
    else {
      if (this._submitButton.classList.contains(this._inactiveButtonClass)) {
        this._deactivateButton ();
      };
    };
  };


  // показывает ошибки валидации
  _showInputError(input, error) {
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  };


  // убирает ошибки валидации
  _hideInputError(input, error) {
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  };


  // проверяем валидность поля
  _checkInputValidity(input, error) {
    if (!input.validity.valid) {
      this._showInputError(input, error);
    } else {
      this._hideInputError(input, error);
    }
  };


  //Есть ли в форме хоть одно несоответсвие
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };


  // настраиваем валидацию форм
  enableValidation() {
    this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    this._submitButton = this._element.querySelector(this._submitButtonSelector);
    this._element.addEventListener('input', ((evt) => {
      const input = evt.target;
      const error = this._element.querySelector(`.${input.id}-error`);
      this._checkInputValidity(input, error);
      this._toggleButtonState();
    }
    ));
    this._element.addEventListener('reset', ()=> this._activateButton ());//сброс поля ввода после отправки формы addForm
  };
}


