const openButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector(".popup__icon");
const togglePopup = function () {
    popup.classList.toggle("popup_opened")
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);


let formElement  = document.querySelector('.popup__submit');

let nameInput  = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

function formSubmitHandler(evt) {
  evt.preventDefault();
  let profUser = document.querySelector('.profile__user');
  profUser.textContent = (nameInput.value);
  let profInfo = document.querySelector('.profile__status');
  profInfo.textContent = (jobInput.value);

  nameInput.value = profUser.textContent;
  jobInput.value = profInfo.textContent;
}

formElement .addEventListener ('submit', formSubmitHandler);



