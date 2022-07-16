export const popups = document.querySelectorAll('.popup');
export const cardsOpenImage = document.querySelector('#openimage');
export const imageBig = cardsOpenImage.querySelector('.popup__image');
export const titleImageBig = cardsOpenImage.querySelector('.popup__description');
export const openAddButton = document.querySelector(".profile__add-button");
export const openEditButton = document.querySelector(".profile__edit-button");
export const profUser = document.querySelector('.profile__user');
export const profInfo = document.querySelector('.profile__status');
export const formElementEdit = document.forms.edit;
export const formElementAdd = document.forms.add;

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const cardConfig = {
  template: '.cards__template',
  templateElement: '.cards__item',
  templateImage: '.cards__image',
  templateTitle: '.cards__title',
  templateLike: '.cards__icon',
  templateLikeActive: 'cards__icon_active',
  templateDelete: '.cards__delete',
}
