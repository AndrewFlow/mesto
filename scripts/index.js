
const popupEditProfile = document.querySelector('#editprofile');
const popupAddCard = document.querySelector('#addcard');
const cardsOpenImage =  document.querySelector('#openimage');
const imageBig = cardsOpenImage.querySelector('.popup__image');
const titleImageBig = cardsOpenImage.querySelector('.popup__description');
const openAddButton = document.querySelector(".profile__add-button");
const openEditButton = document.querySelector(".profile__edit-button");
const cardsList = document.querySelector('.cards');
const profUser = document.querySelector('.profile__user');
const profInfo = document.querySelector('.profile__status');
const nameInput  = document.querySelector('#name-input');
const jobInput = document.querySelector('#description-input');
const cardsTemplate = document.querySelector(".cards__template").content;

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);// закрытие кнопкой Escape
};

//закрыть любой попап
function closePopup(popup)
{
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
  if (target === evt.currentTarget)
  {
    closePopup(evt.currentTarget);
  };
};

// открытие карточки

function openPhoto(cardLink, cardName) {
  imageBig.src = cardLink;
  imageBig.setAttribute('alt',cardName);
  titleImageBig.textContent = cardName;
  openPopup(cardsOpenImage);

};

// добавление карточки

function createCard(data) {
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
  const cardsElement = createCard(data);
  cardsList.prepend(cardsElement);
};

//  удаление карточки

function removeListItem(evt) {
  const buttonElement = evt.target;
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
        };
    });
});



// открытие формы редактирования профиля
function openEditForm () {
  nameInput.value = profUser.textContent;
  jobInput.value = profInfo.textContent;
  openPopup(popupEditProfile);
};

// открытие попапа добавления карточки

function openAddForm () {
  openPopup(popupAddCard);
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
  evt.target.reset();
  renderCard(cardsItem, true);
  closePopup(popupAddCard);
};

// запуск

popupEditProfile.addEventListener('click', mouseHandler);
popupAddCard.addEventListener('click', mouseHandler);
cardsOpenImage.addEventListener('click', mouseHandler);
openAddButton.addEventListener('click',openAddForm);
openEditButton.addEventListener ('click',openEditForm);
formElementEdit.addEventListener ('submit',sendSubmitForm);
formElementAdd.addEventListener('submit',sendAddCardForm);

initialCards.forEach((data) => {
  renderCard(data)
});












