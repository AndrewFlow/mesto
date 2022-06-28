import { openPopup, closePopup ,mouseHandler} from './utils/utils.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import {cardsOpenImage, validationConfig, initialCards, cardConfig} from './utils/constants.js';
const popupEditProfile = document.querySelector('#editprofile');
const popupAddCard = document.querySelector('#addcard');
const openAddButton = document.querySelector(".profile__add-button");
const openEditButton = document.querySelector(".profile__edit-button");
const cardsList = document.querySelector('.cards');
const profUser = document.querySelector('.profile__user');
const profInfo = document.querySelector('.profile__status');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#description-input');

// получаем формы
// форма edit
const formElementEdit = document.forms.edit;
const nameEdit = formElementEdit.elements.nameInput;
const descriptionEdit = formElementEdit.elements.descriptionInput;
//форма add
const formElementAdd = document.forms.add;
const placeName = formElementAdd.elements.placeName;
const placeLink = formElementAdd.elements.placeLink;

// закрытие попапов крестиком
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__icon')) {
      closePopup(popup);
    };
  });
});

// добавление и создание карточек
// создать карточку
function createCard(data)
{
  const newCard = new Card(data, cardConfig).addCard();
  return newCard;
}
// добавление карточки в поток
function renderCard(data) {
  cardsList.prepend(data);
};

initialCards.forEach((data) => {
  const newCard = createCard(data);
  renderCard(newCard);
});

// открытие формы редактирования профиля
function openEditForm() {
  nameEdit.value = profUser.textContent;
  descriptionEdit.value = profInfo.textContent;
  openPopup(popupEditProfile);
  editFormValidation.resetForms();
};

// открытие попапа добавления карточки
function openAddForm() {
  addCardFormValidation.resetForms();
  formElementAdd.reset();
  openPopup(popupAddCard);
  // сброс формы после отправки
};

// очистка поля ввода редактирования профиля
function sendSubmitForm(evt) {
  evt.preventDefault();
  profUser.textContent = nameInput.value;
  profInfo.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// редактирования попапа добавления карточки
function sendAddCardForm(evt) {
  evt.preventDefault();
  const cardsItem = {
    name: placeName.value,
    link: placeLink.value
  };
  closePopup(popupAddCard);
  const newCard = createCard(cardsItem);
  renderCard(newCard, true);

};

// запуск
popupEditProfile.addEventListener('click', mouseHandler);
popupAddCard.addEventListener('click', mouseHandler);
cardsOpenImage.addEventListener('click', mouseHandler);
openAddButton.addEventListener('click', openAddForm);
openEditButton.addEventListener('click', openEditForm);
formElementEdit.addEventListener('submit', sendSubmitForm);
formElementAdd.addEventListener('submit', sendAddCardForm);

// запуск валидации формы редактирования
const editFormValidation = new FormValidator(validationConfig, formElementEdit);
editFormValidation.enableValidation();
// запуск валидации формы добавления
const addCardFormValidation = new FormValidator(validationConfig, formElementAdd);
addCardFormValidation.enableValidation();









