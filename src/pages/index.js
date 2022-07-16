import './index.css';
import Section from "../components/Section.js";
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import {validationConfig, initialCards, cardConfig,openAddButton,openEditButton,profUser,profInfo,formElementEdit,formElementAdd} from '../utils/constants.js';

// Взяли данные юзера
const usersInfos = new UserInfo({
  name: profUser,
  description: profInfo
});

// добавление и создание карточек
// создание карточек из массива cardConfig
const сardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item);
    сardList.addItem(newCard);
  }
}, '.cards');
сardList.renderItems();

function createCard(data) {
  const newCard = new Card(data,cardConfig,bigImage).addCard();
  return newCard;
}

// форма редактирование профиля
const popupEditProfile = new PopupWithForm('#editprofile', (data) => {
  usersInfos.setUserInfo(data);
  popupEditProfile.close();
});

function openEditForm() {
  const usersData = usersInfos.getUserInfo();
  popupEditProfile.setInputs(usersData);
  editFormValidation.resetForms();
  popupEditProfile.open();
}

popupEditProfile.setEventListeners();
openEditButton.addEventListener('click', openEditForm);

// форма добавление карточек
const openAddForm = new PopupWithForm("#addcard", (data) => {
  сardList.addItem(createCard(data));
  openAddForm.close();
});

openAddForm.setEventListeners();
openAddButton.addEventListener('click', () => {
  openAddForm.open();
  addCardFormValidation.resetForms();
  formElementAdd.reset();
});

// открытие большого фото
const bigImagePopup = new PopupWithImage("#openimage");
function bigImage({ link, name }) {
  bigImagePopup.open(
    {name,link}
  );
};
bigImagePopup.setEventListeners();

// запуск валидации формы редактирования
const editFormValidation = new FormValidator(validationConfig, formElementEdit);
editFormValidation.enableValidation();
// запуск валидации формы добавления
const addCardFormValidation = new FormValidator(validationConfig, formElementAdd);
addCardFormValidation.enableValidation();
