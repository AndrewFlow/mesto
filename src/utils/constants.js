export const editAvatar = document.querySelector('.profile__avatarinner');//
export const avatarProfile = document.querySelector('.profile__avatar');
export const popupAdd = document.querySelector('.popup_add');//
export const popupEdit = document.querySelector('.popup_edit');//
export const popupOpenImage = document.querySelector('.popup_openimage');//
export const popupAvatar = document.querySelector('.popup_avatar');
export const openDeletePopup = document.querySelector('.popup_delete');//
export const popups = document.querySelectorAll('.popup');
export const cardsOpenImage = document.querySelector('#openimage');
export const imageBig = cardsOpenImage.querySelector('.popup__image');
export const titleImageBig = cardsOpenImage.querySelector('.popup__description');
export const photoImageBig = cardsOpenImage.querySelector('.popup__image');
export const openAddButton = document.querySelector(".profile__add-button");
export const openEditButton = document.querySelector(".profile__edit-button");
export const profUser = document.querySelector('.profile__user');
export const profInfo = document.querySelector('.profile__status');



export const formElementEdit = document.forms.edit;
export const formElementAdd = document.forms.add;
export const formElementAvatar = document.forms.avatarEdit;


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
  templateCounter: '.cards__counter'
}
