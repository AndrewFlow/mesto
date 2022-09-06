export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
  }
  // активируем кнопку
  activateButton () {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }
  // деактивируем кнопку
  deactivateButton () {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled', false);
  }
 // переключаем состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) { //
      this.activateButton();
    }
    else {
      if (this._submitButton.classList.contains(this._inactiveButtonClass)) {
        this.deactivateButton ();
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
  resetForms() {
    this._inputList.forEach(errorElement => {
      const error = this._formElement.querySelector(`.${errorElement.id}-error`);
      this._hideInputError(errorElement,error);
    });
    this.deactivateButton();
  }
  //Есть ли в форме хоть одно несоответсвие
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  // настраиваем валидацию форм
  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._formElement.addEventListener('input', ((evt) => {
      const input = evt.target;
      const error = this._formElement.querySelector(`.${input.id}-error`) || this._formElement.querySelector(`#${input.id}-error`);
      this._checkInputValidity(input, error);
      this._toggleButtonState();
    }
    ));
    this._formElement.addEventListener('reset', ()=> this.activateButton ());//сброс поля ввода после отправки формы addForm
  };
}


