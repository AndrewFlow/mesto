const initialCards = [
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

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup__edit-profile');
const popupAdd = document.querySelector('.popup__add-card');
const closeEditButton = popupEdit.querySelector(".popup__icon");
const closeAddButton = popupAdd.querySelector(".popup__icon");
const cardsOpenImage =  document.querySelector('.popup__open-image');
const closeImagePopup = cardsOpenImage.querySelector(".popup__icon");
const formElement  = document.querySelector('.popup__form');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const formElementAdd = document.querySelector('.popup__form_type_add');
const imageBig = cardsOpenImage.querySelector('.popup__image');
const titleImageBig = cardsOpenImage.querySelector('.popup__description');

function formAddCard(evt) {
  evt.preventDefault();
  const cardNameInput  = document.querySelector('.popup__input_type_cardname');
  const cardLinkInput = document.querySelector('.popup__input_type_cardlink');
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  renderItem({ name, link });
  popupAdd.classList.toggle("popup_opened");
  cardNameInput.value = null;
  cardLinkInput.value = null;
};

const openAddButton = document.querySelector(".profile__add-button");
openAddButton.addEventListener('click',(args) => {
  popupAdd.classList.toggle("popup_opened");
});

const openEditButton = document.querySelector(".profile__edit-button");
openEditButton.addEventListener('click',(args) => {
  popupEdit.classList.toggle("popup_opened");
});

// закрыть попап

function closePopup(args) {
  const button = args.target;
  const popupElement = button.closest('.popup');
  popupElement.classList.toggle('popup_opened');
};

// добавление массива картинок вместо верстки

function renderList(data) {
  data.forEach((item) => renderItem(item));
};

//  удаление карточки

function removeListItem(event) {
  const buttonElement = event.target;
  const listItemElement = buttonElement.closest(".cards__item");
  listItemElement.remove();
};

function subscribeToEvents(listElement) {
  let removeButtonElement = listElement.querySelector(".cards__delete");
  removeButtonElement.addEventListener("click", removeListItem);
};

// Открыть любой попап.

function openPopup(popup)
{
  popup.classList.add('popup_opened');
};

// открытие карточки

function openShowPhotoForm(cardLink, cardName) {
  imageBig.src = cardLink;
  imageBig.setAttribute('alt',cardName);
  titleImageBig.textContent = cardName;
  openPopup(cardsOpenImage);
};

// добавление карточки

function renderItem(data) {
  const cardsTemplate = document.querySelector(".cards__template").content;
  const cardLink = data.link;
  const cardName = data.name;
  const cardsList = document.querySelector('.cards');
  const cardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardsElement.querySelector('.cards__image');
  cardImage.src = `url(${cardLink})`;
  cardImage.setAttribute('aria-label', cardName);
  const cardHeader = cardsElement.querySelector('.cards__title');
  cardHeader.setAttribute('title', cardName);
  cardHeader.textContent = cardName;
  cardImage.addEventListener('click', ()=>{
    openShowPhotoForm(cardLink, cardName);
  });

  const textElement = cardsElement.querySelector(".cards__title");
  const imageElement = cardsElement.querySelector(".cards__image");
  likeElement = cardsElement
    .querySelector(".cards__icon")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle(
        "cards__icon_active"
      );
    });
  textElement.textContent = data.name;
  imageElement.src = data.link;
  subscribeToEvents(cardsElement);
  cardsList.prepend(cardsElement);
};

// переключение модальных окон

const togglePopup = function () {
  popup.classList.toggle("popup_opened");
};

// очистка поля ввода

function formSubmitHandler(evt) {
  evt.preventDefault();
  const profUser = document.querySelector('.profile__user');
  const profInfo = document.querySelector('.profile__status');
  const nameInput  = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');
  profUser.textContent = nameInput.value;
  profInfo.textContent = jobInput.value;
  togglePopup();
};

formElementEdit.addEventListener ('submit', formSubmitHandler);
formElementAdd.addEventListener('submit',formAddCard);

closeEditButton.addEventListener('click',closePopup);
closeAddButton.addEventListener('click',closePopup);
closeImagePopup.addEventListener('click',closePopup);

renderList(initialCards);

