export class Card {
  constructor(dataItem, selectors, usersInfos, handleCardClick, handleCardLike, handleCardDelete) {
    this._link = dataItem.placeLink || dataItem.link;
    this._name = dataItem.placeName || dataItem.name;
    this._template = selectors.template;
    this._templateElement = selectors.templateElement;
    this._templateImage = selectors.templateImage;
    this._templateTitle = selectors.templateTitle;
    this._templateDelete = selectors.templateDelete;
    this._templateLike = selectors.templateLike;
    this._templateLikeActive = selectors.templateLikeActive;
    this._templateCounter = selectors.templateCounter;
    this._handleCardClick = handleCardClick;
    this._idCard = dataItem._id;
    this._userId = dataItem.owner._id;
    this._cardLike = dataItem.likes;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._usersInfos = usersInfos;
  }

  _createCard() {
    const cardsTemplate = document.querySelector(this._template).content;
    this._templateElement = cardsTemplate.querySelector(this._templateElement).cloneNode(true);
    this._templateImage = this._templateElement.querySelector(this._templateImage);
    this._templateTitle = this._templateElement.querySelector(this._templateTitle);
    this._templateLike = this._templateElement.querySelector(this._templateLike);
    this._templateDelete = this._templateElement.querySelector(this._templateDelete);
    this._likeCounter = this._templateElement.querySelector(this._templateCounter);
  };

  _setCardData() {
    this._templateImage.src = `${this._link}`;
    this._templateTitle.setAttribute('title', this._name);
    this._templateTitle.textContent = this._name;
  }

  _setEventPopup() {
    this._templateImage.addEventListener('click', () => {
      this._handleCardClick({
        link: this._link,
        name: this._name
      })
    });
    this._templateLike.addEventListener('click', () => {
      this._handleCardLike(this._templateLike, this._templateLikeActive, this._idCard, this._likeCounter);
    });
    this._templateDelete.addEventListener('click', () => {
      this._handleCardDelete(this._templateElement, this._idCard);
    });
  };

  _checkLike() {
    if (this._cardLike.some((like) => like._id === this._usersInfos.getId())) {
      this._templateLike.classList.add(this._templateLikeActive);
    }
  }
  _checkDelete() {
    this._likeCounter.textContent = this._cardLike.length;
    if (this._userId !== this._usersInfos.getId()) {
      this._templateDelete.remove();
    }
  }

  addCard() {
    this._createCard();
    this._setCardData();
    this._setEventPopup();
    this._checkDelete()
    this._checkLike()
    return this._templateElement;
  }
}
