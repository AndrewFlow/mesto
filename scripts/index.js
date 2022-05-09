const openButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector(".popup__icon");
const profUser = document.querySelector('.profile__user');
const profInfo = document.querySelector('.profile__status');
const formElement  = document.querySelector('.popup__form');
const nameInput  = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const togglePopup = function () {
  popup.classList.toggle("popup_opened")
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profUser.textContent = nameInput.value;
  profInfo.textContent = jobInput.value;

  togglePopup();
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener ('submit', formSubmitHandler);



