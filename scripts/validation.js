  enableValidation ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

  // получаем формы

  // форма edit
  const formElementEdit = document.forms.edit;
  const nameEdit = formElementEdit.elements.nameInput;
  const descriptionEdit = formElementEdit.elements.descriptionInput;
  //форма add
  const formElementAdd = document.forms.add;
  const placeName = formElementAdd.elements.placeName;
  const placeLink = formElementAdd.elements.placeLink;

  // функция включения настроек enableValidation
  function enableValidation(settings) {
  // получаем формы по всем селекторам из объекта
  const allForms = Array.from(document.querySelectorAll(settings.formSelector));
  //функция проверяет состояние кнопки
  function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList))
    {
      buttonElement.classList.add(settings.inactiveButtonClass);
    }
    else
    {
      if (buttonElement.classList.contains(settings.inactiveButtonClass))// проверяет,есть ли активный класс кнопки
      {
        buttonElement.classList.remove(settings.inactiveButtonClass);
      }
    }
  };

  // показывает ошибки валидации
  function showInputError (input,error) {
    input.classList.add(settings.inputErrorClass);
    error.classList.add(settings.errorClass);
    error.textContent = input.validationMessage;
  };

  // убирает ошибки валидации
  function hideInputError (input,error) {
    input.classList.remove(settings.inputErrorClass);
    error.classList.remove(settings.errorClass);
    error.textContent = '';
  };

  // проверяем валидность поля
  function checkInputValidity (input, error) {
    if (!input.validity.valid) {
      showInputError(input,error);
    } else {
      hideInputError(input,error);
    }
  };

  //Есть ли в форме хоть одно несоответсвие
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // настраиваем валидацию форм
  function setupFormValidation (form) {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const submitButton = form.querySelector(settings.submitButtonSelector);
    form.addEventListener('input',((evt)=>{
      const input = evt.target;
      const error = form.querySelector(`.${input.id}-error`);
      checkInputValidity(input, error);
      toggleButtonState(inputList, submitButton);
      }
    ));
  };

  // направляем валидацию всех форм в setupFormValidation
  allForms.forEach((form)=>{
    setupFormValidation(form);
  });
};
