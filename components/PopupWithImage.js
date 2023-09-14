import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(document.querySelector(popupSelector));
    this._popupImage = this._popup.querySelector('.popup__photo-images');
    this._popupCaption = this._popup.querySelector('.popup__photo-title');
  }
  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.cardName;
    this._popupCaption.textContent = data.cardName;
    super.open();
  }
}
