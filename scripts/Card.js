import {cardsOpenImage, imageBig, titleImageBig, openPopup} from './index.js';

export class Card {
  constructor(dataItem, selectors) {
    this._link = dataItem.link;
    this._name = dataItem.name;
    this._template = selectors.template;
    this._templateElement = selectors.templateElement;
    this._templateImage = selectors.templateImage;
    this._templateTitle = selectors.templateTitle;
    this._templateDelete = selectors.templateDelete;
    this._templateLike = selectors.templateLike;
    this._templateLikeActive = selectors.templateLikeActive;
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
      imageBig.src = this._link;
      imageBig.setAttribute('alt', this._name);
      titleImageBig.textContent = this._name;
      openPopup(cardsOpenImage);
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
    this._setEventOpenPopup()
    this._setEventDelete();
    this._setEventSetLikes();

    return this._templateElement;
  }
}
