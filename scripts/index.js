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
const popupEdit = document.querySelector('#editprofile');
const popupAdd = document.querySelector('#addcard');
const cardsOpenImage =  document.querySelector('#openimage');
const formElement  = document.querySelector('.popup__form');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const formElementAdd = document.querySelector('.popup__form_type_add');
const imageBig = cardsOpenImage.querySelector('.popup__image');
const titleImageBig = cardsOpenImage.querySelector('.popup__description');

const cardNameInput  = document.querySelector('.popup__input_type_cardname');
const cardLinkInput = document.querySelector('.popup__input_type_cardlink');
const openAddButton = document.querySelector(".profile__add-button");
const openEditButton = document.querySelector(".profile__edit-button");

const cardsList = document.querySelector('.cards');
const profUser = document.querySelector('.profile__user');
const profInfo = document.querySelector('.profile__status');
const nameInput  = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardsTemplate = document.querySelector(".cards__template").content;

// открыть любой попап

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

//закрыть любой попап
function closePopup(popup)
{
  popup.classList.remove('popup_opened');
 };

// открытие карточки

function openPhoto(cardLink, cardName) {
  imageBig.src = cardLink;
  imageBig.setAttribute('alt',cardName);
  titleImageBig.textContent = cardName;
  openPopup(cardsOpenImage);
};

// добавление карточки

function renderItem(data) {
  const cardLink = data.link;
  const cardName = data.name;
  const cardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardsElement.querySelector('.cards__image');
  cardImage.src = `${cardLink}`;
  cardImage.alt = `${cardName}`;
  const cardHeader = cardsElement.querySelector('.cards__title');
  cardHeader.setAttribute('title', cardName);
  cardHeader.textContent = cardName;
  cardImage.addEventListener('click', ()=>{
    openPhoto(cardLink, cardName);
  });
  cardsElement.querySelector(".cards__icon").addEventListener("click", function (evt) {
      evt.target.classList.toggle(
        "cards__icon_active"
      );
    });
  deleteCard(cardsElement);
  return cardsElement;
};

// добавление карточки в поток

function renderCard(data)
{
  const cardsElement = renderItem(data);
  cardsList.prepend(cardsElement);
};

//  удаление карточки

function removeListItem(event) {
  const buttonElement = event.target;
  const listItemElement = buttonElement.closest(".cards__item");
  listItemElement.remove();
};

function deleteCard(listElement) {
  const removeButtonElement = listElement.querySelector(".cards__delete");
  removeButtonElement.addEventListener("click", removeListItem);
};

// закрытие попапов крестиком
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
       if (evt.target.classList.contains('popup__icon')) {
          closePopup(popup)
        }
    })
})

// открытие формы редактирования профиля
function openEditForm () {
  nameInput.value = profUser.textContent;
  jobInput.value = profInfo.textContent;
  openPopup(popupEdit);
};

// очистка поля ввода редактирования профиля
function sendSubmitForm(evt) {
  evt.preventDefault();
  profUser.textContent = nameInput.value;
  profInfo.textContent = jobInput.value;
  closePopup(popupEdit);
};
// открытие попапа добавления карточки

function openAddForm () {
  openPopup(popupAdd);
};
// редактирования попапа добавления карточки
function sendAddCardForm(evt) {
  evt.preventDefault();
  const cardsItem = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  evt.target.reset();
  renderCard(cardsItem, true);
  closePopup(popupAdd);
};

// запуск

openAddButton.addEventListener('click',openAddForm);
openEditButton.addEventListener ('click',openEditForm);
formElementEdit.addEventListener ('submit',sendSubmitForm);
formElementAdd.addEventListener('submit',sendAddCardForm);

initialCards.forEach((data) => {
  renderCard(data)
});

