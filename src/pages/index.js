import './index.css';
import Api from '../components/Api.js';
import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import {
  validationConfig,
  cardConfig, openAddButton, openEditButton, profUser, profInfo, formElementEdit,
  formElementAdd, openDeletePopup, popupAdd, popupEdit, popupOpenImage, photoImageBig,
  titleImageBig, formElementAvatar, popupAvatar, editAvatar, avatarProfile
} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '1fbd2c83-f9bc-41a1-8644-9ca94cf39436',
    'Content-Type': 'application/json',
  }
})

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([users, cards]) => {
    usersInfos.setInfo(users);
    сardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(`Упс! Возникла ошибка: ${err}`);
  });

// добавление и создание карточек

function createCard(data) {
  const newCard = new Card(data, cardConfig, bigImage, likeCard, deleteCard).addCard();//
  return newCard;
}
const сardList = new Section({
  renderer: (item) => {
    const newCard = createCard(item);
    сardList.addItem(newCard);
  }
}, '.cards');

const openAddForm = new PopupWithForm(popupAdd, (data) => {  //
  api.addCards(data)
    .then((res) => {

      сardList.addItem(createCard(res));

      openAddForm.close();

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => openAddForm.isLoading(false));
});

openAddForm.setEventListeners();
openAddButton.addEventListener('click', () => {
  openAddForm.open();
  addCardFormValidation.resetForms();
  formElementAdd.reset();
});

// Данные пользователя
export const usersInfos = new UserInfo({
  name: profUser,
  description: profInfo,
  avatar: avatarProfile
});

// Редактирование аватара
function openEditAvatar() {
  const userData = usersInfos.getInfo();
  popupEditAvatar.setInputs(userData);
  editAvatarValidation.deactivateButton();
  popupEditAvatar.open();
}
const popupEditAvatar = new PopupWithForm(popupAvatar, (data) => {
  api.setAvatar(data)
    .then((data) => {
      usersInfos.setInfo(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupEditAvatar.isLoading(false));
});

popupEditAvatar.setEventListeners();
editAvatar.addEventListener('click', openEditAvatar);

// Редактирование профиля

function openEditForm() {
  const userData = usersInfos.getInfo();
  popupEditProfile.setInputs(userData);
  editFormValidation.resetForms();
  popupEditProfile.open();
}

const popupEditProfile = new PopupWithForm(popupEdit, (data) => {
  api.setInfo(data)
    .then((data) => {
      usersInfos.setInfo(data);
      popupEditProfile.close();

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupEditProfile.isLoading(false));
});

popupEditProfile.setEventListeners();
openEditButton.addEventListener('click', openEditForm);

// Лайк карточек

function likeCard(likeCard, templateLikeActive, idCard, numberLike) {
  if (likeCard.classList.contains(templateLikeActive)) {
    api.deleteLike(idCard)
      .then((like) => {
        likeCard.classList.remove(templateLikeActive);
        numberLike.textContent = like.likes.length;
      })
      .catch((err) => {
        console.log(err);
    });
  } else {
    api.setLikes(idCard)
      .then((like) => {
        likeCard.classList.add(templateLikeActive);
        numberLike.textContent = like.likes.length;
      })
      .catch((err) => {
        console.log(err);
    });
  }
}

// Удаление карточек

const deleteCardPopup = new PopupWithConfirmation(openDeletePopup, (card, idCard) => {
  api.deleteCard(idCard)
    .then(() => {
      card.remove();
      card = null;
    })
    .then(() => {
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
});

function deleteCard(card, idCard) {
  deleteCardPopup.open(card, idCard);
}
deleteCardPopup.setEventListeners();


// открытие большого фото

const bigImagePopup = new PopupWithImage(popupOpenImage, photoImageBig, titleImageBig);
function bigImage({ link, name }) {
  bigImagePopup.open(
    { name, link }
  );
};
bigImagePopup.setEventListeners();

// запуск валидации формы редактирования
const editFormValidation = new FormValidator(validationConfig, formElementEdit);
editFormValidation.enableValidation();
// запуск валидации формы добавления
const addCardFormValidation = new FormValidator(validationConfig, formElementAdd);
addCardFormValidation.enableValidation();
// запуск валидации формы аватара
const editAvatarValidation = new FormValidator(validationConfig, formElementAvatar);
editAvatarValidation.enableValidation();






