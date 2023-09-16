import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(document.querySelector(popupSelector));
    this._popupImage = this._popup.querySelector('.popup__photo-images');
    this._popupCaption = this._popup.querySelector('.popup__photo-title');
  }
  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
