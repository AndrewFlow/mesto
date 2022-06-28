import { validationConfig, initialCards, cardConfig } from './data.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';


export const cardsOpenImage = document.querySelector('#openimage');
export const imageBig = cardsOpenImage.querySelector('.popup__image');
export const titleImageBig = cardsOpenImage.querySelector('.popup__description');

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

// открыть любой попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);// закрытие кнопкой Escape
};

//закрыть любой попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);// закрытие кнопкой Escape
};


// функция закрытия попапа клавишей Escape
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const closingPopup = document.querySelector('.popup_opened');
    closePopup(closingPopup);
  };
};


// функция закрытия попапа кликом мышки
function mouseHandler(evt) {
  const target = evt.target;
  if (target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};


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
};

// открытие попапа добавления карточки
function openAddForm() {
  openPopup(popupAddCard);
  formElementAdd.reset();// сброс формы после отправки
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









