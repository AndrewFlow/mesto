
export class Card {
  constructor(dataItem, selectors,handleCardClick) {
    this._link = dataItem.placeLink || dataItem.link;
    this._name = dataItem.placeName || dataItem.name;
    this._template = selectors.template;
    this._templateElement = selectors.templateElement;
    this._templateImage = selectors.templateImage;
    this._templateTitle = selectors.templateTitle;
    this._templateDelete = selectors.templateDelete;
    this._templateLike = selectors.templateLike;
    this._templateLikeActive = selectors.templateLikeActive;
    this._handleCardClick = handleCardClick;
  }

  _createCard() {
    const cardsTemplate = document.querySelector(this._template).content;
    this._templateElement = cardsTemplate.querySelector(this._templateElement).cloneNode(true);
    this._templateImage = this._templateElement.querySelector(this._templateImage);
    this._templateTitle = this._templateElement.querySelector(this._templateTitle);
    this._templateLike = this._templateElement.querySelector(this._templateLike);
    this._templateDelete = this._templateElement.querySelector(this._templateDelete);
  };

  _setCardData() {
    this._templateImage.src = `${this._link}`;
    this._templateTitle.setAttribute('title', this._name);
    this._templateTitle.textContent = this._name;
  }

  _setEventOpenPopup() {
    this._templateImage.addEventListener('click', ()=>{
      this._handleCardClick ( {
        link: this._link,
        name: this._name
      })
    });
  };

  _setEventDelete() {
    this._templateDelete.addEventListener('click',()=>{
      this._templateElement.remove();
    });
  }
  _setEventSetLikes() {
    this._templateLike.addEventListener('click',()=>{
      this._templateLike.classList.toggle(this._templateLikeActive);
    });
  }
  addCard(){
    this._createCard();
    this._setCardData();
    this._setEventOpenPopup();
    this._setEventDelete();
    this._setEventSetLikes();
    return this._templateElement;
  }
}
