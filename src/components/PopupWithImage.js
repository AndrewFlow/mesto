import Popup from "./Popup.js";
import {imageBig, titleImageBig} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageBig = imageBig;
    this._titleImageBig = titleImageBig;
  }

  open({ name, link }) {
    this._imageBig.setAttribute('src', link);
    this._imageBig.setAttribute('alt', name);
    this._titleImageBig.textContent = name;
    super.open();
  }
}
